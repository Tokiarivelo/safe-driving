import 'package:flutter/material.dart';
import 'package:geolocator/geolocator.dart';
import 'package:permission_handler/permission_handler.dart';
import 'package:safe_driving/shared/widgets/customs/snackbar/snackbar_helper.dart';

class PermissionHandlers {
  static Future<bool> handleGpsPermission(BuildContext context) async {
    bool serviceEnabled = await Geolocator.isLocationServiceEnabled();
    if (!serviceEnabled) {
      if (context.mounted) {
        SnackbarHelper.showError(
          context,
          'Les services de localisation sont désactivés. Veuillez les activer.',
        );
      }
      await Geolocator.openLocationSettings();
      return false;
    }

    LocationPermission permission = await Geolocator.checkPermission();
    if (permission == LocationPermission.denied) {
      permission = await Geolocator.requestPermission();
      if (permission == LocationPermission.denied) {
        if (context.mounted) {
          SnackbarHelper.showError(
            context,
            'Permission de localisation refusée.',
          );
        }
        return false;
      }
    }

    if (permission == LocationPermission.deniedForever) {
      if (context.mounted) {
        SnackbarHelper.showError(
          context,
          'La permission de localisation est refusée en permanence. Veuillez l\'activer dans les paramètres de l\'application.',
        );
      }
      await Geolocator.openAppSettings();
      return false;
    }

    return true;
  }

  static Future<bool> handleNotificationPermissions(
    BuildContext context,
    List<String> selectedNotifications,
  ) async {
    bool needsPermission = selectedNotifications.any(
      (type) =>
          type.toLowerCase().contains('push') ||
          type.toLowerCase().contains('notification'),
    );

    if (!needsPermission) {
      if (context.mounted) {
        SnackbarHelper.showSuccess(
          context,
          'Préférences de notifications sauvegardées !',
        );
      }
      return true;
    }

    PermissionStatus permission = await Permission.notification.status;

    if (permission.isDenied) {
      permission = await Permission.notification.request();

      if (permission.isDenied) {
        if (context.mounted) {
          SnackbarHelper.showError(
            context,
            'Permission de notifications refusée. Vous ne recevrez pas de notifications push.',
          );
        }
        return false;
      }
    }

    if (permission.isPermanentlyDenied) {
      if (context.mounted) {
        SnackbarHelper.showError(
          context,
          'Permission de notifications refusée en permanence. Veuillez l\'activer dans les paramètres de l\'application.',
        );
        await openAppSettings();
      }
      return false;
    }

    if (permission.isGranted) {
      if (context.mounted) {
        SnackbarHelper.showSuccess(
          context,
          'Notifications activées avec succès !',
        );
      }
      return true;
    }

    return false;
  }
}
