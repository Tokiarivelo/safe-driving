import 'vehicle_fragments.dart';

const String vehiclesQuery = driverVehicleFragment + r'''
query Vehicles {
  vehicles {
    ...DriverVehicleFragment
  }
}
''';

const String vehiclesWithFilesQuery = r'''
query userVehicle {
  vehicles {
    VehicleDocument {
      createdAt
      documentType
      driverVehicleId
      file {
        id
        key
        url
      }
      fileId
      id
      name
      updatedAt
    }
    VehicleImage {
      createdAt
      driverVehicleId
      file {
        id
        key
        url
      }
      fileId
      id
      updatedAt
    }
    brand
    id
    model
    place
    registrationNumber
    type {
      id
      name
    }
  }
}
''';

