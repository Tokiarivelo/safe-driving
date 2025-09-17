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

const String meFullQuery = r'''
query me {
  me {
    id
    email
    createdAt
    email
    firstName
    id
    isVerified
    lastName
    password
    phone
    Role {
      id
      name
    }
    username
    UserPreference {
      cguAccepted
      activateLocation
      activateNotifications
      createdAt
      id
      language
      theme
      updatedAt
      userId
      preferedvelicles {
        id
        name
      }
    }
  }
}
''';

const String userFilesQuery = r'''
query UserFiles {
  me {
    id
    UserDocument {
      id
      name
      documentType
      file {
        id
        key
        url
      }
    }
    UserImage {
      id
      file {
        id
        key
        url
      }
    }
    avatar {
      id
      key
      url
    }
    UserCover {
      id
      file {
        id
        key
        url
      }
    }
  }
}
''';


