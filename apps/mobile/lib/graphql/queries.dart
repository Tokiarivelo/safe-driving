// User fragment for consistent user data structure
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

// Authentication mutations
const String loginMutation = r'''
mutation Login($data: LoginInput!) {
  login(data: $data) {
    tokens {
      token
      expiresAt
    }
    user {
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
  }
}
''';

const String registerMutation = r'''
mutation Register($data: RegisterInput!) {
  register(data: $data) {
    tokens {
      token
      expiresAt
    }
    user {
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
  }
}
''';

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

// Email validation query
const String isEmailTakenQuery = r'''
query IsEmailTaken($email: String!) {
  isEmailTaken(email: $email)
}
''';
