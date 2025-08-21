import 'package:safe_driving/features/authentication/services/auth_step_content_service.dart';
import 'package:safe_driving/features/authentication/models/auth_step_content_model.dart';

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

    return AuthStepContentService.stepContents[stepKey]!;
  }
}
