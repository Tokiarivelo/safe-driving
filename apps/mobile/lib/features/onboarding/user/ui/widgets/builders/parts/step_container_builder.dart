part of '../user_ui_builder.dart';

Widget _buildStepContainer({
  required Widget child,
  EdgeInsets? padding,
  double? width,
}) {
  return Container(
    width: width ?? 330,
    padding: padding ?? const EdgeInsets.all(16),
    decoration: BoxDecoration(
      color: Theme.of(
        NavigationService.navigatorKey.currentContext!,
      ).colorScheme.surface,
      borderRadius: BorderRadius.circular(5),
    ),
    child: child,
  );
}
