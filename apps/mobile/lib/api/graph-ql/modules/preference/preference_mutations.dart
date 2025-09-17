const String upsertUserPreferenceMutation = r'''
  mutation UpsertUserPreference($input: UserPreferenceUpsertInput!) {
    upsertUserPreference(input: $input) {
      id
      cguAccepted
      activateLocation
      activateNotifications
      createdAt
      language
      preferedvelicles {
        id
        name
      }
      theme
      userId
    }
  }
''';
