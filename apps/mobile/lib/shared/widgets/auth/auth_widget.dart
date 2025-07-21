import 'dart:ui';

import 'package:flutter/material.dart';
import 'package:flutter_svg/svg.dart';
import 'package:safe_driving/core/constants/colors.dart';
import 'package:safe_driving/shared/widgets/colors/colors_widget.dart';

class AuthWidget extends StatefulWidget {
  final bool isLogin;
  final bool isForgotPassword;
  final VoidCallback? onForgotPassword;
  final VoidCallback? onSignIn;
  final VoidCallback? onSignUp;
  final VoidCallback? onResetPassword;
  final VoidCallback? onGoogleSignIn;
  final VoidCallback? onFacebookSignIn;
  final VoidCallback? onNavigateToLogin;
  final VoidCallback? onNavigateToRegister;

  const AuthWidget({
    super.key,
    this.isLogin = false,
    this.isForgotPassword = false,
    this.onForgotPassword,
    this.onSignIn,
    this.onSignUp,
    this.onResetPassword,
    this.onGoogleSignIn,
    this.onFacebookSignIn,
    this.onNavigateToLogin,
    this.onNavigateToRegister,
  });

  @override
  AuthWidgetState createState() => AuthWidgetState();
}

class AuthWidgetState extends State<AuthWidget> {
  bool _isPasswordVisible = false;
  bool _isConfirmPasswordVisible = false;

  @override
  Widget build(BuildContext context) {
    //30% pour le titre, 70% pour le container
    return Container(
      decoration: ColorsWidget.background,
      child: Column(
        children: [
          Expanded(
            flex: 2,
            child: Padding(
              padding: const EdgeInsets.all(20.0),
              child: _buildHeaderText(),
            ),
          ),
          Expanded(
            flex: 8,
            child: _buildAuthContainer(),
          ),
        ],
      ),
    );
  }
//les titres
 Widget _buildHeaderText() {
  final Map<String, Map<String, String>> headerTexts = {
    'forgotPassword': {
      'title': "🔒 Mot de passe oublié ?",
      'subtitle': "Pas de panique, ça arrive à tout le monde. Entrez votre adresse e-mail dans le formulaire et nous vous enverrons un lien pour réinitialiser votre mot de passe en toute sécurité.",
      'subSubtitle': "",
    },
    'register': {
      'title': "🚀 Prêt à rejoindre Safe Driving ?",
      'subtitle': "Explorez la ville comme jamais auparavant.",
      'subSubtitle': "Créez votre compte et laissez notre assistant intelligent vous guider pour une expérience fluide, rapide et sécurisée.",
    },
    'login': {
      'title': "👋 Bienvenue sur Safe Driving",
      'subtitle': "Voyagez l'esprit léger.",
      'subSubtitle': "Connectez-vous pour réserver votre transport en un clin d'œil et suivre votre course en temps réel.",
    },
  };

  final currentTexts = widget.isForgotPassword 
      ? headerTexts['forgotPassword']! 
      : widget.isLogin 
          ? headerTexts['login']! 
          : headerTexts['register']!;

  return Column(
    crossAxisAlignment: CrossAxisAlignment.center,
    mainAxisAlignment: MainAxisAlignment.start,
    children: [
      Text(
        currentTexts['title']!,
        textAlign: TextAlign.center,
        style: TextStyle(
          fontFamily: 'Inder',
          fontSize: 20,
          color: AppColors.titleColor,
        ),
      ),
      const SizedBox(height: 8),
      Text(
        currentTexts['subtitle']!,
        textAlign: TextAlign.center,
        style: TextStyle(
          fontFamily: 'Inder',
          fontSize: 12,
          color: AppColors.titleColor.withAlpha(220),
        ),
      ),
      if (!widget.isForgotPassword) ...[
        const SizedBox(height: 8),
        Text(
          currentTexts['subSubtitle']!,
          textAlign: TextAlign.center,
          style: TextStyle(
            fontFamily: 'Inder',
            fontSize: 12,
            fontWeight: FontWeight.w200,
            color: AppColors.titleColor.withAlpha(220),
          ),
        ),
      ],
    ],
  );
}
//Le container de auth
  Widget _buildAuthContainer() {
    return Container(
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(20),
        color: AppColors.secondBackgroundColor, 
        boxShadow: [
          BoxShadow(
            color: AppColors.blur, 
            blurRadius:6, 
            spreadRadius: 6, 
            offset: const Offset(0, -2), 
          ),
        ],
      ),
      child: ClipRRect(
        borderRadius: BorderRadius.circular(20),
        child: BackdropFilter(
          filter: ImageFilter.blur(
            sigmaX: 10,
            sigmaY: 10,
          ),
          child: Container(
            decoration: BoxDecoration(
              color: AppColors.secondBackgroundColor.withAlpha(100),
              borderRadius: BorderRadius.circular(20),
            ),
            child: Padding(
              padding: const EdgeInsets.all(30.0),
              child: Column(
                mainAxisAlignment: MainAxisAlignment.start,
                children: [
                  Transform.scale(
                    scale: 1,
                    child: SvgPicture.asset(
                      'assets/logo/logo.svg', 
                      height: 100,
                      width: 500,
                    ),
                  ),
                  const SizedBox(height: 15),
                  _buildInputFields(),
                  const SizedBox(height: 16),
                  SizedBox(
                    width: double.infinity,
                    height: 50,
                    child: _buildActionButton(),
                  ),
                  const SizedBox(height: 16),
                  if (!widget.isForgotPassword) ...[
                    Text(
                      widget.isLogin 
                          ? "- or continue with -" 
                          : "- or sign up with -",
                      style: const TextStyle(
                        fontFamily: 'Inder',
                        color: AppColors.textColor,
                      ),
                    ),
                    const SizedBox(height: 15),
                    _buildSocialButtons(),
                    const SizedBox(height: 20),
                    _buildNavigationLink(),
                  ],
                  if (widget.isForgotPassword) ...[
                    const SizedBox(height: 10),
                    _buildBackToLoginButton(),
                  ],
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }
//bouton social
  Widget _buildSocialButton({
    required VoidCallback? onTap,
    required String imagePath,
  }) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 5),
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(5),
        border: Border.all(color: AppColors.buttonWithoutBackGround),
      ),
      child: GestureDetector(
        onTap: onTap,
        child: Image.asset(imagePath, height: 40),
      ),
    );
  }
//les boutons socials
  Widget _buildSocialButtons() {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceEvenly,
      children: [
        _buildSocialButton(
          onTap: widget.onGoogleSignIn,
          imagePath: 'assets/img/social/google.png',
        ),
        _buildSocialButton(
          onTap: widget.onFacebookSignIn,
          imagePath: 'assets/img/social/facebook.png',
        ),
      ],
    );
  }

//bouron retour vers login
  Widget _buildBackToLoginButton() {
    return GestureDetector(
      onTap: widget.onSignIn,
      child: Row(
        children: [
          Icon(Icons.arrow_back, color: AppColors.buttonWithoutBackGround),
          GestureDetector(
            onTap: widget.onSignIn,
            child: Text(
              "Back to login",
              style: TextStyle(color: AppColors.buttonWithoutBackGround),
            ),
          )
        ],
      ),
    );
  }
  // champ input
  Widget _buildInputField({
    required String hint,
    required IconData icon,
    bool obscureText = false,
    bool isPassword = false,
    bool isConfirmPassword = false,
  }) {
    bool isVisible = isPassword 
        ? _isPasswordVisible 
        : isConfirmPassword 
            ? _isConfirmPasswordVisible 
            : false;
    
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 8.0),
      child: TextField(
        style: const TextStyle(fontSize: 10),
        decoration: InputDecoration(
          filled: true,
          fillColor: AppColors.inputTextBackground,
          hintText: hint,
          hintStyle: TextStyle(
            color: AppColors.placeHolderInput,
          ),
          prefixIcon: Icon(icon, color: AppColors.icon),
          border: OutlineInputBorder(
            borderSide: BorderSide(
              color: AppColors.borderInputField,
              width: 2,
            ),
          ),
          enabledBorder: OutlineInputBorder(
            borderSide: BorderSide(
              color: AppColors.borderInputField,
              width: 1,
            ),
            borderRadius: BorderRadius.circular(5),
          ),
          errorBorder: OutlineInputBorder(
            borderSide: BorderSide(
              color: AppColors.error,
              width: 1,
            ),
            borderRadius: BorderRadius.circular(5),
          ),
          suffixIcon: obscureText
              ? IconButton(
                  icon: Icon(isVisible 
                      ? Icons.visibility_off 
                      : Icons.visibility),
                  color: AppColors.icon,
                  onPressed: () {
                    setState(() {
                      if (isPassword) {
                        _isPasswordVisible = !_isPasswordVisible;
                      } else if (isConfirmPassword) {
                        _isConfirmPasswordVisible = !_isConfirmPasswordVisible;
                      }
                    });
                  },
                )
              : null,
        ),
        obscureText: obscureText && !isVisible,
      ),
    );
  }
//les champs input
  Widget _buildInputFields() {
    return Column(
      children: [
        if (!widget.isForgotPassword) ...[
          _buildInputField(
            hint: widget.isLogin ? "Email or Username" : "First Name",
            icon: widget.isLogin ? Icons.person : Icons.person_outline,
          ),
          if (!widget.isLogin)
            _buildInputField(
              hint: "Last Name",
              icon: Icons.person_outline,
            ),
          if (!widget.isLogin)
            _buildInputField(
              hint: "Email",
              icon: Icons.email,
            ),
          _buildInputField(
            hint: "Password",
            icon: Icons.lock,
            obscureText: true,
            isPassword: true,
          ),
          if (!widget.isLogin)
            _buildInputField(
              hint: "Confirm Password",
              icon: Icons.lock,
              obscureText: true,
              isConfirmPassword: true,
            ),
          const SizedBox(height: 5),
          if (widget.isLogin)
            _buildForgotPasswordLink(),
        ],
        if (widget.isForgotPassword)
          _buildInputField(
            hint: "Email",
            icon: Icons.email,
          ),
      ],
    );
  }
//le lien "mot de passe oublié"
  Widget _buildForgotPasswordLink() {
    return GestureDetector(
      onTap: widget.onForgotPassword,
      child: Align(
        alignment: Alignment.centerRight,
        child: Container(
          decoration: BoxDecoration(
            border: Border(
              bottom: BorderSide(
                color: AppColors.buttonWithoutBackGround,
              ),
            ),
          ),
          child: Text(
            "Forgot Password?",
            style: TextStyle(
              fontFamily: 'Inder',
              color: AppColors.buttonWithoutBackGround,
              fontWeight: FontWeight.bold,
              fontSize: 10
            ),
          ),
        ),
      ),
    );
  }
//configuration des boutons d'actions
  Widget _buildActionButton() {
    final Map<bool, Map<String, dynamic>> buttonConfigs = {
      true: {'text': "Sign In", 'action': widget.onSignIn},
      false: {
        'text': widget.isForgotPassword ? "Reset Password" : "Sign Up",
        'action': widget.isForgotPassword ? widget.onResetPassword : widget.onSignUp,
      },
    };

    final config = buttonConfigs[widget.isLogin] ?? 
        buttonConfigs[false]!;

    return ElevatedButton(
      onPressed: config['action'],
      style: ElevatedButton.styleFrom(
        backgroundColor: AppColors.fillButtonBackgorund,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(5),
        ),
      ),
      child: Text(
        config['text'],
        style: const TextStyle(
          fontFamily: 'Inder',
          color: AppColors.titleColor,
          fontSize: 13,
        ),
      ),
    );
  }
//lien de navigation
  Widget _buildNavigationLink() {
    final isLogin = widget.isLogin;
    final prefixText = isLogin 
        ? "Pas encore de compte ? " 
        : "Vous avez déjà un compte ? ";
    final linkText = isLogin ? "S'inscrire" : "Se connecter";
    final onTap = isLogin 
        ? widget.onNavigateToRegister 
        : widget.onNavigateToLogin;

    return Row(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        Text(
          prefixText,
          style: const TextStyle(
            fontFamily: 'Inder',
            color: AppColors.textColor,
            fontSize: 12,
          ),
        ),
        GestureDetector(
          onTap: onTap,
          child: Container(
            margin: const EdgeInsets.only(top: 1),
            decoration: BoxDecoration(
              border: Border(
                bottom: BorderSide(
                  color: AppColors.buttonWithoutBackGround,
                  width: 1.5,
                ),
              ),
            ),
            child: Text(
              linkText,
              style: TextStyle(
                fontFamily: 'Inder',
                color: AppColors.buttonWithoutBackGround,
                fontSize: isLogin ? 9 : 8,
                fontWeight: FontWeight.bold,
              ),
            ),
          ),
        ),
      ],
    );
  }
}