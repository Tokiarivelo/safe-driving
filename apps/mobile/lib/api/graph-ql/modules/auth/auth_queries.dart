const String meAuthQuery = r'''
  query MeAuth {
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
