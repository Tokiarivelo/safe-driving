export 'modules/auth/auth_mutations.dart';

export 'modules/user/user_mutations.dart';

export 'modules/vehicle/vehicle_mutations.dart';

export 'modules/vehicle-type/vehicle_type_mutations.dart';

export 'modules/preference/preference_mutations.dart';

export 'modules/file/file_mutations.dart';

export 'modules/upload/upload_mutations.dart';

export 'modules/s3/s3_mutations.dart';

export 'modules/qr/qr_mutations.dart';

export 'modules/scan-session/scan_session_mutations.dart';

import 'modules/auth/auth_mutations.dart';
import 'modules/s3/s3_mutations.dart' as s3;

export 'modules/chat/chat_mutations.dart';

const String signInMutation = loginMutation;
const String signUpMutation = registerMutation;
const String resetPasswordAuthMutation = resetPasswordMutation;
const String getPresignedUrlMutation = s3.s3CreatePresignedUrlMutation;

const String refreshTokenMutation = r'''
mutation RefreshToken($refreshToken: String!) {
 
  refreshToken(refreshToken: $refreshToken) {
    token
    user {
      id
    }
  }
}
''';

const String signInWithGoogleMutation = r'''
mutation SignInWithGoogle {
 
  signInWithGoogle {
    token
    user {
      id
      email
    }
  }
}
''';

const String signInWithFacebookMutation = r'''
mutation SignInWithFacebook {

  signInWithFacebook {
    token
    user {
      id
      email
    }
  }
}
''';

const String updateProfileMutation = r'''
mutation UpdateProfile($data: UserUpdateInput!) {
  updateUser(input: $data) {
    id
    email
    firstName
    lastName
  }
}
''';

const String changePasswordMutation = r'''
mutation ChangePassword($data: ChangePasswordInput!) {

  changePassword(data: $data) {
    success
  }
}
''';

const String deleteAccountMutation = r'''
mutation DeleteAccount($userId: String!, $password: String!) {

  deleteAccount(userId: $userId, password: $password) {
    success
  }
}
''';

const String saveDriverPersonalInfoMutation = r'''
mutation SaveDriverPersonalInfo($input: DriverPersonalInfoInput!) {

  saveDriverPersonalInfo(input: $input) {
    success
  }
}
''';

const String saveDriverVehicleInfoMutation = r'''
mutation SaveDriverVehicleInfo($input: DriverVehicleInfoInput!) {
  createDriverVehicle(input: $input) {
    id
  }
}
''';

const String uploadDriverDocumentMutation = r'''
mutation UploadDriverDocument($input: UploadDocumentInput!) {
 
  uploadDriverDocument(input: $input) {
    success
  }
}
''';

const String uploadDriverSelfieMutation = r'''
mutation UploadDriverSelfie($input: UploadSelfieInput!) {
 
  uploadDriverSelfie(input: $input) {
    success
  }
}
''';

const String saveDriverNotificationPreferencesMutation = r'''
mutation SaveDriverNotificationPreferences($input: NotificationPreferencesInput!) {
  upsertUserPreference(input: $input) {
    id
  }
}
''';

const String saveDriverAppPreferencesMutation = r'''
mutation SaveDriverAppPreferences($input: AppPreferencesInput!) {
  upsertUserPreference(input: $input) {
    id
  }
}
''';

const String completeDriverOnboardingMutation = r'''
mutation CompleteDriverOnboarding($userId: String!) {

  completeDriverOnboarding(userId: $userId) {
    success
  }
}
''';

const String updateDriverOnboardingStepMutation = r'''
mutation UpdateDriverOnboardingStep($input: OnboardingStepInput!) {

  updateDriverOnboardingStep(input: $input) {
    success
  }
}
''';

const String saveThemePreferenceMutation = r'''
mutation SaveThemePreference($theme: String!) {
  upsertUserPreference(input: { theme: $theme }) {
    id
    theme
  }
}
''';

const String saveLanguagePreferenceMutation = r'''
mutation SaveLanguagePreference($language: String!) {
  upsertUserPreference(input: { language: $language }) {
    id
    language
  }
}
''';

const String saveGpsPreferenceMutation = r'''
mutation SaveGpsPreference($enabled: Boolean!) {
  upsertUserPreference(input: { activateLocation: $enabled }) {
    id
    activateLocation
  }
}
''';

const String saveNotificationPreferenceMutation = r'''
mutation SaveNotificationPreference($enabled: Boolean!) {
  upsertUserPreference(input: { activateNotifications: $enabled }) {
    id
    activateNotifications
  }
}
''';

const String saveTransportPreferencesMutation = r'''
mutation SaveTransportPreferences($transports: [String!]!) {
  upsertUserPreference(input: { transportModes: $transports }) {
    id
    transportModes
  }
}
''';

const String completeOnboardingMutation = r'''
mutation CompleteOnboarding($appState: AppStateInput!) {

  completeOnboarding(appState: $appState) {
    success
  }
}
''';
