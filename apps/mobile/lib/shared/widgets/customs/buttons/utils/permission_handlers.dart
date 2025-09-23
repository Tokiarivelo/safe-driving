import 'package:flutter/material.dart';
import 'package:flutter/foundation.dart' show kIsWeb;
import 'dart:io' show Platform;
import 'package:geolocator/geolocator.dart';
import 'package:permission_handler/permission_handler.dart';
import 'package:safe_driving/shared/widgets/customs/snackbar/snackbar_helper.dart';

class PermissionHandlers {
  static Future<bool> handleGpsPermission(BuildContext context) async {
    if (kIsWeb) {
      // On Web, the browser manages permissions; just request via Geolocator
      try {
        final permission = await Geolocator.requestPermission();
        final granted =
            permission == LocationPermission.always ||
            permission == LocationPermission.whileInUse;
        if (!granted && context.mounted) {
          SnackbarHelper.showError(
            context,
            'Permission de localisation refusée par le navigateur.',
          );
        }
        return granted;
      } catch (_) {
        if (context.mounted) {
          SnackbarHelper.showError(
            context,
            'Géolocalisation non supportée sur ce navigateur.',
          );
        }
        return false;
      }
    }

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

    // Optionally escalate to background permission on Android if only WhileInUse is granted
    if (Platform.isAndroid && permission == LocationPermission.whileInUse) {
      final bgStatus = await Permission.locationAlways.status;
      if (bgStatus.isDenied) {
        final requested = await Permission.locationAlways.request();
        if (!requested.isGranted) {
          // Not critical for foreground usage; inform user if needed
          if (context.mounted) {
            SnackbarHelper.showError(
              context,
              'La localisation en arrière-plan n\'est pas activée. Certaines fonctionnalités peuvent être limitées.',
            );
          }
        }
      }
    }

    return true;
  }

  static Future<bool> handleNotificationPermissions(
    BuildContext context,
    List<String> selectedNotifications,
  ) async {
    final needsPermission = selectedNotifications.any(
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

    if (kIsWeb) {
      if (context.mounted) {
        SnackbarHelper.showSuccess(
          context,
          'Les notifications sont gérées par votre navigateur.',
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

  static Future<bool> handleSmsPermission(BuildContext context) async {
    if (kIsWeb) {
      if (context.mounted) {
        SnackbarHelper.showSuccess(
          context,
          'Les SMS ne nécessitent pas de permission sur le Web.',
        );
      }
      return true;
    }

    PermissionStatus permission = await Permission.sms.status;

    if (permission.isDenied) {
      permission = await Permission.sms.request();
      if (permission.isDenied) {
        if (context.mounted) {
          SnackbarHelper.showError(
            context,
            'Permission SMS refusée. Certaines fonctionnalités par SMS peuvent ne pas fonctionner.',
          );
        }
        return false;
      }
    }

    if (permission.isPermanentlyDenied) {
      if (context.mounted) {
        SnackbarHelper.showError(
          context,
          'Permission SMS refusée en permanence. Veuillez l\'activer dans les paramètres de l\'application.',
        );
        await openAppSettings();
      }
      return false;
    }

    if (permission.isGranted) {
      if (context.mounted) {
        SnackbarHelper.showSuccess(context, 'Permission SMS accordée !');
      }
      return true;
    }

    return false;
  }
}
