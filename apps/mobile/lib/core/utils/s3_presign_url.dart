import 'package:flutter/foundation.dart'
    show kIsWeb, defaultTargetPlatform, TargetPlatform;
import 'package:flutter_dotenv/flutter_dotenv.dart';

class PresignedUrlUtil {
  PresignedUrlUtil._();

  static String adjustForDevice(String url) {
    Uri uri;
    try {
      uri = Uri.parse(url);
    } catch (_) {
      return url;
    }


    if (kIsWeb) {
   
      if (uri.host == '10.0.2.2') {
        final adjusted = uri.replace(host: 'localhost', port: uri.port == 0 ? 4566 : uri.port);
        return adjusted.toString();
      }
      return url;
    }

    const localHosts = {
      'localhost',
      '127.0.0.1',
      '10.0.2.2',
      's3.localhost.localstack.cloud',
    };
    if (!localHosts.contains(uri.host)) return url;

    String? hostOverride;
    String? portOverride;
    try {
      if (dotenv.isInitialized) {
        hostOverride = dotenv.env['LOCALSTACK_CLIENT_HOST'];
        portOverride = dotenv.env['LOCALSTACK_CLIENT_PORT'];
      }
    } catch (_) {}

    String newHost;
    int newPort;

    if (hostOverride != null && hostOverride.trim().isNotEmpty) {
      newHost = hostOverride.trim();
    } else {
      if (defaultTargetPlatform == TargetPlatform.android) {
        newHost = '10.0.2.2';
      } else {
        newHost = 'localhost';
      }
    }

    if (portOverride != null && portOverride.trim().isNotEmpty) {
      newPort = int.tryParse(portOverride.trim()) ?? (uri.port == 0 ? 4566 : uri.port);
    } else {
      newPort = uri.port == 0 ? 4566 : uri.port;
    }

    final adjusted = uri.replace(host: newHost, port: newPort);
    return adjusted.toString();
  }
}
