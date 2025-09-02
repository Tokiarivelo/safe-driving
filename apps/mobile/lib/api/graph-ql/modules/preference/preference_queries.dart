import 'preference_fragments.dart';

const String userPreferenceQuery = userPreferenceFragment + r'''
query UserPreference {
  userPreference {
    ...UserPreferenceFragment
  }
}
''';
