import 'dart:ui';

import 'package:flutter/material.dart';
import 'package:flutter_svg/svg.dart' ;
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

  Widget _buildHeaderText() {
    String title;
    String subtitle;
    String subSubtitle = '';

    if (widget.isForgotPassword) {
      title = "🔒 Mot de passe oublié ?";
      subtitle = "Pas de panique, ça arrive à tout le monde. Entrez votre adresse e-mail dans le formulaire et nous vous enverrons un lien pour réinitialiser votre mot de passe en toute sécurité.";
    } else {
      title = "👋 Bienvenue sur Safe Driving";
      subtitle = "Voyagez l’esprit léger.";
      subSubtitle = "Connectez-vous pour réserver votre transport en un clin d’œil et suivre votre course en temps réel.";
    }

    return Column(
      crossAxisAlignment: CrossAxisAlignment.center,
      mainAxisAlignment: MainAxisAlignment.start,
      children: [
        Text(
          title,
          textAlign: TextAlign.center,
          style: TextStyle(
            fontFamily: 'Inder',
            fontSize: 20,
            color: AppColors.titleColor,
          ),
        ),
        SizedBox(height: 8),
        Text(
          subtitle,
           textAlign: TextAlign.center,
          style: TextStyle(
            fontFamily: 'Inder',
            fontSize: 12,
            color: AppColors.titleColor.withAlpha(220)
          ),
        ),
        if (!widget.isForgotPassword)...[SizedBox(height: 8),
        Text(
          subSubtitle,
          textAlign: TextAlign.center,
          style:  TextStyle(
            fontFamily: 'Inder',
            fontSize: 12,
            fontWeight: FontWeight.w200,
            color: AppColors.titleColor.withAlpha(220),
          ),
        )]
      ],
    );
  }

  Widget _buildAuthContainer() {
    return Container(
      decoration:  BoxDecoration(
      borderRadius: BorderRadius.circular(20),
      color: AppColors.secondBackgroundColor, 
      boxShadow: [
        BoxShadow(
          color: Colors.black.withAlpha(50), 
          blurRadius: 8, 
          spreadRadius: 8, 
          offset: Offset(0, -2), 
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
          child:  Padding(
          padding: const EdgeInsets.all(30.0),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.start,
            children: [
              Transform.scale(
                scale: 1,
                child: SvgPicture.asset('assets/logo/logo.svg', height: 100,width: 500)),
              const SizedBox(height: 15),
              _buildInputFields(),
              const SizedBox(height: 16),
              SizedBox(
                width: double.infinity,
                height: 50,
                child:  _buildActionButton(),
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
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                  children: [
                    Container(
                     padding: EdgeInsets.symmetric(horizontal:5),
                      decoration: BoxDecoration(
                        borderRadius: BorderRadius.circular(5),
                        border: Border.all(color: AppColors.buttonWithoutBackGround)
                      ),
                      child: GestureDetector(
                        onTap: widget.onGoogleSignIn,
                        child: Image.asset('assets/img/social/google.png', height: 40),
                      ),
                    ),
                    Container(
                      padding: EdgeInsets.symmetric(horizontal: 5),
                      decoration: BoxDecoration(
                        borderRadius: BorderRadius.circular(5),
                        border: Border.all(color: AppColors.buttonWithoutBackGround)
                      ),
                      child: GestureDetector(
                        onTap: widget.onFacebookSignIn,
                        child: Image.asset('assets/img/social/facebook.png', height: 40),
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 20),
                _buildNavigationLink(),
              ],
              if (widget.isForgotPassword) ...[
                const SizedBox(height: 10),
                GestureDetector(
                    onTap: widget.onSignIn,
                    child: Row(
                        children: [
                          Icon(Icons.arrow_back, color: AppColors.buttonWithoutBackGround),
                          GestureDetector(
                            onTap: widget.onSignIn,
                            child: Text("Back to login",style: TextStyle(color: AppColors.buttonWithoutBackGround),),
                          )
                        ],
                      ),
                    
                  ),
               
              ],
            ],
          ),
        ),
      ),
      )
      ),
      );
    
  }

  Widget _buildInputFields() {
    return Column(
      children: [
        if (!widget.isForgotPassword) ...[
          _buildInputField(
            hint: widget.isLogin ? "Email or Username" : "First Name",
            icon: Icons.person,
          ),
          if (!widget.isLogin)
            _buildInputField(
              hint: "Last Name",
              icon: Icons.person,
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
          SizedBox(height: 5),
          GestureDetector(
            onTap: widget.onForgotPassword,
            child: Align(
              alignment: Alignment.centerRight,
              child: Text(
                "Forgot Password?",
                style: TextStyle(
                  fontFamily: 'Inder',
                  color: AppColors.buttonWithoutBackGround
                  ,
                ),
              ),
            ),
          ),
        ],
        if (widget.isForgotPassword)
          _buildInputField(
            hint: "Email",
            icon: Icons.email,
          ),
      ],
    );
  }

  Widget _buildInputField({
    required String hint,
    required IconData icon,
    bool obscureText = false,
    bool isPassword = false,
    bool isConfirmPassword = false,
  }) {
    bool isVisible = isPassword ? _isPasswordVisible : isConfirmPassword ? _isConfirmPasswordVisible : false;
    
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 8.0),
      child: TextField(
        style: TextStyle(fontSize: 10),
        decoration: InputDecoration(
          filled: true,
          fillColor: AppColors.inputTextBackground,
          hintText: hint,
          hintStyle: TextStyle(
            color: AppColors.placeHolderInput,
          ),
          prefixIcon: Icon(icon, color: AppColors.icon),
          border: OutlineInputBorder(
            borderSide: BorderSide(color: AppColors.borderInputField,width: 2)
          ),
          enabledBorder: OutlineInputBorder(
            borderSide: BorderSide( color: AppColors.borderInputField,width: 1),
            borderRadius: BorderRadius.circular(5),
          ),
          errorBorder: OutlineInputBorder(
            borderSide: BorderSide( color: AppColors.error,width: 1),
            borderRadius: BorderRadius.circular(5),
          ),
          suffixIcon: obscureText
              ? IconButton(
                  icon: Icon(isVisible ? Icons.visibility_off : Icons.visibility),
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

  Widget _buildActionButton() {
    String buttonText = widget.isLogin
        ? "Sign In"
        : widget.isForgotPassword
            ? "Reset Password"
            : "Sign Up";

    VoidCallback? onPressed = widget.isLogin
        ? widget.onSignIn
        : widget.isForgotPassword
            ? widget.onResetPassword
            : widget.onSignUp;

    return ElevatedButton(
      onPressed: onPressed,
      style: ElevatedButton.styleFrom(
        backgroundColor: AppColors.fillButtonBackgorund,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(5),
        ),
      ),
      child: Text(
        buttonText,
        style: const TextStyle(
          fontFamily: 'Inder',
          color: AppColors.titleColor,
          fontSize: 13,
        ),
      ),
    );
  }

  Widget _buildNavigationLink() {
    if (widget.isLogin) {
      return Row(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Text(
            "Pas encore de compte ? ",
            style: TextStyle(
              fontFamily: 'Inder',
              color: AppColors.textColor,
              fontSize: 12,
            ),
          ),
          GestureDetector(
            onTap: widget.onNavigateToRegister,
            child: Text(
              "S'inscrire",
              style: TextStyle(
                fontFamily: 'Inder',
                color: AppColors.buttonWithoutBackGround,
                fontSize: 12,
                decoration: TextDecoration.underline,
              ),
            ),
          ),
        ],
      );
    } else {
      return Row(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Text(
            "Vous avez déjà un compte ? ",
            style: TextStyle(
              fontFamily: 'Inder',
              color: AppColors.textColor,
              fontSize: 12,
            ),
          ),
          GestureDetector(
            onTap: widget.onNavigateToLogin,
            child: Text(
              "Se connecter",
              style: TextStyle(
                fontFamily: 'Inder',
                color: AppColors.buttonWithoutBackGround,
                fontSize: 12,
                decoration: TextDecoration.underline,
              ),
            ),
          ),
        ],
      );
    }
  }
}
