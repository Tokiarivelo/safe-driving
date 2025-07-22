import 'dart:ui';

import 'package:flutter/material.dart';
import 'package:flutter_svg/svg.dart';
import 'package:safe_driving/core/constants/colors.dart';
import 'package:safe_driving/core/validations/validator.dart';
import 'package:safe_driving/shared/widgets/colors/colors_widget.dart';
import 'package:safe_driving/shared/widgets/snackbar/snackbar_helper.dart';

class AuthWidget extends StatefulWidget {
  final bool isLogin;
  final bool isForgotPassword;
  final VoidCallback? onForgotPassword;
  final Function(String email, String password)? onSignIn;
  final Function(
    String firstName,
    String lastName,
    String email,
    String password,
  )?
  onSignUp;
  final Function(String email)? onResetPassword;
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

  final TextEditingController _emailController = TextEditingController();
  final TextEditingController _passwordController = TextEditingController();
  final TextEditingController _firstNameController = TextEditingController();
  final TextEditingController _lastNameController = TextEditingController();
  final TextEditingController _confirmPasswordController =
      TextEditingController();

  // Messages d'erreur pour validation en temps réel
  String _emailError = "";
  String _passwordError = "";
  String _firstNameError = "";
  String _lastNameError = "";
  String _confirmPasswordError = "";

  @override
  void dispose() {
    // N'oubliez pas de disposer les contrôleurs
    _firstNameController.dispose();
    _lastNameController.dispose();
    _emailController.dispose();
    _passwordController.dispose();
    _confirmPasswordController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    // Ajustement dynamique en fonction du type d'écran
    final bool isRegister = !widget.isLogin && !widget.isForgotPassword;
    final screenHeight = MediaQuery.of(context).size.height;
    final bool isSmallScreen = screenHeight < 700;

    return Container(
      decoration: ColorsWidget.background,
      child: SafeArea(
        child: isRegister
            ? SingleChildScrollView(
                child: Column(
                  children: [
                    // Header ajusté selon le type d'écran avec plus d'espace en bas
                    Container(
                      height: isSmallScreen ? 100 : 140,
                      padding: const EdgeInsets.symmetric(
                        horizontal: 20.0,
                        vertical: 10.0,
                      ),
                      child: Center(child: _buildHeaderText()),
                    ),
                    // Container auth avec padding pour éviter l'écrasement
                    Padding(
                      padding: const EdgeInsets.fromLTRB(10.0, 0, 10.0, 20.0),
                      child: _buildAuthContainer(),
                    ),
                  ],
                ),
              )
            : Column(
                children: [
                  // Header ajusté selon le type d'écran
                  Container(
                    height: isSmallScreen ? 100 : 130,
                    padding: const EdgeInsets.symmetric(
                      horizontal: 20.0,
                      vertical: 10.0,
                    ),
                    child: Center(child: _buildHeaderText()),
                  ),
                  // Container auth avec gestion d'espace flexible
                  Expanded(
                    child: SingleChildScrollView(
                      child: Padding(
                        padding: const EdgeInsets.symmetric(horizontal: 10.0),
                        child: _buildAuthContainer(),
                      ),
                    ),
                  ),
                ],
              ),
      ),
    );
  }

  //les titres
  Widget _buildHeaderText() {
    final Map<String, Map<String, String>> headerTexts = {
      'forgotPassword': {
        'title': "🔒 Mot de passe oublié ?",
        'subtitle':
            "Pas de panique, ça arrive à tout le monde. Entrez votre adresse e-mail dans le formulaire et nous vous enverrons un lien pour réinitialiser votre mot de passe en toute sécurité.",
        'subSubtitle': "",
      },
      'register': {
        'title': "🚀 Prêt à rejoindre Safe Driving ?",
        'subtitle': "Explorez la ville comme jamais auparavant.",
        'subSubtitle':
            "Créez votre compte et laissez notre assistant intelligent vous guider pour une expérience fluide, rapide et sécurisée.",
      },
      'login': {
        'title': "👋 Bienvenue sur Safe Driving",
        'subtitle': "Voyagez l'esprit léger.",
        'subSubtitle':
            "Connectez-vous pour réserver votre transport en un clin d'œil et suivre votre course en temps réel.",
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
    final screenHeight = MediaQuery.of(context).size.height;
    final bool isSmallScreen = screenHeight < 700;
    final bool isRegister = !widget.isLogin && !widget.isForgotPassword;

    // Calculer la hauteur disponible pour le container
    final headerHeight = isRegister
        ? (isSmallScreen ? 140 : 200)
        : (isSmallScreen ? 140 : 180);
    final availableHeight =
        screenHeight -
        headerHeight -
        MediaQuery.of(context).padding.top -
        MediaQuery.of(context).padding.bottom;

    return Container(
      margin: const EdgeInsets.symmetric(horizontal: 0),
      // Pour login et forgot password, prendre toute la hauteur disponible
      constraints: BoxConstraints(
        minHeight: isRegister ? 400 : availableHeight * 0.9,
        maxHeight: isRegister ? double.infinity : availableHeight * 0.95,
      ),
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(20),
        color: AppColors.secondBackgroundColor,
        boxShadow: [
          BoxShadow(
            color: AppColors.blur,
            blurRadius: 6,
            spreadRadius: 6,
            offset: isRegister ? const Offset(0, -4) : const Offset(0, -2),
          ),
        ],
      ),
      child: ClipRRect(
        borderRadius: BorderRadius.circular(20),
        child: BackdropFilter(
          filter: ImageFilter.blur(sigmaX: 10, sigmaY: 10),
          child: Container(
            decoration: BoxDecoration(
              color: AppColors.secondBackgroundColor.withAlpha(100),
              borderRadius: BorderRadius.circular(20),
            ),
            child: Padding(
              padding: EdgeInsets.all(isSmallScreen ? 20.0 : 30.0),
              child: Column(
                mainAxisAlignment: MainAxisAlignment.start,
                children: [
                  // Logo avec taille adaptée
                  Transform.scale(
                    scale: isSmallScreen ? 0.8 : 1,
                    child: SvgPicture.asset(
                      'assets/logo/logo.svg',
                      height: isSmallScreen ? 80 : 100,
                      width: 500,
                    ),
                  ),
                  SizedBox(height: isSmallScreen ? 10 : 15),
                  _buildInputFields(),
                  SizedBox(height: isSmallScreen ? 12 : 16),
                  SizedBox(
                    width: double.infinity,
                    height: 50,
                    child: _buildActionButton(),
                  ),
                  SizedBox(height: isSmallScreen ? 12 : 16),
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
                    SizedBox(height: isSmallScreen ? 10 : 15),
                    _buildSocialButtons(),
                    SizedBox(height: isSmallScreen ? 15 : 20),
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

  //bouton retour vers login
  Widget _buildBackToLoginButton() {
    return GestureDetector(
      onTap: () {
        widget.onNavigateToLogin?.call();
      },
      child: Row(
        children: [
          Icon(Icons.arrow_back, color: AppColors.buttonWithoutBackGround),
          GestureDetector(
            onTap: () {
              widget.onNavigateToLogin?.call();
            },
            child: Text(
              "Back to login",
              style: TextStyle(color: AppColors.buttonWithoutBackGround),
            ),
          ),
        ],
      ),
    );
  }

  // champ input avec validation en temps réel
  Widget _buildInputFieldWithValidation({
    required String hint,
    required IconData icon,
    bool obscureText = false,
    bool isPassword = false,
    bool isConfirmPassword = false,
    TextEditingController? controller,
    String? errorMessage,
    Function(String)? onChanged,
  }) {
    bool isVisible = isPassword
        ? _isPasswordVisible
        : isConfirmPassword
        ? _isConfirmPasswordVisible
        : false;

    final screenHeight = MediaQuery.of(context).size.height;
    final bool isSmallScreen = screenHeight < 700;
    final bool hasError = errorMessage != null && errorMessage.isNotEmpty;

    return Padding(
      padding: EdgeInsets.symmetric(vertical: isSmallScreen ? 4.0 : 8.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          TextField(
            style: const TextStyle(fontSize: 10),
            decoration: InputDecoration(
              filled: true,
              fillColor: AppColors.inputTextBackground,
              hintText: hint,
              hintStyle: TextStyle(color: AppColors.placeHolderInput),
              prefixIcon: Icon(icon, color: AppColors.icon),
              contentPadding: EdgeInsets.symmetric(
                horizontal: 16,
                vertical: isSmallScreen ? 12 : 16,
              ),
              border: OutlineInputBorder(
                borderSide: BorderSide(
                  color: hasError
                      ? AppColors.error
                      : AppColors.borderInputField,
                  width: hasError ? 2 : 1,
                ),
                borderRadius: BorderRadius.circular(5),
              ),
              enabledBorder: OutlineInputBorder(
                borderSide: BorderSide(
                  color: hasError
                      ? AppColors.error
                      : AppColors.borderInputField,
                  width: hasError ? 2 : 1,
                ),
                borderRadius: BorderRadius.circular(5),
              ),
              focusedBorder: OutlineInputBorder(
                borderSide: BorderSide(
                  color: hasError
                      ? AppColors.error
                      : AppColors.borderInputField,
                  width: 2,
                ),
                borderRadius: BorderRadius.circular(5),
              ),
              suffixIcon: obscureText
                  ? IconButton(
                      icon: Icon(
                        isVisible ? Icons.visibility_off : Icons.visibility,
                      ),
                      color: AppColors.icon,
                      onPressed: () {
                        setState(() {
                          if (isPassword) {
                            _isPasswordVisible = !_isPasswordVisible;
                          } else if (isConfirmPassword) {
                            _isConfirmPasswordVisible =
                                !_isConfirmPasswordVisible;
                          }
                        });
                      },
                    )
                  : null,
            ),
            obscureText: obscureText && !isVisible,
            controller: controller,
            onChanged: onChanged,
          ),
          if (hasError)
            Padding(
              padding: const EdgeInsets.only(top: 4.0, left: 8.0),
              child: Text(
                errorMessage,
                style: TextStyle(
                  color: AppColors.error,
                  fontSize: 10,
                  fontFamily: 'Inder',
                ),
              ),
            ),
        ],
      ),
    );
  }

  // champ input (version ancienne, gardée pour compatibilité)

  //les champs input avec validation en temps réel
  Widget _buildInputFields() {
    return Column(
      children: [
        if (!widget.isForgotPassword) ...[
          _buildInputFieldWithValidation(
            hint: widget.isLogin ? "Email or Username" : "First Name",
            icon: widget.isLogin ? Icons.person_outline : Icons.badge_outlined,
            controller: widget.isLogin
                ? _emailController
                : _firstNameController,
            errorMessage: widget.isLogin ? null : _firstNameError,
            onChanged: (value) {
              if (!widget.isLogin) {
                setState(() {
                  _firstNameError = RegexFormatter.getUsernameValidationMessage(
                    value,
                  );
                });
              }
            },
          ),
          if (!widget.isLogin)
            _buildInputFieldWithValidation(
              hint: "Last Name",
              icon: Icons.badge_outlined,
              controller: _lastNameController,
              errorMessage: _lastNameError,
              onChanged: (value) {
                setState(() {
                  _lastNameError = RegexFormatter.getUsernameValidationMessage(
                    value,
                  );
                });
              },
            ),
          if (!widget.isLogin)
            _buildInputFieldWithValidation(
              hint: "Email",
              icon: Icons.email_outlined,
              controller: _emailController,
              errorMessage: _emailError,
              onChanged: (value) {
                setState(() {
                  _emailError = RegexFormatter.getEmailValidationMessage(value);
                });
              },
            ),
          _buildInputFieldWithValidation(
            hint: "Password",
            icon: Icons.lock_outlined,
            obscureText: true,
            isPassword: true,
            controller: _passwordController,
            errorMessage: _passwordError,
            onChanged: (value) {
              setState(() {
                _passwordError = RegexFormatter.getPasswordValidationMessage(
                  value,
                );
                // Vérifier aussi la confirmation du mot de passe si elle existe
                if (!widget.isLogin &&
                    _confirmPasswordController.text.isNotEmpty) {
                  _confirmPasswordError =
                      value != _confirmPasswordController.text
                      ? "Les mots de passe ne correspondent pas"
                      : "";
                }
              });
            },
          ),
          if (!widget.isLogin)
            _buildInputFieldWithValidation(
              hint: "Confirm Password",
              icon: Icons.lock_outlined,
              obscureText: true,
              isConfirmPassword: true,
              controller: _confirmPasswordController,
              errorMessage: _confirmPasswordError,
              onChanged: (value) {
                setState(() {
                  _confirmPasswordError = value != _passwordController.text
                      ? "Les mots de passe ne correspondent pas"
                      : "";
                });
              },
            ),
          SizedBox(height: MediaQuery.of(context).size.height < 700 ? 2 : 5),
          if (widget.isLogin) _buildForgotPasswordLink(),
        ],
        if (widget.isForgotPassword)
          _buildInputFieldWithValidation(
            hint: "Email",
            icon: Icons.email_outlined,
            controller: _emailController,
            errorMessage: _emailError,
            onChanged: (value) {
              setState(() {
                _emailError = RegexFormatter.getEmailValidationMessage(value);
              });
            },
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
              bottom: BorderSide(color: AppColors.buttonWithoutBackGround),
            ),
          ),
          child: Text(
            "Forgot Password?",
            style: TextStyle(
              fontFamily: 'Inder',
              color: AppColors.buttonWithoutBackGround,
              fontWeight: FontWeight.bold,
              fontSize: 10,
            ),
          ),
        ),
      ),
    );
  }

  //configuration des boutons d'actions
  Widget _buildActionButton() {
    return ElevatedButton(
      onPressed: () => _handleButtonPress(),
      style: ElevatedButton.styleFrom(
        backgroundColor: AppColors.fillButtonBackgorund,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(5)),
      ),
      child: Text(
        widget.isForgotPassword
            ? "Reset Password"
            : widget.isLogin
            ? "Sign In"
            : "Sign Up",
        style: const TextStyle(
          fontFamily: 'Inder',
          color: AppColors.titleColor,
          fontSize: 13,
        ),
      ),
    );
  }

  void _handleButtonPress() {
    if (widget.isForgotPassword) {
      // Validation pour réinitialisation du mot de passe
      if (_emailController.text.trim().isEmpty) {
        _showErrorSnackBar("Veuillez saisir votre adresse email");
        return;
      }
      if (!RegexFormatter.isValidEmail(_emailController.text.trim())) {
        _showErrorSnackBar("Veuillez saisir une adresse email valide");
        return;
      }
      widget.onResetPassword?.call(_emailController.text.trim());
    } else if (widget.isLogin) {
      // Validation pour connexion
      if (_emailController.text.trim().isEmpty) {
        _showErrorSnackBar("Veuillez saisir votre email ou nom d'utilisateur");
        return;
      }
      if (_passwordController.text.trim().isEmpty) {
        _showErrorSnackBar("Veuillez saisir votre mot de passe");
        return;
      }
      widget.onSignIn?.call(
        _emailController.text.trim(),
        _passwordController.text.trim(),
      );
    } else {
      // Validation pour inscription
      if (_firstNameController.text.trim().isEmpty) {
        _showErrorSnackBar("Veuillez saisir votre prénom");
        return;
      }
      if (_lastNameController.text.trim().isEmpty) {
        _showErrorSnackBar("Veuillez saisir votre nom de famille");
        return;
      }
      if (_emailController.text.trim().isEmpty) {
        _showErrorSnackBar("Veuillez saisir votre adresse email");
        return;
      }
      if (!RegexFormatter.isValidEmail(_emailController.text.trim())) {
        _showErrorSnackBar("Veuillez saisir une adresse email valide");
        return;
      }
      if (_passwordController.text.trim().isEmpty) {
        _showErrorSnackBar("Veuillez saisir un mot de passe");
        return;
      }
      if (_passwordController.text.trim().length < 8) {
        _showErrorSnackBar(
          "Le mot de passe doit contenir au moins 8 caractères",
        );
        return;
      }
      if (_confirmPasswordController.text.trim().isEmpty) {
        _showErrorSnackBar("Veuillez confirmer votre mot de passe");
        return;
      }
      if (_passwordController.text.trim() !=
          _confirmPasswordController.text.trim()) {
        _showErrorSnackBar("Les mots de passe ne correspondent pas");
        return;
      }

      // Appel de la fonction d'inscription avec les données validées
      widget.onSignUp?.call(
        _firstNameController.text.trim(),
        _lastNameController.text.trim(),
        _emailController.text.trim(),
        _passwordController.text.trim(),
      );
    }
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
                fontSize: 9,
                fontWeight: FontWeight.bold,
              ),
            ),
          ),
        ),
      ],
    );
  }

  // Méthode pour afficher les erreurs
  void _showErrorSnackBar(String message) {
    SnackbarHelper.showError(context, message);
  }
}
