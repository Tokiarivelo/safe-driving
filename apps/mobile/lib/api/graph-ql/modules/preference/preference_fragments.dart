const String userPreferenceFragment = r'''
fragment UserPreferenceFragment on UserPreference {
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
''';
