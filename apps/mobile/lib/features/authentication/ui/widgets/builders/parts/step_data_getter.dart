import 'package:flutter/material.dart';
import 'package:safe_driving/features/authentication/models/auth_step_content_model.dart';
import 'package:safe_driving/l10n/l10n.dart';

class StepDataGetter {
  static AuthStepContent getStepData({
    required BuildContext context,
    required bool isLogin,
    required bool isForgotPassword,
    bool isResetPassword = false,
  }) {
    final l10n = context.l10n;

    if (isResetPassword) {
      return AuthStepContent(
        title: l10n.resetPassword,
        subtitle: '',
        subSubtitle: '',
        actionButtonText: l10n.resetPassword,
        socialText: '',
        navigationPrefix: '',
        navigationLink: '',
        backToLoginText: l10n.backToLogin,
        forgotPasswordText: '',
        additionalContent: const {},
      );
    }

    if (isForgotPassword) {
      return AuthStepContent(
        title: l10n.authForgotPasswordTitle,
        subtitle: l10n.authForgotPasswordSubtitle,
        subSubtitle: '',
        actionButtonText: l10n.resetPassword,
        socialText: '',
        navigationPrefix: '',
        navigationLink: '',
        backToLoginText: l10n.backToLogin,
        forgotPasswordText: '',
        additionalContent: const {},
      );
    }

    if (isLogin) {
      return AuthStepContent(
        title: l10n.authLoginTitle,
        subtitle: l10n.authLoginSubtitle,
        subSubtitle: l10n.authLoginSubSubtitle,
        actionButtonText: l10n.signIn,
        socialText: l10n.orContinueWith,
        navigationPrefix: l10n.noAccountYet,
        navigationLink: l10n.registerAction,
        backToLoginText: '',
        forgotPasswordText: l10n.forgotPassword,
        additionalContent: const {},
      );
    }

    return AuthStepContent(
      title: l10n.authRegisterTitle,
      subtitle: l10n.authRegisterSubtitle,
      subSubtitle: l10n.authRegisterSubSubtitle,
      actionButtonText: l10n.signUp,
      socialText: l10n.orSignUpWith,
      navigationPrefix: l10n.alreadyHaveAccount,
      navigationLink: l10n.loginAction,
      backToLoginText: '',
      forgotPasswordText: '',
      additionalContent: const {},
    );
  }
}
