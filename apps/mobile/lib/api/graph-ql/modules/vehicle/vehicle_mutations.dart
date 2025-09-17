import 'vehicle_fragments.dart';

const String createDriverVehicleMutation =
    driverVehicleFragment +
    r'''
mutation CreateDriverVehicle($input: CreateDriverVehicleInput!) {
  createDriverVehicle(input: $input) {
    ...DriverVehicleFragment
  }
}
''';

const String updateDriverVehicleMutation =
    driverVehicleFragment +
    r'''
mutation UpdateDriverVehicle($vehicleId: String!, $input: CreateDriverVehicleInput!) {
  updateDriverVehicle(vehicleId: $vehicleId, input: $input) {
    ...DriverVehicleFragment
  }
}
''';

const String uploadVehicleImagesMutation = r'''
mutation uploadVehicleImages($keys: [String!]!, $vehicleId: String!) {
  uploadVehicleImages(keys: $keys, vehicleId: $vehicleId) {
    createdAt
    driverVehicleId
    file {
      contentType
      driverVehicleId
      etag
      id
      key
      meta
      name
      originalName
      size
      status
      type
      url
      userId
    }
    fileId
    id
    updatedAt
  }
}
''';

const String uploadVehicleDocumentsMutation = r'''
mutation uploadVehicleDocuments($input: [UploadVehicleDocumentInput!]!, $vehicleId: String!) {
  uploadVehicleDocuments(input: $input, vehicleId: $vehicleId) {
    createdAt
    driverVehicleId
    file {
      contentType
      driverVehicleId
      etag
      id
      key
      meta
      name
      originalName
      size
      status
      type
      url
      userId
    }
    fileId
    id
    updatedAt
  }
}
''';

const String deleteVehicleDocumentByKeyMutation = r'''
mutation deleteVehicleDocumentByKey($key: String!, $vehicleId: String!) {
  deleteVehicleDocumentByKey(key: $key, vehicleId: $vehicleId) {
    createdAt
    documentType
    driverVehicleId
    file {
      contentType
      driverVehicleId
      etag
      id
      key
      meta
      name
      originalName
      size
      status
      type
      url
      userId
    }
    fileId
    id
    name
    updatedAt
  }
}
''';
