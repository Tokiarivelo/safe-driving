import 'vehicle_type_fragments.dart';

const String createVehicleTypeMutation =
    vehicleTypeFragment +
    r'''
  mutation CreateVehicleType($input: VehicleTypeCreateInput!) {
    createVehicleType(input: $input) {
      ...VehicleTypeFragment
    }
  }
''';

const String deleteVehicleTypeMutation =
    vehicleTypeFragment +
    r'''
  mutation DeleteVehicleType($id: String!) {
    deleteVehicleType(id: $id) {
      ...VehicleTypeFragment
    }
  }
''';
