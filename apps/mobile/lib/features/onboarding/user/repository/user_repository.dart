import '../models/user_onboarding_data.dart';
import '../models/app_state.dart';

class UserRepository {
  Future<void> saveGpsPreference(bool enabled) async {
    throw UnimplementedError('saveGpsPreference not implemented yet');
  }

  Future<void> saveNotificationPreference(bool enabled) async {
    throw UnimplementedError('saveNotificationPreference not implemented yet');
  }

  Future<void> saveThemePreference(String theme) async {
    throw UnimplementedError('saveThemePreference not implemented yet');
  }

  Future<void> saveTransportPreferences(List<String> transports) async {
    throw UnimplementedError('saveTransportPreferences not implemented yet');
  }

  Future<void> saveLanguagePreference(String language) async {
    throw UnimplementedError('saveLanguagePreference not implemented yet');
  }

  Future<void> completeOnboarding(AppState appState) async {
    throw UnimplementedError('completeOnboarding not implemented yet');
  }

  Future<UserOnboardingData?> getUserOnboardingData(String userId) async {
    throw UnimplementedError('getUserOnboardingData not implemented yet');
  }

  Future<void> updateUserOnboardingData({
    required String userId,
    required UserOnboardingData data,
  }) async {
    throw UnimplementedError('updateUserOnboardingData not implemented yet');
  }

  Future<AppState> getUserPreferences(String userId) async {
    throw UnimplementedError('getUserPreferences not implemented yet');
  }

  Future<void> updateUserPreferences({
    required String userId,
    required AppState preferences,
  }) async {
    throw UnimplementedError('updateUserPreferences not implemented yet');
  }

  Future<List<Map<String, dynamic>>> getUserTripHistory(String userId) async {
    throw UnimplementedError('getUserTripHistory not implemented yet');
  }

  Future<Map<String, dynamic>> getUserDrivingStats(String userId) async {
    throw UnimplementedError('getUserDrivingStats not implemented yet');
  }

  Future<void> updateOnboardingStatus({
    required String userId,
    required String status,
    required int currentStep,
  }) async {
    throw UnimplementedError('updateOnboardingStatus not implemented yet');
  }

  Future<void> saveOnboardingAnswers({
    required String userId,
    required Map<String, dynamic> answers,
  }) async {
    throw UnimplementedError('saveOnboardingAnswers not implemented yet');
  }
}
