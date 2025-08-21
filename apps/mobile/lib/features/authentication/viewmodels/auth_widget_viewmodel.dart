import 'package:flutter/material.dart';
import '../models/auth_models.dart';
import '../ui/widgets/auth/auth_validators.dart';

class AuthWidgetViewModel extends ChangeNotifier {
  final TextEditingController _emailController = TextEditingController();
  final TextEditingController _passwordController = TextEditingController();
  final TextEditingController _firstNameController = TextEditingController();
  final TextEditingController _lastNameController = TextEditingController();
  final TextEditingController _confirmPasswordController =
      TextEditingController();

  String _emailError = "";
  String _passwordError = "";
  String _firstNameError = "";
  String _lastNameError = "";
  String _confirmPasswordError = "";

  TextEditingController get emailController => _emailController;
  TextEditingController get passwordController => _passwordController;
  TextEditingController get firstNameController => _firstNameController;
  TextEditingController get lastNameController => _lastNameController;
  TextEditingController get confirmPasswordController =>
      _confirmPasswordController;

  String get emailError => _emailError;
  String get passwordError => _passwordError;
  String get firstNameError => _firstNameError;
  String get lastNameError => _lastNameError;
  String get confirmPasswordError => _confirmPasswordError;

  void validateEmail(String value) {
    _emailError = AuthValidators.getEmailValidationError(value);
    notifyListeners();
  }

  void validatePassword(String value, bool isLogin) {
    _passwordError = AuthValidators.getPasswordValidationError(value);

    if (!isLogin && _confirmPasswordController.text.isNotEmpty) {
      _confirmPasswordError = AuthValidators.getConfirmPasswordValidationError(
        value,
        _confirmPasswordController.text,
      );
    }
    notifyListeners();
  }

  void validateFirstName(String value) {
    _firstNameError = AuthValidators.getUsernameValidationError(value);
    notifyListeners();
  }

  void validateLastName(String value) {
    _lastNameError = AuthValidators.getUsernameValidationError(value);
    notifyListeners();
  }

  void validateConfirmPassword(String value) {
    _confirmPasswordError = AuthValidators.getConfirmPasswordValidationError(
      _passwordController.text,
      value,
    );
    notifyListeners();
  }

  String? validateForgotPasswordForm(BuildContext context) {
    return AuthValidators.validateForgotPassword(
      email: _emailController.text,
      context: context,
    );
  }

  String? validateSignInForm(BuildContext context) {
    return AuthValidators.validateSignIn(
      email: _emailController.text,
      password: _passwordController.text,
      context: context,
    );
  }

  String? validateSignUpForm(BuildContext context) {
    return AuthValidators.validateSignUp(
      firstName: _firstNameController.text,
      lastName: _lastNameController.text,
      email: _emailController.text,
      password: _passwordController.text,
      confirmPassword: _confirmPasswordController.text,
      context: context,
    );
  }

  AuthStepContent getCurrentStepData({
    required bool isLogin,
    required bool isForgotPassword,
  }) {
    final String stepKey = isForgotPassword
        ? 'forgotPassword'
        : isLogin
        ? 'login'
        : 'register';

    return AuthStepContentMap.stepContents[stepKey]!;
  }

  void clearErrors() {
    _emailError = "";
    _passwordError = "";
    _firstNameError = "";
    _lastNameError = "";
    _confirmPasswordError = "";
    notifyListeners();
  }

  void clearControllers() {
    _emailController.clear();
    _passwordController.clear();
    _firstNameController.clear();
    _lastNameController.clear();
    _confirmPasswordController.clear();
    clearErrors();
  }

  @override
  void dispose() {
    _emailController.dispose();
    _passwordController.dispose();
    _firstNameController.dispose();
    _lastNameController.dispose();
    _confirmPasswordController.dispose();
    super.dispose();
  }
}
