import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../widgets/auth/auth_widget.dart';
import '../../../viewmodels/signin_view_model.dart';

class SigninView extends StatelessWidget {
  final VoidCallback? onNavigateToRegister;
  final VoidCallback? onNavigateToForgotPassword;
  final VoidCallback? onGoogleSignIn;
  final VoidCallback? onFacebookSignIn;

  const SigninView({
    super.key,
    this.onNavigateToRegister,
    this.onNavigateToForgotPassword,
    this.onGoogleSignIn,
    this.onFacebookSignIn,
  });

  @override
  Widget build(BuildContext context) {
    return ChangeNotifierProvider(
      create: (_) => SigninViewModel(),
      child: Consumer<SigninViewModel>(
        builder: (context, viewModel, child) {
          viewModel.setContext(context);
          return AuthWidget(
            isLogin: true,
            isForgotPassword: false,
            onForgotPassword: onNavigateToForgotPassword,
            onSignIn: viewModel.handleSignIn,
            onGoogleSignIn: () => viewModel.handleGoogleSignIn(onGoogleSignIn),
            onFacebookSignIn: () => viewModel.handleFacebookSignIn(onFacebookSignIn),
            onNavigateToRegister: onNavigateToRegister,
          );
        },
      ),
    );
  }
}
