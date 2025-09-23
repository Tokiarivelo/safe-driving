import '../preference/preference_fragments.dart';

const String userFragment =
    userPreferenceFragment +
    r'''
fragment UserFragment on User {
  id
  email
  firstName
  lastName
  phone
  createdAt
  updatedAt
  isVerified
  Role {
    id
    name
  }
  UserPreference {
    ...UserPreferenceFragment
  }
}
''';
