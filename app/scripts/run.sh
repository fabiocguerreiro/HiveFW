#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"
cd "$PROJECT_DIR"

command -v flutter >/dev/null 2>&1 || { echo "Flutter SDK not found" >&2; exit 1; }

cmd="${1:-run}"
shift 2>/dev/null || true
case "$cmd" in
  run) flutter run "$@" ;;
  build|build-apk) flutter build apk --release "$@" ;;
  build-aab) flutter build appbundle --release "$@" ;;
  test) flutter test "$@" ;;
  analyze) flutter analyze "$@" ;;
  clean) flutter clean ;;
  get) flutter pub get ;;
  l10n) flutter gen-l10n ;;
  doctor) flutter doctor -v ;;
  devices) flutter devices ;;
  setup)
    if [[ ! -d android ]]; then
      flutter create --org pt.hivefw --project-name hivefw_companion --platforms android .
    fi
    flutter pub get
    ;;
  *)
    cat <<'EOF'
HiveFW Android App
Usage: ./scripts/run.sh <command>

Commands: run, build, build-apk, build-aab, test, analyze, clean, get, l10n, doctor, devices, setup
EOF
    exit 1
    ;;
esac
