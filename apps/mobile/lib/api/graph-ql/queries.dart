export 'modules/user/user_queries.dart';

export 'modules/vehicle/vehicle_queries.dart';

export 'modules/vehicle-type/vehicle_type_queries.dart';

export 'modules/preference/preference_queries.dart';

export 'modules/file/file_queries.dart';

export 'modules/s3/s3_queries.dart';

export 'modules/qr/qr_queries.dart';

export 'modules/upload/upload_queries.dart';

const String getCurrentUserAuthQuery = r'''
query GetCurrentUser {
  me {
    id
    email
    firstName
    lastName
    createdAt
    updatedAt
  }
}
''';

const String getUsersQuery = r'''
query GetUsers($take: Int, $skip: Int, $where: UserWhereInput) {
  users(take: $take, skip: $skip, where: $where) {
    id
    email
    firstName
    lastName
    createdAt
    updatedAt
  }
}
''';

const String isEmailTakenQuery = r'''
query IsEmailTaken($email: String!) {
  users(where: { email: { equals: $email } }) {
    id
  }
}
''';

const String getUserPreferencesQuery = r'''
query GetUserPreferences($userId: String!) {
  userPreference {
    id
    userId
    theme
    language
    notificationsEnabled
    gpsEnabled
    transportModes
  }
}
''';

const String getUserOnboardingDataQuery = r'''
query GetUserOnboardingData($userId: String!) {
  user(id: $userId) {
    id
    email
    firstName
    lastName
    # Les données d'onboarding ne sont pas directement disponibles dans le schema actuel
    # Cette query est maintenue pour compatibilité
  }
}
''';

const String getDriverOnboardingDataQuery = r'''
query GetDriverOnboardingData($userId: String!) {
  # Non implémenté dans le backend actuel
  # Retourne les données du user à la place
  user(id: $userId) {
    id
    email
    firstName
    lastName
  }
}
''';

const String getDriverDocumentsQuery = r'''
query GetDriverDocuments($userId: String!) {
  files(where: { userId: { equals: $userId } }) {
    id
    fileName
    fileUrl
    fileType
    size
    createdAt
  }
}
''';

const String getDriverStatsQuery = r'''
query GetDriverStats($userId: String!) {
  # Non implémenté dans le backend actuel
  # Retourne les données du user à la place
  user(id: $userId) {
    id
    email
    firstName
    lastName
    # Les stats de driver ne sont pas disponibles dans le schema actuel
  }
}
''';

const String getVehiclesQuery = r'''
query GetVehicles {
  vehicles {
    id
    userId
    vehicleTypeId
    brand
    model
    year
    color
    licensePlate
    vehicleType {
      id
      typeName
      icon
    }
  }
}
''';

const String getVehicleTypesQuery = r'''
query GetVehicleTypes {
  vehicleTypes {
    id
    typeName
    icon
    createdAt
    updatedAt
  }
}
''';
