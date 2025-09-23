import 'package:flutter/material.dart';
import 'package:safe_driving/l10n/l10n.dart';
import '../../../../../core/utils/form/form_utils.dart';
import '../../../../../shared/widgets/customs/snackbar/snackbar_helper.dart';
import '../../widgets/auth/auth_widget.dart';
import '../../../../../shared/state_management/providers.dart';

class ForgotPasswordView extends StatefulWidget {
  final VoidCallback? onNavigateToLogin;
  final Function(String email)? onSendCodeSuccess;

  const ForgotPasswordView({
    super.key,
    this.onNavigateToLogin,
    this.onSendCodeSuccess,
  });

  @override
  State<ForgotPasswordView> createState() => _ForgotPasswordViewState();
}

class _ForgotPasswordViewState extends State<ForgotPasswordView> {
  final TextEditingController _emailController = TextEditingController();

  @override
  void dispose() {
    _emailController.dispose();
    super.dispose();
  }

  Future<void> _handleSendCode(String email, String password) async {
    final emailToUse = email.trim();

    if (emailToUse.isEmpty) {
      SnackbarHelper.showError(context, context.l10n.pleaseEnterEmail);
      return;
    }

    if (!RegexFormatter.isValidEmail(emailToUse)) {
      SnackbarHelper.showError(context, context.l10n.pleaseEnterValidEmail);
      return;
    }

    if (!mounted) return;

    final ok = await context.authVM.resetPassword(emailToUse);

    if (!mounted) return;

    if (ok) {
      SnackbarHelper.showSuccess(context, context.l10n.resetPassword);
      if (widget.onSendCodeSuccess != null) {
        widget.onSendCodeSuccess!(emailToUse);
      }
    } else {
      SnackbarHelper.showError(context, context.l10n.networkError);
    }
  }

  @override
  Widget build(BuildContext context) {
    return AuthWidget(
      isLogin: false,
      isForgotPassword: true,
      onSignIn: _handleSendCode,
      onNavigateToLogin: widget.onNavigateToLogin,
    );
  }
}
