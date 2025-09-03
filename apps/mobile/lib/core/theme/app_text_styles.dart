import 'package:flutter/material.dart';

class AppTextStyles {
  AppTextStyles._();

  static TextStyle h1(BuildContext context) => Theme.of(context)
      .textTheme
      .headlineSmall!
      .copyWith(color: Theme.of(context).colorScheme.tertiary);

  static TextStyle h1Light(BuildContext context) => Theme.of(context)
      .textTheme
      .headlineSmall!
      .copyWith(color: Theme.of(context).colorScheme.onPrimary);

  static TextStyle h1BoldNeutral(BuildContext context) => Theme.of(context)
      .textTheme
      .headlineSmall!
      .copyWith(color: Theme.of(context).colorScheme.onSurface);

  static TextStyle h2(BuildContext context) => Theme.of(context)
      .textTheme
      .titleMedium!
      .copyWith(color: Theme.of(context).colorScheme.tertiary);

  static TextStyle h2BoldNeutral(BuildContext context) => Theme.of(context)
      .textTheme
      .titleMedium!
      .copyWith(color: Theme.of(context).colorScheme.onSurface);

  static TextStyle title20Regular(BuildContext context) =>
      Theme.of(context).textTheme.headlineSmall!.copyWith(
        fontWeight: FontWeight.w400,
        color: Theme.of(context).colorScheme.tertiary,
      );

  // Body
  static TextStyle body16(BuildContext context) => Theme.of(context)
      .textTheme
      .bodyMedium!
      .copyWith(color: Theme.of(context).colorScheme.onSurface);

  static TextStyle body16Light(BuildContext context) => Theme.of(context)
      .textTheme
      .bodyMedium!
      .copyWith(color: Theme.of(context).colorScheme.onPrimary);

  static TextStyle body14(BuildContext context) => Theme.of(context)
      .textTheme
      .bodySmall!
      .copyWith(height: 1.6, color: Theme.of(context).colorScheme.onSurface);

  static TextStyle label14(BuildContext context) => Theme.of(context)
      .textTheme
      .labelMedium!
      .copyWith(color: Theme.of(context).colorScheme.onSurface);

  static TextStyle button16(BuildContext context) =>
      Theme.of(context).textTheme.labelLarge!;

  static TextStyle caption12(BuildContext context) => Theme.of(context)
      .textTheme
      .labelSmall!
      .copyWith(color: Theme.of(context).colorScheme.onSurface);

  static TextStyle caption10(BuildContext context) => Theme.of(context)
      .textTheme
      .labelSmall!
      .copyWith(color: Theme.of(context).colorScheme.onSurface);

  static TextStyle error10(BuildContext context) => Theme.of(
    context,
  ).textTheme.labelSmall!.copyWith(color: Theme.of(context).colorScheme.error);

  static TextStyle hint14(BuildContext context) => Theme.of(context)
      .textTheme
      .bodySmall!
      .copyWith(color: Theme.of(context).colorScheme.onSurfaceVariant);

  static TextStyle hint10(BuildContext context) => Theme.of(context)
      .textTheme
      .labelSmall!
      .copyWith(color: Theme.of(context).colorScheme.onSurfaceVariant);

  static TextStyle link9Bold(BuildContext context) =>
      Theme.of(context).textTheme.labelSmall!.copyWith(
        fontWeight: FontWeight.w700,
        color: Theme.of(context).colorScheme.tertiary,
      );

  static TextStyle navPrefix12(BuildContext context) => Theme.of(context)
      .textTheme
      .labelSmall!
      .copyWith(color: Theme.of(context).colorScheme.onSurface);

  static TextStyle chip12(BuildContext context) => Theme.of(context)
      .textTheme
      .labelSmall!
      .copyWith(color: Theme.of(context).colorScheme.tertiary);

  static TextStyle smallBoldLight(BuildContext context) =>
      Theme.of(context).textTheme.labelSmall!.copyWith(
        fontWeight: FontWeight.w700,
        color: Theme.of(context).colorScheme.onPrimary,
      );
}
