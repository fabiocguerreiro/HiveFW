param(
    [ValidateSet("debug", "release")]
    [string]$Mode = "release",
    [switch]$SkipTests
)

$ErrorActionPreference = "Stop"
$ProjectDir = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)
Push-Location $ProjectDir
try {
    Write-Host "[HiveFW] Android $Mode build" -ForegroundColor Green
    flutter pub get
    dart run flutter_launcher_icons
    flutter analyze --no-fatal-infos --no-fatal-warnings
    if (-not $SkipTests) { flutter test }
    flutter build apk "--$Mode"
    if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
    Write-Host "[HiveFW] APK: build/app/outputs/flutter-apk/app-$Mode.apk" -ForegroundColor Green
}
finally {
    Pop-Location
}
