#!/usr/bin/env bash
# HiveFW Companion — Android build script
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"
BUILD_DIR="$PROJECT_DIR/build"
DIST_DIR="$BUILD_DIR/dist"
VERSION=$(grep 'version:' "$PROJECT_DIR/pubspec.yaml" | head -1 | awk '{print $2}' | tr -d "'\"")
BUILD_MODE="release"

cd "$PROJECT_DIR"

log() { echo -e "\033[0;32m[BUILD-ANDROID]\033[0m $*"; }
err() { echo -e "\033[0;31m[BUILD-ANDROID]\033[0m $*" >&2; }

usage() {
    cat <<EOF
Usage: $(basename "$0") [--debug|--release]

Build modes:
  --debug    Build a debug Android APK
  --release  Build a release Android APK (default)
EOF
}

while [[ $# -gt 0 ]]; do
    case "$1" in
        --debug)
            BUILD_MODE="debug"
            ;;
        --release)
            BUILD_MODE="release"
            ;;
        -h|--help)
            usage
            exit 0
            ;;
        *)
            err "Unknown argument: $1"
            usage
            exit 1
            ;;
    esac
    shift
done

if ! command -v flutter >/dev/null 2>&1; then
    err "Flutter not found"
    exit 1
fi

if ! command -v adb >/dev/null 2>&1 && [ -z "${ANDROID_HOME:-}" ] && [ -z "${ANDROID_SDK_ROOT:-}" ]; then
    err "Android SDK not found (adb/ANDROID_HOME/ANDROID_SDK_ROOT)."
    exit 1
fi

log "HiveFW Companion v$VERSION — Android $BUILD_MODE build"
log "=========================================="

log "Getting dependencies..."
flutter pub get

log "Generating HiveFW launcher icons..."
dart run flutter_launcher_icons

log "Running analysis..."
flutter analyze --no-fatal-infos || { err "Analysis failed"; exit 1; }

log "Running tests..."
flutter test || { err "Tests failed"; exit 1; }

mkdir -p "$DIST_DIR"

log "Building Android APK..."
flutter build apk "--$BUILD_MODE"

APK="$BUILD_DIR/app/outputs/flutter-apk/app-${BUILD_MODE}.apk"
if [ -f "$APK" ]; then
    OUT_APK="$DIST_DIR/hivefw-companion-${VERSION}-android-${BUILD_MODE}.apk"
    cp "$APK" "$OUT_APK"
    SIZE=$(du -h "$OUT_APK" | cut -f1)
    log "APK: $OUT_APK ($SIZE)"
else
    err "APK not found: $APK"
    exit 1
fi

log "=========================================="
log "Android $BUILD_MODE build complete: v$VERSION"
