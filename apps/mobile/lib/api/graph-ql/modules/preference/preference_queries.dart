import 'preference_fragments.dart';

const String userPreferenceQuery =
    userPreferenceFragment +
    r'''
query UserPreference {
  userPreference {
    ...UserPreferenceFragment
  }
}
''';

const String userPreferenceSimpleQuery = r'''
query userPreference {
  userPreference {
    id
    activateLocation
    activateNotifications
    language
    preferedvelicles {
      id
      name
    }
    theme
  }
}
''';
