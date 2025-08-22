// les Fragments
const String userFragment = r'''
fragment UserFragment on User {
  id
  email
  firstName
  lastName
  phone
  isVerified
  createdAt
  updatedAt
  Role {
    id
    name
  }
  images {
    id
    url
    type
    userId
  }
}
''';

const String getUserQuery =
    r'''
query GetUser($id: String!) {
  user(id: $id) {
    ...UserFragment
  }
}
''' +
    userFragment;

const String getCurrentUserQuery =
    r'''
query GetCurrentUser {
  me {
    ...UserFragment
  }
}
''' +
    userFragment;

const String getUsersQuery =
    r'''
query GetUsers($take: Int, $skip: Int, $where: UserWhereInput) {
  users(take: $take, skip: $skip, where: $where) {
    ...UserFragment
  }
}
''' +
    userFragment;

const String getRolesQuery = r'''
query GetRoles {
  roles {
    id
    name
  }
}
''';

const String isEmailTakenQuery = r'''
query IsEmailTaken($email: String!) {
  isEmailTaken(email: $email)
}
''';

const String getUserPreferencesQuery = r'''
query GetUserPreferences($userId: String!) {
  userPreferences(userId: $userId) {
    theme
    language
    gpsEnabled
    notificationsEnabled
    transportPreferences
    onboardingCompleted
  }
}
''';

const String getUserOnboardingDataQuery = r'''
query GetUserOnboardingData($userId: String!) {
  userOnboardingData(userId: $userId) {
    userId
    preferences
    settings
    createdAt
    updatedAt
  }
}
''';

const String getCurrentUserAuthQuery = r'''
query GetCurrentUser {
  getCurrentUser {
    id
    email
    firstName
    lastName
    phoneNumber
    roles
    createdAt
    updatedAt
    isEmailVerified
    isActive
  }
}
''';

// Driver onboarding queries
const String driverFragment = r'''
fragment DriverFragment on Driver {
  id
  userId
  personalInfo {
    name
    email
    phone
  }
  vehicleInfo {
    marque
    modele
    immatriculation
    couleur
    annee
    places
    typeVehicule
  }
  preferences {
    gpsEnabled
    notifications
    theme
    language
  }
  status
  currentStep
  completedAt
  createdAt
  updatedAt
}
''';

const String getDriverOnboardingDataQuery = r'''
query GetDriverOnboardingData($userId: String!) {
  getDriverOnboardingData(userId: $userId) {
    ...DriverFragment
  }
}
''' + driverFragment;

const String getDriverDocumentsQuery = r'''
query GetDriverDocuments($userId: String!) {
  getDriverDocuments(userId: $userId) {
    id
    type
    filePath
    side
    status
    uploadedAt
    validatedAt
    rejectionReason
  }
}
''';

const String getDriverStatsQuery = r'''
query GetDriverStats($userId: String!) {
  getDriverStats(userId: $userId) {
    totalTrips
    totalDistance
    averageRating
    joinedAt
    lastActivity
  }
}
''';
