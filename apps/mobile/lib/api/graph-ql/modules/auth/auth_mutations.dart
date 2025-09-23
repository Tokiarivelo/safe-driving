const String loginMutation = r'''
mutation Login($data: LoginInput!) {
  login(data: $data) {
    token
    user {
      id
      firstName
    }
  }
}
''';

const String registerMutation = r'''
mutation Register($data: RegisterInput!) {
  register(data: $data) {
    id
    username
    firstName
  }
}
''';

const String logoutMutation = r'''
mutation Logout {
  logout
}
''';

const String forgotPasswordMutation = r'''
mutation ForgotPassword($email: String!) {
  forgotPassword(email: $email) {
    resetLink
    email
  }
}
''';

const String resetPasswordMutation = r'''
mutation ResetPassword($sessionToken: String!, $newPassword: String!) {
  resetPassword(sessionToken: $sessionToken, newPassword: $newPassword)
}
''';
