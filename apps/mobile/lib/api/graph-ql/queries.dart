export 'modules/user/user_queries.dart';

export 'modules/vehicle/vehicle_queries.dart';

export 'modules/vehicle-type/vehicle_type_queries.dart';

export 'modules/preference/preference_queries.dart';

export 'modules/file/file_queries.dart';

export 'modules/s3/s3_queries.dart';

export 'modules/qr/qr_queries.dart';

export 'modules/upload/upload_queries.dart';
export 'modules/role/role_queries.dart';

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
query GetUserPreferences {
  userPreference {
    id
    userId
    language
    theme
    activateEmailNotifications
    activateSmsNotifications
    activateLocation
    activateNotifications
    cguAccepted
    privacyPolicyAccepted
    preferedvelicles { id name }
    createdAt
    updatedAt
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
  }
}
''';

const String getDriverOnboardingDataQuery = r'''
query GetDriverOnboardingData($userId: String!) {
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
    key
    url
    originalName
    contentType
    size
    status
    type
  }
}
''';

const String getDriverStatsQuery = r'''
query GetDriverStats($userId: String!) {
  user(id: $userId) {
    id
    email
    firstName
    lastName
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
    registrationNumber
    place
    type {
      id
      name
    }
  }
}
''';

const String getVehicleTypesQuery = r'''
query GetVehicleTypes {
  vehicleTypes {
    id
    name
  }
}
''';
