import 'queries.dart';

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

const String resetPasswordMutation = r'''
mutation ResetPassword($password: String!) {
  resetPassword(password: $password) {
    success
  }
}
''';

const String refreshTokenMutation = r'''
mutation RefreshToken($refreshToken: String!) {
  refreshToken(refreshToken: $refreshToken) {
    success
    tokens {
      accessToken
      refreshToken
      expiresAt
    }
    message
    errorCode
  }
}
''';

// Auth data source mutations (à migrer progressivement)
const String signInMutation = r'''
mutation SignIn($data: SignInInput!) {
  signIn(data: $data) {
    success
    user {
      id
      email
      firstName
      lastName
      phoneNumber
      roles
      createdAt
      updatedAt
      isEmailVerified
      isActive
    }
    tokens {
      accessToken
      refreshToken
      expiresAt
    }
    message
    errorCode
  }
}
''';

const String signUpMutation = r'''
mutation SignUp($data: SignUpInput!) {
  signUp(data: $data) {
    success
    user {
      id
      email
      firstName
      lastName
      phoneNumber
      roles
      createdAt
      updatedAt
      isEmailVerified
      isActive
    }
    tokens {
      accessToken
      refreshToken
      expiresAt
    }
    message
    errorCode
  }
}
''';

const String resetPasswordAuthMutation = r'''
mutation ResetPassword($data: ResetPasswordInput!) {
  resetPassword(data: $data) {
    success
    message
    errorCode
  }
}
''';

const String signInWithGoogleMutation = r'''
mutation SignInWithGoogle {
  signInWithGoogle {
    success
    user {
      id
      email
      firstName
      lastName
      phoneNumber
      roles
      createdAt
      updatedAt
      isEmailVerified
      isActive
    }
    tokens {
      accessToken
      refreshToken
      expiresAt
    }
    message
    errorCode
  }
}
''';

const String signInWithFacebookMutation = r'''
mutation SignInWithFacebook {
  signInWithFacebook {
    success
    user {
      id
      email
      firstName
      lastName
      phoneNumber
      roles
      createdAt
      updatedAt
      isEmailVerified
      isActive
    }
    tokens {
      accessToken
      refreshToken
      expiresAt
    }
    message
    errorCode
  }
}
''';

const String updateProfileMutation = r'''
mutation UpdateProfile($data: UpdateProfileInput!) {
  updateProfile(data: $data) {
    id
    email
    firstName
    lastName
    phoneNumber
    roles
    createdAt
    updatedAt
    isEmailVerified
    isActive
  }
}
''';

const String changePasswordMutation = r'''
mutation ChangePassword($data: ChangePasswordInput!) {
  changePassword(data: $data) {
    success
    message
    errorCode
  }
}
''';

const String deleteAccountMutation = r'''
mutation DeleteAccount($userId: String!, $password: String!) {
  deleteAccount(userId: $userId, password: $password) {
    success
    message
    errorCode
  }
}
''';

// User mutations
const String createUserMutation =
    r'''
mutation CreateUser($input: CreateUserInput!) {
  createUser(input: $input) {
    ...UserFragment
  }
}
''' +
    userFragment;

const String updateUserMutation =
    r'''
mutation UpdateUser($id: String!, $input: UpdateUserInput!) {
  updateUser(id: $id, input: $input) {
    ...UserFragment
  }
}
''' +
    userFragment;

const String deleteUserMutation = r'''
mutation DeleteUser($id: String!) {
  deleteUser(id: $id) {
    id
  }
}
''';

// User preferences mutations
const String saveThemePreferenceMutation = r'''
mutation SaveThemePreference($theme: String!) {
  saveThemePreference(theme: $theme) {
    success
    message
  }
}
''';

const String saveLanguagePreferenceMutation = r'''
mutation SaveLanguagePreference($language: String!) {
  saveLanguagePreference(language: $language) {
    success
    message
  }
}
''';

const String saveGpsPreferenceMutation = r'''
mutation SaveGpsPreference($enabled: Boolean!) {
  saveGpsPreference(enabled: $enabled) {
    success
    message
  }
}
''';

const String saveNotificationPreferenceMutation = r'''
mutation SaveNotificationPreference($enabled: Boolean!) {
  saveNotificationPreference(enabled: $enabled) {
    success
    message
  }
}
''';

const String saveTransportPreferencesMutation = r'''
mutation SaveTransportPreferences($transports: [String!]!) {
  saveTransportPreferences(transports: $transports) {
    success
    message
  }
}
''';

const String completeOnboardingMutation = r'''
mutation CompleteOnboarding($appState: AppStateInput!) {
  completeOnboarding(appState: $appState) {
    success
    message
  }
}
''';

// Driver onboarding mutations
const String saveDriverPersonalInfoMutation = r'''
mutation SaveDriverPersonalInfo($input: DriverPersonalInfoInput!) {
  saveDriverPersonalInfo(input: $input) {
    success
    message
    data {
      id
      name
      email
      phone
    }
  }
}
''';

const String saveDriverVehicleInfoMutation = r'''
mutation SaveDriverVehicleInfo($input: DriverVehicleInfoInput!) {
  saveDriverVehicleInfo(input: $input) {
    success
    message
    data {
      id
      marque
      modele
      immatriculation
      couleur
      annee
      places
      typeVehicule
    }
  }
}
''';

const String uploadDriverDocumentMutation = r'''
mutation UploadDriverDocument($input: DocumentUploadInput!) {
  uploadDriverDocument(input: $input) {
    success
    message
    data {
      id
      documentType
      filePath
      side
      uploadedAt
    }
  }
}
''';

const String uploadDriverSelfieMutation = r'''
mutation UploadDriverSelfie($input: SelfieUploadInput!) {
  uploadDriverSelfie(input: $input) {
    success
    message
    data {
      id
      filePath
      uploadedAt
    }
  }
}
''';

const String saveDriverNotificationPreferencesMutation = r'''
mutation SaveDriverNotificationPreferences($input: NotificationPreferencesInput!) {
  saveDriverNotificationPreferences(input: $input) {
    success
    message
    data {
      userId
      preferences
    }
  }
}
''';

const String saveDriverAppPreferencesMutation = r'''
mutation SaveDriverAppPreferences($input: AppPreferencesInput!) {
  saveDriverAppPreferences(input: $input) {
    success
    message
    data {
      userId
      theme
      language
    }
  }
}
''';

const String completeDriverOnboardingMutation = r'''
mutation CompleteDriverOnboarding($userId: String!) {
  completeDriverOnboarding(userId: $userId) {
    success
    message
    data {
      userId
      completedAt
      status
    }
  }
}
''';

const String updateDriverOnboardingStepMutation = r'''
mutation UpdateDriverOnboardingStep($input: OnboardingStepInput!) {
  updateDriverOnboardingStep(input: $input) {
    success
    message
    data {
      userId
      currentStep
      updatedAt
    }
  }
}
''';
