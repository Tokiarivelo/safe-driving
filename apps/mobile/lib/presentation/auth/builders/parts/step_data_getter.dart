import '../../models/auth_models.dart';

class StepDataGetter {
  static AuthStepContent getStepData({
    required bool isLogin,
    required bool isForgotPassword,
    bool isResetPassword = false,
  }) {
    final String stepKey = isResetPassword
        ? 'resetPassword'
        : isForgotPassword
        ? 'forgotPassword'
        : isLogin
        ? 'login'
        : 'register';

    return AuthStepContentMap.stepContents[stepKey]!;
  }
}
