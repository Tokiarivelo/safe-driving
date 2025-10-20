import 'user_fragments.dart';

const String createUserMutation =
    userFragment +
    r'''
mutation CreateUser($input: UserCreateInput!) {
  createUser(input: $input) {
    ...UserFragment
  }
}
''';

const String updateUserMutation =
    userFragment +
    r'''
mutation UpdateUser($input: UserUpdateInput!) {
  updateUser(input: $input) {
    ...UserFragment
  }
}
''';

const String setUserRoleMutation = r'''
mutation SetUserRole($userId: String!, $role: String!) {
  setUserRole(userId: $userId, role: $role) {
    id
    roles
  }
}
''';
