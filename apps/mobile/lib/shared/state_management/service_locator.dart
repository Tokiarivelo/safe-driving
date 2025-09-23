import 'package:safe_driving/shared/state_management/modules/core_module.dart';
import 'package:safe_driving/shared/state_management/modules/graphql_module.dart';
import 'package:safe_driving/features/authentication/di.dart';
import 'package:safe_driving/features/onboarding/driver/di.dart';
import 'package:safe_driving/features/onboarding/user/di.dart';
import 'package:safe_driving/features/home/map/di.dart';

typedef _FactoryFunc<T> = T Function();
typedef _Disposer = void Function(dynamic);

class ServiceLocator {
  static ServiceLocator? _instance;
  static ServiceLocator get instance => _instance ??= ServiceLocator._();

  ServiceLocator._();

  final Map<Type, dynamic> _services = {};

  final Map<Type, _FactoryFunc<dynamic>> _lazyFactories = {};
  final Map<Type, _FactoryFunc<dynamic>> _factories = {};
  final Map<Type, _Disposer> _disposers = {};

  void registerSingleton<T>(T instance, {void Function(T)? dispose}) {
    _ensureNotRegistered<T>();
    _services[T] = instance;
    if (dispose != null) _disposers[T] = (obj) => dispose(obj as T);
  }

  void registerLazySingleton<T>(
    T Function() factory, {
    void Function(T)? dispose,
  }) {
    _ensureNotRegistered<T>();
    _lazyFactories[T] = factory;
    if (dispose != null) _disposers[T] = (obj) => dispose(obj as T);
  }

  void registerFactory<T>(T Function() factory) {
    _ensureNotRegistered<T>();
    _factories[T] = factory;
  }

  T get<T>() {
    if (_services.containsKey(T)) return _services[T] as T;

    final lazy = _lazyFactories[T];
    if (lazy != null) {
      final built = lazy() as T;
      _services[T] = built;
      return built;
    }

    final f = _factories[T];
    if (f != null) {
      return f() as T;
    }

    throw Exception(
      'Service of type $T is not registered. '
      'Tip: check setupDependencies() or use isRegistered<$T>().',
    );
  }

  bool isRegistered<T>() =>
      _services.containsKey(T) ||
      _lazyFactories.containsKey(T) ||
      _factories.containsKey(T);

  void override<T>(T Function() factory, {bool asSingleton = true}) {
    unregister<T>();
    if (asSingleton) {
      registerLazySingleton<T>(factory);
    } else {
      registerFactory<T>(factory);
    }
  }

  void unregister<T>() {
    if (_services.containsKey(T)) {
      final instance = _services.remove(T);
      final disposer = _disposers.remove(T);
      if (disposer != null && instance != null) disposer(instance);
    }
    _lazyFactories.remove(T);
    _factories.remove(T);
  }

  void disposeAll() {
    _services.forEach((type, instance) {
      final disposer = _disposers[type];
      if (disposer != null) disposer(instance);
    });
    reset();
  }

  void reset() {
    _services.clear();
    _lazyFactories.clear();
    _factories.clear();
    _disposers.clear();
  }

  void _ensureNotRegistered<T>() {
    if (isRegistered<T>()) {
      throw Exception('Type $T already registered');
    }
  }

  void setupDependencies() {
    registerCoreModule(this);

    registerGraphQLModule(this);

    registerAuthModule(this);
    registerOnboardingDriverModule(this);
    registerOnboardingUserModule(this);
    registerMapModule(this);
  }
}
