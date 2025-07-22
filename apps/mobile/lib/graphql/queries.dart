// User fragment for consistent user data structure
const String userFragment = r'''
fragment UserFragment on User {
  id
  email
  firstName
  lastName
  phone
  username
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

// Authentication mutations
const String loginMutation = r'''
mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
    user {
      ...UserFragment
    }
  }
}
''' + userFragment;

const String registerMutation = r'''
mutation Register($input: CreateUserInput!) {
  register(input: $input) {
    token
    user {
      ...UserFragment
    }
  }
}
''' + userFragment;

// User queries
const String getUserQuery = r'''
query GetUser($id: String!) {
  user(id: $id) {
    ...UserFragment
  }
}
''' + userFragment;

const String getCurrentUserQuery = r'''
query GetCurrentUser {
  me {
    ...UserFragment
  }
}
''' + userFragment;

const String getUsersQuery = r'''
query GetUsers($take: Int, $skip: Int, $where: UserWhereInput) {
  users(take: $take, skip: $skip, where: $where) {
    ...UserFragment
  }
}
''' + userFragment;

// User mutations
const String createUserMutation = r'''
mutation CreateUser($input: CreateUserInput!) {
  createUser(input: $input) {
    ...UserFragment
  }
}
''' + userFragment;

const String updateUserMutation = r'''
mutation UpdateUser($id: String!, $input: UpdateUserInput!) {
  updateUser(id: $id, input: $input) {
    ...UserFragment
  }
}
''' + userFragment;

const String deleteUserMutation = r'''
mutation DeleteUser($id: String!) {
  deleteUser(id: $id) {
    id
  }
}
''';

// Role queries
const String getRolesQuery = r'''
query GetRoles {
  roles {
    id
    name
  }
}
''';

// Password operations
const String changePasswordMutation = r'''
mutation ChangePassword($currentPassword: String!, $newPassword: String!) {
  changePassword(currentPassword: $currentPassword, newPassword: $newPassword) {
    success
    message
  }
}
''';

const String forgotPasswordMutation = r'''
mutation ForgotPassword($email: String!) {
  forgotPassword(email: $email) {
    success
    message
  }
}
''';

const String resetPasswordMutation = r'''
mutation ResetPassword($token: String!, $newPassword: String!) {
  resetPassword(token: $token, newPassword: $newPassword) {
    success
    message
  }
}
''';

// Email verification
const String verifyEmailMutation = r'''
mutation VerifyEmail($token: String!) {
  verifyEmail(token: $token) {
    success
    message
  }
}
''';

const String resendVerificationMutation = r'''
mutation ResendVerification($email: String!) {
  resendVerification(email: $email) {
    success
    message
  }
}
''';
