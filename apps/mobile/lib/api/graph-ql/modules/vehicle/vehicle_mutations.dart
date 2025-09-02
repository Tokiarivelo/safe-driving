import 'vehicle_fragments.dart';

const String createDriverVehicleMutation = driverVehicleFragment + r'''
mutation CreateDriverVehicle($input: CreateDriverVehicleInput!) {
  createDriverVehicle(input: $input) {
    ...DriverVehicleFragment
  }
}
''';

const String updateDriverVehicleMutation = driverVehicleFragment + r'''
mutation UpdateDriverVehicle($vehicleId: String!, $input: CreateDriverVehicleInput!) {
  updateDriverVehicle(vehicleId: $vehicleId, input: $input) {
    ...DriverVehicleFragment
  }
}
''';

