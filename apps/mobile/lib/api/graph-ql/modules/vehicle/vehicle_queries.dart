import 'vehicle_fragments.dart';

const String vehiclesQuery = driverVehicleFragment + r'''
query Vehicles {
  vehicles {
    ...DriverVehicleFragment
  }
}
''';

