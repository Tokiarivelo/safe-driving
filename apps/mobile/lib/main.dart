import 'package:flutter/material.dart';

import 'package:flutter/foundation.dart' show kIsWeb;
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:graphql_flutter/graphql_flutter.dart';
import 'package:safe_driving/app/app_initializer.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();

  try {
    if (kIsWeb) {
      try {
        await dotenv.load(fileName: ".env.web");
      } catch (_) {
        await dotenv.load(fileName: ".env");
      }
    } else {
      await dotenv.load(fileName: ".env");
    }
  } catch (_) {}

  await initHiveForFlutter();

  runApp(SafeDriving());
}
