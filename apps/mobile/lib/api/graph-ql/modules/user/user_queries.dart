import 'user_fragments.dart';

const String meQuery = userFragment + r'''
query Me {
  me {
    ...UserFragment
  }
}
''';

const String userQuery = userFragment + r'''
query User($id: String!) {
  user(id: $id) {
    ...UserFragment
  }
}
''';

const String usersQuery = userFragment + r'''
query Users($where: UserWhereInput, $take: Int, $skip: Int) {
  users(where: $where, take: $take, skip: $skip) {
    ...UserFragment
  }
}
''';

const String usersForAdminQuery = userFragment + r'''
query UsersForAdmin($where: UserWhereInput, $take: Int, $skip: Int) {
  usersForAdmin(where: $where, take: $take, skip: $skip) {
    ...UserFragment
  }
}
''';

const String userByTokenQuery = userFragment + r'''
query UserByToken($token: String!) {
  userByToken(token: $token) {
    ...UserFragment
  }
}
''';

