const String userPreferenceFragment = r'''
fragment UserPreferenceFragment on UserPreference {
  id
  userId
  selectedDriverVehicleId
  location
  createdAt
  updatedAt
  vehicleDocuments {
    id
    fileId
    driverVehicleId
  }
  vehicleImages {
    id
    fileId
    driverVehicleId
  }
  userImages {
    id
    fileId
    userId
  }
  userDocuments {
    id
    fileId
    userId
  }
}
''';
