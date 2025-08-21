import 'package:flutter/material.dart';
import '../../../../core/constants/utils/form/form_utils.dart';
import '../../../../shared/widgets/customs/snackbar/snackbar_helper.dart';
import '../../widgets/auth/auth_widget.dart';

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
      SnackbarHelper.showError(context, "Veuillez saisir votre adresse email");
      return;
    }

    if (!RegexFormatter.isValidEmail(emailToUse)) {
      SnackbarHelper.showError(
        context,
        "Veuillez saisir une adresse email valide",
      );
      return;
    }

    if (!mounted) return;

    SnackbarHelper.showSuccess(
      context,
      'Un code de réinitialisation a été envoyé à votre adresse email',
    );

    if (widget.onSendCodeSuccess != null) {
      widget.onSendCodeSuccess!(emailToUse);
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
