param(
    [Parameter(Position = 0)]
    [string]$Command = "run",
    [Parameter(Position = 1, ValueFromRemainingArguments)]
    [string[]]$Args
)

$ErrorActionPreference = "Stop"
$ProjectDir = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)
Push-Location $ProjectDir
try {
    switch ($Command) {
        "run"       { flutter run @Args }
        "build"     { flutter build apk --release @Args }
        "build-apk" { flutter build apk --release @Args }
        "build-aab" { flutter build appbundle --release @Args }
        "test"      { flutter test @Args }
        "analyze"   { flutter analyze @Args }
        "clean"     { flutter clean }
        "get"       { flutter pub get }
        "l10n"      { flutter gen-l10n }
        "doctor"    { flutter doctor -v }
        "devices"   { flutter devices }
        "setup"     {
            if (-not (Test-Path "android")) {
                flutter create --org pt.hivefw --project-name hivefw_companion --platforms android .
            }
            flutter pub get
        }
        default {
            Write-Host "HiveFW Android App"
            Write-Host "Commands: run, build, build-apk, build-aab, test, analyze, clean, get, l10n, doctor, devices, setup"
            exit 1
        }
    }
}
finally {
    Pop-Location
}
