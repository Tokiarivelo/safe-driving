import 'vehicle_type_fragments.dart';

const String vehicleTypesQuery =
    vehicleTypeFragment +
    r'''
  query VehicleTypes($where: VehicleTypeWhereInput, $orderBy: [VehicleTypeOrderByWithRelationInput!], $cursor: VehicleTypeWhereUniqueInput, $take: Int, $skip: Int, $distinct: [VehicleTypeScalarFieldEnum!]) {
    vehicleTypes(where: $where, orderBy: $orderBy, cursor: $cursor, take: $take, skip: $skip, distinct: $distinct) {
      ...VehicleTypeFragment
    }
  }
''';

const String vehicleTypeQuery =
    vehicleTypeFragment +
    r'''
  query VehicleType($id: String!) {
    VehicleType(id: $id) {
      ...VehicleTypeFragment
    }
  }
''';
