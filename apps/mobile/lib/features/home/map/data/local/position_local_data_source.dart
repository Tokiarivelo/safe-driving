import 'package:shared_preferences/shared_preferences.dart';
import 'package:safe_driving/core/constants/constants.dart';

class PositionLocalDataSource {
  Future<void> saveLast(double lat, double lng) async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setDouble(kPrefLastLat, lat);
    await prefs.setDouble(kPrefLastLng, lng);
    await prefs.setString(kPrefLastUpdatedAt, DateTime.now().toIso8601String());
  }
}
