// Preference mutations
const String upsertUserPreferenceMutation = r'''
  mutation UpsertUserPreference($input: UserPreferenceUpsertInput!) {
    upsertUserPreference(input: $input) {
      id
      userId
      language
      theme
      notificationsEnabled
      locationEnabled
      settings
      createdAt
      updatedAt
    }
  }
''';
