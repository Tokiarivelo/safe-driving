class AuthStepContent {
  final String title;
  final String subtitle;
  final String subSubtitle;
  final String actionButtonText;
  final String socialText;
  final String navigationPrefix;
  final String navigationLink;
  final String backToLoginText;
  final String forgotPasswordText;
  final Map<String, dynamic>? additionalContent;

  AuthStepContent({
    required this.title,
    required this.subtitle,
    required this.subSubtitle,
    required this.actionButtonText,
    required this.socialText,
    required this.navigationPrefix,
    required this.navigationLink,
    required this.backToLoginText,
    required this.forgotPasswordText,
    this.additionalContent,
  });
}
