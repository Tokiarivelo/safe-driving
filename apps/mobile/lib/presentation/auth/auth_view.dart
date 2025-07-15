import 'package:flutter/material.dart';
import 'package:safe_driving/shared/widgets/auth/auth_widget.dart';

class AuthView extends StatefulWidget {
  const AuthView({super.key});

  @override
  AuthViewState createState() => AuthViewState();
}

class AuthViewState extends State<AuthView> {
  final PageController _pageController = PageController();
  int _currentIndex = 0;

  @override
  void dispose() {
    _pageController.dispose();
    super.dispose();
  }
//NB: c'est pour les tests
  void _navigateToPage(int index) {
    setState(() {
      _currentIndex = index;
    });
    _pageController.animateToPage(
      index,
      duration: Duration(milliseconds: 300),
      curve: Curves.easeInOut,
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: PageView(
        controller: _pageController,
        onPageChanged: (index) {
          setState(() {
            _currentIndex = index;
          });
        },
        children: [
          // Login Page
          AuthWidget(
            isLogin: true,
            isForgotPassword: false,
            onForgotPassword: navigateToForgotPassword,
            onSignIn: _handleSignIn,
            onGoogleSignIn: _handleGoogleSignIn,
            onFacebookSignIn: _handleFacebookSignIn,
            onNavigateToRegister: navigateToRegister,
          ),
          // Register Page
          AuthWidget(
            isLogin: false,
            isForgotPassword: false,
            onForgotPassword: navigateToForgotPassword,
            onSignUp: _handleSignUp,
            onGoogleSignIn: _handleGoogleSignIn,
            onFacebookSignIn: _handleFacebookSignIn,
            onNavigateToLogin: navigateToLogin,
          ),
          // Forgot Password Page
          AuthWidget(
            isLogin: false,
            isForgotPassword: true,
            onResetPassword: _handleResetPassword,
            onSignIn: navigateToLogin,
            onSignUp: navigateToRegister,
          ),
        ],
      ),
    );
  }

  // Méthodes pour la navigation programmatique (slide)
  void navigateToLogin() {
    _navigateToPage(0);
  }

  void navigateToRegister() {
    _navigateToPage(1);
  }

  void navigateToForgotPassword() {
    _navigateToPage(2);
  }

  // Méthodes de gestion des actions d'authentification (A voir après...)
  void _handleSignIn() {

    print('Sign In clicked');

  }

  void _handleSignUp() {
    print('Sign Up clicked');
  }

  void _handleResetPassword() {
    print('Reset Password clicked');
    // Exemple : Afficher un message de confirmation
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text('Un lien de réinitialisation a été envoyé à votre email'),
        backgroundColor: Colors.green,
      ),
    );
  }

  void _handleGoogleSignIn() {
    print('Google Sign In clicked');
  }

  void _handleFacebookSignIn() {
    print('Facebook Sign In clicked');
  }
}
