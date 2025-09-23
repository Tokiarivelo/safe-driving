import 'package:permission_handler/permission_handler.dart';

class PermissionsService {
  Future<bool> requestCamera() async {
    try {
      final status = await Permission.camera.request();
      return status.isGranted;
    } catch (_) {
      return false;
    }
  }

  Future<bool> requestStorage() async {
    try {
      final status = await Permission.storage.request();
      return status.isGranted;
    } catch (_) {
      return false;
    }
  }

  Future<bool> requestLocation() async {
    try {
      final status = await Permission.location.request();
      return status.isGranted;
    } catch (_) {
      return false;
    }
  }
}
