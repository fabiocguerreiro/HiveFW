#include "HiveWifiPortal.h"

#if defined(ESP32) && defined(WIFI_SSID) && defined(WEB_OTA_ENABLED)

#include <DNSServer.h>
#include <Preferences.h>
#include <WiFi.h>
#include <esp_system.h>

static const char* HIVEFW_PORTAL_USER = "hivefw";
static const char* HIVEFW_PORTAL_PASSWORD = "hivefw";

static DNSServer hivefw_dns_server;
static bool hivefw_setup_mode = false;
static bool hivefw_restart_pending = false;
static unsigned long hivefw_restart_at = 0;
static String hivefw_portal_session;
static String hivefw_current_ssid;
static String hivefw_ap_ssid;

static String hivefwRandomToken(size_t words = 4) {
  String token;
  token.reserve(words * 8);
  char part[9];
  for (size_t i = 0; i < words; ++i) {
    snprintf(part, sizeof(part), "%08lx", (unsigned long)esp_random());
    token += part;
  }
  return token;
}

static String hivefwHtmlEscape(const String& input) {
  String out;
  out.reserve(input.length() + 16);
  for (size_t i = 0; i < input.length(); ++i) {
    const char c = input[i];
    switch (c) {
      case '&': out += F("&amp;"); break;
      case '<': out += F("&lt;"); break;
      case '>': out += F("&gt;"); break;
      case '"': out += F("&quot;"); break;
      case '\'': out += F("&#39;"); break;
      default: out += c; break;
    }
  }
  return out;
}

static String hivefwJsonEscape(const String& input) {
  String out;
  out.reserve(input.length() + 16);
  for (size_t i = 0; i < input.length(); ++i) {
    const char c = input[i];
    switch (c) {
      case '\\': out += F("\\\\"); break;
      case '"': out += F("\\\""); break;
      case '\n': out += F("\\n"); break;
      case '\r': out += F("\\r"); break;
      case '\t': out += F("\\t"); break;
      default:
        if ((uint8_t)c < 0x20) {
          char buf[7];
          snprintf(buf, sizeof(buf), "\\u%04x", (unsigned int)(uint8_t)c);
          out += buf;
        } else {
          out += c;
        }
        break;
    }
  }
  return out;
}

static bool hivefwHasSession(AsyncWebServerRequest* request) {
  if (hivefw_portal_session.length() == 0 || !request->hasHeader("Cookie")) {
    return false;
  }
  const String cookie = request->getHeader("Cookie")->value();
  const String wanted = "hivefw_session=" + hivefw_portal_session;
  return cookie.indexOf(wanted) >= 0;
}

static String hivefwPageShell(
  const String& title,
  const String& body,
  const String& extra_head = ""
) {
  String html;
  html.reserve(8500);
  html += F("<!doctype html><html lang=\"pt\"><head><meta charset=\"utf-8\">");
  html += F("<meta name=\"viewport\" content=\"width=device-width,initial-scale=1\">");
  html += F("<meta name=\"theme-color\" content=\"#e5e7eb\">");
  html += F("<title>");
  html += title;
  html += F(" · HiveFW</title>");
  html += extra_head;
  html += F(R"HTML(
<style>
:root{
  color-scheme:light;
  --bg:#e5e7eb;
  --card:#ffffff;
  --text:#20242a;
  --muted:#68707a;
  --line:#d5d9de;
  --orange:#f57c00;
  --orange-dark:#d96800;
  --soft:#f6f7f8;
}
*{box-sizing:border-box}
body{
  margin:0;
  min-height:100vh;
  background:var(--bg);
  color:var(--text);
  font-family:Inter,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;
  display:flex;
  align-items:center;
  justify-content:center;
  padding:24px 14px;
}
.wrap{width:min(100%,520px)}
.card{
  background:var(--card);
  border:1px solid rgba(0,0,0,.08);
  border-radius:18px;
  box-shadow:0 14px 38px rgba(0,0,0,.10);
  padding:26px;
}
.brand{
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:center;
  gap:9px;
  margin-bottom:24px;
}
.logo-mark{width:62px;height:54px}
.logo-text{
  font-size:28px;
  line-height:1;
  font-weight:800;
  letter-spacing:-.7px;
}
.logo-sub{font-size:12px;color:var(--muted)}
h1{font-size:19px;margin:0 0 7px}
p{color:var(--muted);line-height:1.5;margin:0 0 18px;font-size:13px}
label{
  display:block;
  font-size:12px;
  font-weight:700;
  margin:14px 0 6px;
}
input,select{
  width:100%;
  border:1px solid var(--line);
  border-radius:10px;
  background:#fff;
  padding:12px 13px;
  font:inherit;
  color:var(--text);
  outline:none;
}
input:focus,select:focus{
  border-color:var(--orange);
  box-shadow:0 0 0 3px rgba(245,124,0,.12);
}
button,.button{
  border:0;
  border-radius:10px;
  padding:12px 15px;
  font:inherit;
  font-weight:800;
  cursor:pointer;
  text-decoration:none;
  display:inline-flex;
  align-items:center;
  justify-content:center;
}
.primary{
  width:100%;
  background:var(--orange);
  color:white;
  margin-top:18px;
}
.primary:hover{background:var(--orange-dark)}
.secondary{
  background:var(--soft);
  color:var(--text);
  border:1px solid var(--line);
}
.row{display:flex;gap:9px;align-items:center}
.row>input{flex:1}
.status{
  display:inline-flex;
  align-items:center;
  gap:7px;
  border:1px solid var(--line);
  background:var(--soft);
  border-radius:999px;
  padding:6px 9px;
  font-size:11px;
  color:var(--muted);
  margin-bottom:16px;
}
.dot{width:7px;height:7px;border-radius:50%;background:var(--orange)}
.note{
  background:var(--soft);
  border:1px solid var(--line);
  border-radius:10px;
  padding:11px 12px;
  color:var(--muted);
  font-size:11px;
  line-height:1.45;
  margin-top:14px;
}
.error{
  background:#fff1f0;
  border:1px solid #ffc9c5;
  color:#a61b14;
  border-radius:10px;
  padding:10px 12px;
  margin-bottom:14px;
  font-size:12px;
}
.ok{
  background:#eefaf2;
  border:1px solid #bde5c7;
  color:#216e39;
  border-radius:10px;
  padding:10px 12px;
  margin-bottom:14px;
  font-size:12px;
}
.meta{
  display:grid;
  grid-template-columns:auto 1fr;
  gap:6px 12px;
  font-size:12px;
  margin-bottom:18px;
}
.meta strong{color:var(--muted);font-weight:600}
.meta span{overflow-wrap:anywhere}
.check{
  display:flex;
  align-items:center;
  gap:8px;
  font-size:11px;
  color:var(--muted);
  margin-top:10px;
}
.check input{width:auto}
.footer{
  text-align:center;
  color:#858b93;
  font-size:10px;
  margin-top:12px;
}
@media(max-width:520px){
  body{padding:12px}
  .card{padding:22px 18px;border-radius:15px}
  .row{align-items:stretch;flex-direction:column}
}
</style>
)HTML");
  html += F("</head><body><div class=\"wrap\"><div class=\"card\">");
  html += F(R"HTML(
<div class="brand">
<svg class="logo-mark" viewBox="0 0 64 56" aria-hidden="true">
  <path d="M21 4h22l11 18-11 18H21L10 22 21 4Z" fill="none" stroke="#f57c00" stroke-width="4"/>
  <path d="M21 40 12 52M43 40l9 12M10 22H2M54 22h8" stroke="#f57c00" stroke-width="4" stroke-linecap="round"/>
  <path d="M23 15v15M41 15v15M23 22h18" stroke="#20242a" stroke-width="4" stroke-linecap="round"/>
</svg>
<div class="logo-text">HiveFW</div>
<div class="logo-sub">Companion &amp; Repeater</div>
</div>
)HTML");
  html += body;
  html += F("</div><div class=\"footer\">HiveFW · configuração local do Heltec V3</div></div></body></html>");
  return html;
}

static void hivefwSendLoginPage(
  AsyncWebServerRequest* request,
  bool invalid = false
) {
  String body;
  body.reserve(2200);
  body += F("<h1>Configuração Wi-Fi</h1>");
  body += F("<p>Autentica-te para configurar a rede do HiveFW.</p>");
  if (invalid) {
    body += F("<div class=\"error\">Utilizador ou password incorretos.</div>");
  }
  body += F(R"HTML(
<form method="post" action="/wifi/login">
  <label for="user">Utilizador</label>
  <input id="user" name="user" autocomplete="username" value="hivefw" required>
  <label for="password">Password</label>
  <input id="password" name="password" type="password" autocomplete="current-password" required autofocus>
  <button class="primary" type="submit">Entrar</button>
</form>
<div class="note">
  Credenciais iniciais do portal: <strong>hivefw / hivefw</strong>.<br>
  Estas credenciais protegem apenas a página de configuração Wi-Fi.
</div>
)HTML");
  request->send(200, "text/html; charset=utf-8", hivefwPageShell("Wi-Fi", body));
}

static void hivefwSendConfigPage(AsyncWebServerRequest* request) {
  String body;
  body.reserve(5200);

  body += F("<div class=\"status\"><span class=\"dot\"></span>");
  body += hivefw_setup_mode
    ? F("Hotspot de configuração ativo")
    : F("Configuração pela rede local");
  body += F("</div>");

  body += F("<h1>Rede Wi-Fi do Companion</h1>");
  body += F("<p>Seleciona ou escreve a rede onde o Heltec V3 se deve ligar. As credenciais são guardadas na NVS e sobrevivem a updates OTA.</p>");

  body += F("<div class=\"meta\"><strong>Rede atual</strong><span>");
  body += hivefw_current_ssid.length()
    ? hivefwHtmlEscape(hivefw_current_ssid)
    : F("Ainda não configurada");
  body += F("</span><strong>Portal</strong><span>");
  if (hivefw_setup_mode) {
    body += F("http://192.168.4.1/wifi");
  } else {
    body += F("http://");
    body += WiFi.localIP().toString();
    body += F("/wifi");
  }
  body += F("</span></div>");

  body += F(R"HTML(
<form method="post" action="/wifi/save">
  <label for="ssid">Rede Wi-Fi</label>
  <div class="row">
    <input id="ssid" name="ssid" list="wifi-networks" maxlength="32" placeholder="Nome da rede (SSID)" required>
    <button class="secondary" type="button" id="scan">Procurar redes</button>
  </div>
  <datalist id="wifi-networks"></datalist>
  <div id="scan-status" class="note" style="display:none"></div>

  <label for="pwd">Password Wi-Fi</label>
  <input id="pwd" name="pwd" type="password" maxlength="64" autocomplete="new-password" placeholder="Password da nova rede">

  <label class="check">
    <input type="checkbox" name="open" value="1">
    Esta rede não usa password
  </label>

  <button class="primary" type="submit">Guardar Wi-Fi e reiniciar</button>
</form>

<div class="note">
  A password atualmente guardada nunca é mostrada. Se mantiveres o mesmo SSID
  e deixares a password vazia, o HiveFW preserva a password já existente.
  A gravação só acontece quando carregas em <strong>Guardar Wi-Fi e reiniciar</strong>.
</div>

<script>
const button=document.getElementById('scan');
const list=document.getElementById('wifi-networks');
const status=document.getElementById('scan-status');
button.addEventListener('click',async()=>{
  button.disabled=true;
  status.style.display='block';
  status.textContent='A procurar redes…';
  try{
    const response=await fetch('/wifi/scan',{cache:'no-store'});
    if(response.status===401){ location.reload(); return; }
    if(!response.ok) throw new Error('HTTP '+response.status);
    const data=await response.json();
    list.replaceChildren();
    for(const network of (data.networks||[])){
      const option=document.createElement('option');
      option.value=network.ssid;
      option.label=(network.rssi??'?')+' dBm'+(network.secured?' · protegida':' · aberta');
      list.appendChild(option);
    }
    status.textContent=(data.networks||[]).length
      ? (data.networks.length+' redes encontradas. Escreve ou seleciona o SSID no campo acima.')
      : 'Nenhuma rede encontrada. Podes escrever o SSID manualmente.';
  }catch(error){
    status.textContent='Não foi possível procurar redes: '+error.message;
  }finally{
    button.disabled=false;
  }
});
</script>
)HTML");

  request->send(
    200,
    "text/html; charset=utf-8",
    hivefwPageShell("Configuração Wi-Fi", body)
  );
}

static void hivefwSendSavedPage(
  AsyncWebServerRequest* request,
  const String& ssid
) {
  String body;
  body.reserve(1500);
  body += F("<div class=\"ok\">Configuração guardada com sucesso.</div>");
  body += F("<h1>A reiniciar o HiveFW</h1><p>O Heltec V3 vai tentar ligar-se à rede <strong>");
  body += hivefwHtmlEscape(ssid);
  body += F("</strong>. Depois de obter um IP do router, esta página fica novamente disponível em <strong>http://IP_DO_RADIO/wifi</strong>.</p>");
  body += F("<div class=\"note\">As credenciais foram gravadas na NVS. O update OTA não as substitui.</div>");
  request->send(
    200,
    "text/html; charset=utf-8",
    hivefwPageShell("Wi-Fi guardado", body)
  );
}

static bool hivefwSaveCredentials(
  const String& ssid,
  String password,
  bool force_open
) {
  Preferences prefs;
  if (!prefs.begin("hivefw_net", false)) {
    return false;
  }

  const String old_ssid = prefs.getString("ssid", "");
  const String old_password = prefs.getString("pwd", "");

  if (force_open) {
    password = "";
  } else if (ssid == old_ssid && password.length() == 0) {
    // Important migration/safety behaviour: viewing or resubmitting the same
    // SSID with an empty password must not erase an existing NVS password.
    password = old_password;
  }

  const size_t ssid_written = prefs.putString("ssid", ssid);
  const size_t pwd_written = prefs.putString("pwd", password);
  prefs.end();

  return ssid_written > 0 && pwd_written > 0;
}

static void hivefwRedirectToWifi(AsyncWebServerRequest* request) {
  AsyncWebServerResponse* response = request->beginResponse(302);
  response->addHeader("Location", "/wifi");
  response->addHeader("Cache-Control", "no-store");
  request->send(response);
}

static void hivefwStartSetupAp(const char* node_name) {
  hivefw_ap_ssid = node_name ? String(node_name) : String();
  hivefw_ap_ssid.trim();

  if (hivefw_ap_ssid.length() == 0) {
    hivefw_ap_ssid = "HiveFW";
  }
  if (hivefw_ap_ssid.length() > 32) {
    hivefw_ap_ssid = hivefw_ap_ssid.substring(0, 32);
  }

  WiFi.mode(WIFI_AP_STA);

  // "hivefw" is intentionally used as the web portal password. WPA/WPA2
  // SoftAP passphrases require at least 8 characters, so the provisioning AP
  // is open and the configuration surface itself is authenticated.
  if (!WiFi.softAP(hivefw_ap_ssid.c_str())) {
    WIFI_DEBUG_PRINTLN("HiveFW WiFi setup AP could not be started");
    return;
  }

  hivefw_setup_mode = true;
  const IPAddress ip = WiFi.softAPIP();
  hivefw_dns_server.setErrorReplyCode(DNSReplyCode::NoError);
  hivefw_dns_server.start(53, "*", ip);

  WIFI_DEBUG_PRINTLN(
    "HiveFW WiFi setup AP '%s' ready at http://%s/wifi",
    hivefw_ap_ssid.c_str(),
    ip.toString().c_str()
  );
}

void hivefwWifiPortalBegin(
  AsyncWebServer* server,
  const char* node_name,
  const String& current_ssid,
  bool has_credentials
) {
  if (server == nullptr) {
    return;
  }

  hivefw_current_ssid = current_ssid;
  hivefw_portal_session = hivefwRandomToken();

  server->on("/wifi", HTTP_GET, [](AsyncWebServerRequest* request) {
    if (!hivefwHasSession(request)) {
      hivefwSendLoginPage(request);
      return;
    }
    hivefwSendConfigPage(request);
  });

  server->on("/wifi/login", HTTP_POST, [](AsyncWebServerRequest* request) {
    const String user = request->hasParam("user", true)
      ? request->getParam("user", true)->value()
      : String();
    const String password = request->hasParam("password", true)
      ? request->getParam("password", true)->value()
      : String();

    if (user != HIVEFW_PORTAL_USER || password != HIVEFW_PORTAL_PASSWORD) {
      hivefwSendLoginPage(request, true);
      return;
    }

    AsyncWebServerResponse* response = request->beginResponse(302);
    response->addHeader("Location", "/wifi");
    response->addHeader(
      "Set-Cookie",
      "hivefw_session=" + hivefw_portal_session +
        "; Path=/; HttpOnly; SameSite=Strict"
    );
    response->addHeader("Cache-Control", "no-store");
    request->send(response);
  });

  server->on("/wifi/scan", HTTP_GET, [](AsyncWebServerRequest* request) {
    if (!hivefwHasSession(request)) {
      request->send(401, "application/json", "{\"error\":\"unauthorized\"}");
      return;
    }

    // Scan only on explicit user action. Channel hopping can briefly disturb
    // an active AP/STA link, so the portal never scans continuously.
    const int count = WiFi.scanNetworks(false, true);

    String json = "{\"networks\":[";
    bool first = true;

    for (int i = 0; i < count; ++i) {
      const String ssid = WiFi.SSID(i);
      if (ssid.length() == 0) {
        continue;
      }

      // Avoid duplicate SSIDs in the UI.
      bool duplicate = false;
      for (int j = 0; j < i; ++j) {
        if (WiFi.SSID(j) == ssid) {
          duplicate = true;
          break;
        }
      }
      if (duplicate) {
        continue;
      }

      if (!first) {
        json += ',';
      }
      first = false;

      json += "{\"ssid\":\"";
      json += hivefwJsonEscape(ssid);
      json += "\",\"rssi\":";
      json += String(WiFi.RSSI(i));
      json += ",\"secured\":";
      json += (WiFi.encryptionType(i) == WIFI_AUTH_OPEN) ? "false" : "true";
      json += '}';
    }

    json += "]}";
    WiFi.scanDelete();

    AsyncWebServerResponse* response = request->beginResponse(
      200,
      "application/json; charset=utf-8",
      json
    );
    response->addHeader("Cache-Control", "no-store");
    request->send(response);
  });

  server->on("/wifi/save", HTTP_POST, [](AsyncWebServerRequest* request) {
    if (!hivefwHasSession(request)) {
      hivefwSendLoginPage(request);
      return;
    }

    String ssid = request->hasParam("ssid", true)
      ? request->getParam("ssid", true)->value()
      : String();
    String password = request->hasParam("pwd", true)
      ? request->getParam("pwd", true)->value()
      : String();
    const bool force_open = request->hasParam("open", true);

    ssid.trim();

    if (ssid.length() == 0 || ssid.length() > 32 || password.length() > 64) {
      request->send(
        400,
        "text/plain; charset=utf-8",
        "SSID/password invalidos"
      );
      return;
    }

    if (!hivefwSaveCredentials(ssid, password, force_open)) {
      request->send(
        500,
        "text/plain; charset=utf-8",
        "Nao foi possivel guardar as credenciais na NVS"
      );
      return;
    }

    hivefw_current_ssid = ssid;
    hivefwSendSavedPage(request, ssid);

    hivefw_restart_pending = true;
    hivefw_restart_at = millis() + 1500UL;
  });

  const char* captive_paths[] = {
    "/generate_204",
    "/gen_204",
    "/hotspot-detect.html",
    "/library/test/success.html",
    "/ncsi.txt",
    "/connecttest.txt",
    "/redirect"
  };

  for (const char* path : captive_paths) {
    server->on(path, HTTP_GET, [](AsyncWebServerRequest* request) {
      if (hivefw_setup_mode) {
        hivefwRedirectToWifi(request);
      } else {
        request->send(404, "text/plain", "Not found");
      }
    });
  }

  server->onNotFound([](AsyncWebServerRequest* request) {
    if (hivefw_setup_mode) {
      hivefwRedirectToWifi(request);
      return;
    }
    request->send(404, "text/plain", "Not found");
  });

  if (!has_credentials) {
    hivefwStartSetupAp(node_name);
  }
}

void hivefwWifiPortalLoop() {
  if (hivefw_setup_mode) {
    hivefw_dns_server.processNextRequest();
  }

  if (
    hivefw_restart_pending &&
    (long)(millis() - hivefw_restart_at) >= 0
  ) {
    hivefw_restart_pending = false;
    ESP.restart();
  }
}

bool hivefwWifiPortalSetupMode() {
  return hivefw_setup_mode;
}

#endif
