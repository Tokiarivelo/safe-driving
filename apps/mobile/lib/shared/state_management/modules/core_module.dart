import 'package:safe_driving/shared/state_management/service_locator.dart';
import 'package:safe_driving/features/authentication/services/session_service.dart';
import 'package:safe_driving/core/theme/theme_controller.dart';

void registerCoreModule(ServiceLocator sl) {
  sl.registerLazySingleton<SessionService>(() => SessionService());
  try {
    sl.get<SessionService>().initialize();
  } catch (_) {}
  sl.registerLazySingleton<ThemeController>(() => ThemeController());
}
