import '../models/user_onboarding_data.dart';

abstract class IUserDataSource {
  Future<Map<String, dynamic>> savePreferences({
    required String userId,
    required Map<String, dynamic> preferences,
  });

  Future<Map<String, dynamic>> getOnboardingData(String userId);

  Future<Map<String, dynamic>> updateOnboardingData({
    required String userId,
    required UserOnboardingData data,
  });

  Future<Map<String, dynamic>> completeOnboarding(String userId);
}
