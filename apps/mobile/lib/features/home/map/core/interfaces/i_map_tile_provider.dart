abstract class IMapTileProvider {
  String get tileUrlTemplate;
  List<String> get tileSubdomains;
  String? get userAgentPackageName => null;
}
