import 'package:safe_driving/shared/state_management/service_locator.dart';
import 'package:safe_driving/api/graph-ql/client/graphql_config.dart';
import 'package:safe_driving/features/home/map/core/interfaces/i_map_tile_provider.dart';
import 'package:safe_driving/features/home/map/providers/tile/default_map_tile_provider.dart';
import 'package:safe_driving/features/home/map/core/interfaces/i_route_provider.dart';
import 'package:safe_driving/features/home/map/providers/route/ors_route_provider.dart';
import 'package:safe_driving/features/home/map/core/interfaces/i_map_data_source.dart';
import 'package:safe_driving/features/home/map/data/map_data_source.dart';
import 'package:safe_driving/features/home/map/core/interfaces/i_map_service.dart';
import 'package:safe_driving/features/home/map/services/map_service.dart';
import 'package:safe_driving/features/home/map/core/interfaces/i_position_data_source.dart';
import 'package:safe_driving/features/home/map/data/position_data_source_graphql.dart';
import 'package:safe_driving/features/home/map/core/interfaces/i_position_service.dart';
import 'package:safe_driving/features/home/map/services/position_service.dart';
import 'package:safe_driving/api/graph-ql/graphql_client.dart';
import 'package:safe_driving/features/home/map/core/interfaces/i_driver_service.dart' as map_driver;
import 'package:safe_driving/features/home/map/services/map_service_graphql.dart';
import 'package:safe_driving/features/home/map/repositories/map_repository.dart';
import 'package:safe_driving/features/home/map/viewmodels/map_view_model.dart';
import 'package:safe_driving/features/authentication/services/session_service.dart';
import 'package:safe_driving/features/home/map/core/interfaces/i_device_location_service.dart';
import 'package:safe_driving/features/home/map/services/device_location_service_geolocator.dart';
import 'package:safe_driving/features/home/map/data/local/filters_local_data_source.dart';
import 'package:safe_driving/features/home/map/services/filters_service.dart';
import 'package:safe_driving/features/home/map/data/local/position_local_data_source.dart';
import 'package:safe_driving/features/home/map/services/position_persistence_service.dart';

void registerMapModule(ServiceLocator sl) {
  sl.registerLazySingleton<IMapTileProvider>(() => DefaultMapTileProvider());
  sl.registerLazySingleton<IRouteProvider>(() => OrsRouteProvider());
  sl.registerLazySingleton<IMapDataSource>(() => MapDataSource(routeProvider: sl.get<IRouteProvider>()));
  sl.registerLazySingleton<IMapService>(() => MapService(dataSource: sl.get<IMapDataSource>()));

  sl.registerLazySingleton<IDeviceLocationService>(() => DeviceLocationServiceGeolocator());
  sl.registerLazySingleton<FiltersLocalDataSource>(() => FiltersLocalDataSource());
  sl.registerLazySingleton<FiltersService>(() => FiltersService(sl.get<FiltersLocalDataSource>()));
  sl.registerLazySingleton<PositionLocalDataSource>(() => PositionLocalDataSource());
  sl.registerLazySingleton<PositionPersistenceService>(() => PositionPersistenceService(sl.get<PositionLocalDataSource>()));

  if (GraphQLConfig.isConfigured) {
    sl.registerLazySingleton<IPositionDataSource>(() => PositionDataSourceGraphQL(sl.get<GraphQLClientWrapper>()));
    sl.registerLazySingleton<IPositionService>(() => PositionService(sl.get<IPositionDataSource>()));
    sl.registerLazySingleton<map_driver.IDriverService>(() => MapServiceGraphQL(sl.get<GraphQLClientWrapper>()));

    sl.registerLazySingleton<MapRepository>(() => MapRepository(
          service: sl.get<IMapService>(),
          positionService: sl.get<IPositionService>(),
          driverService: sl.get<map_driver.IDriverService>(),
        ));
  } else {
    sl.registerLazySingleton<MapRepository>(() => MapRepository(service: sl.get<IMapService>()));
  }

  sl.registerFactory<MapViewModel>(() => MapViewModel(
        repository: sl.get<MapRepository>(),
        tileProvider: sl.get<IMapTileProvider>(),
        session: sl.get<SessionService>(),
        deviceLocationService: sl.get<IDeviceLocationService>(),
        filtersService: sl.get<FiltersService>(),
        positionPersistence: sl.get<PositionPersistenceService>(),
      ));
}
