// Preference mutations
const String upsertUserPreferenceMutation = r'''
  mutation UpsertUserPreference($input: UserPreferenceUpsertInput!) {
    upsertUserPreference(input: $input) {
      id
      userId
      language
      theme
      activateEmailNotifications
      activateSmsNotifications
      activateLocation
      activateNotifications
      cguAccepted
      privacyPolicyAccepted
      createdAt
      updatedAt
      preferedvelicles {
        id
        name
      }
    }
  }
''';
