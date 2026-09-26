/// Build-time feature flags for optional app modules.
///
/// Supported release presets (`FEATURE_PRESET`):
/// - `legacy` (default): preserves existing behaviour
///   (all apps enabled except Topology and Event)
/// - `minimal`: smaller public-facing set
/// - `full`: enables all optional apps
///
/// You can still override any individual app flag using
/// `FEATURE_APP_*` defines. Per-app flags always win over preset defaults.
///
/// Example:
/// flutter build apk --release \
///   --dart-define=FEATURE_PRESET=minimal \
///   --dart-define=FEATURE_APP_RXLOG=true
library;

enum AppFeature {
  map,
  topology,
  neighbours,
  observedChannels,
  homeassistant,
  rxlog,
  noisefloor,
}

final class FeatureToggles {
  const FeatureToggles._();

  /// Active preset name: `legacy`, `minimal`, or `full`.
  static const String presetName = String.fromEnvironment(
    'FEATURE_PRESET',
    defaultValue: 'legacy',
  );

  static const bool _isMinimalPreset = presetName == 'minimal';
  static const bool _isFullPreset = presetName == 'full';

  // Preset defaults (overridable by per-feature `FEATURE_APP_*` flags).
  // Topology is intentionally off by default for now.
  static const bool _defaultTopology = _isFullPreset;
  static const bool _defaultRxLog = !_isMinimalPreset;
  static const bool _defaultNoiseFloor = !_isMinimalPreset;

  static const bool appTopology = bool.fromEnvironment(
    'FEATURE_APP_TOPOLOGY',
    defaultValue: _defaultTopology,
  );

  static const bool appRxLog = bool.fromEnvironment(
    'FEATURE_APP_RXLOG',
    defaultValue: _defaultRxLog,
  );

  static const bool appNoiseFloor = bool.fromEnvironment(
    'FEATURE_APP_NOISEFLOOR',
    defaultValue: _defaultNoiseFloor,
  );

  static const bool appNeighbours = true;
  static const bool appHomeAssistant = true;
  static const bool appObservedChannels = true;

  static bool isEnabled(AppFeature feature) => switch (feature) {
    AppFeature.map => true,
    AppFeature.topology => appTopology,
    AppFeature.neighbours => appNeighbours,
    AppFeature.observedChannels => appObservedChannels,
    AppFeature.homeassistant => appHomeAssistant,
    AppFeature.rxlog => appRxLog,
    AppFeature.noisefloor => appNoiseFloor,
  };
}
