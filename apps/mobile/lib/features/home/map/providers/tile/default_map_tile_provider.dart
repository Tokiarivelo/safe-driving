import '../../core/interfaces/i_map_tile_provider.dart';
import '../../core/map_config.dart';

class DefaultMapTileProvider implements IMapTileProvider {
  @override
  String get tileUrlTemplate => MapConfig.tileUrlTemplate;

  @override
  List<String> get tileSubdomains => MapConfig.tileSubdomains;

  @override
  String? get userAgentPackageName => 'com.safe_driving.app';
}
