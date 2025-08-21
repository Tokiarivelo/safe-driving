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
