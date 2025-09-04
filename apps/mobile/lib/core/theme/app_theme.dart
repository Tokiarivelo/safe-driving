import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import '../constants/colors/colors.dart';

class AppTheme {
  AppTheme._();

  static const TextTheme _textTheme = TextTheme(
    headlineSmall: TextStyle(fontSize: 20, fontWeight: FontWeight.w700),
    titleMedium: TextStyle(fontSize: 18, fontWeight: FontWeight.w700),
    bodyMedium: TextStyle(fontSize: 16, fontWeight: FontWeight.w400),
    bodySmall: TextStyle(
      fontSize: 14,
      fontWeight: FontWeight.w400,
      height: 1.6,
    ),
    labelLarge: TextStyle(fontSize: 16, fontWeight: FontWeight.w500),
    labelMedium: TextStyle(fontSize: 14, fontWeight: FontWeight.w500),
    labelSmall: TextStyle(fontSize: 12, fontWeight: FontWeight.w400),
  );

  static ThemeData get lightTheme {
    return ThemeData(
      useMaterial3: true,
      brightness: Brightness.light,
      fontFamily: 'Inder',
      textTheme: _textTheme,

      colorScheme: ColorScheme.light(
        primary: AppColors.color1,
        secondary: AppColors.color2,
        surface: AppColors.secondBackgroundColor,
        error: AppColors.error,
        onPrimary: AppColors.light,
        onSecondary: AppColors.light,
        onSurface: AppColors.textColor,
        onError: AppColors.light,
        primaryContainer: AppColors.softBackgroundColor,
        secondaryContainer: AppColors.inputTextBackground,
        tertiary: AppColors.buttonWithoutBackGround,
        outline: AppColors.borderInputField,
        surfaceContainerHighest: AppColors.light,
      ),

      scaffoldBackgroundColor: AppColors.secondBackgroundColor,

      appBarTheme: AppBarTheme(
        backgroundColor: AppColors.color1,
        foregroundColor: AppColors.light,
        elevation: 0,
        centerTitle: true,
        iconTheme: const IconThemeData(color: AppColors.light),
        titleTextStyle: _textTheme.headlineSmall?.copyWith(
          color: AppColors.light,
        ),
        systemOverlayStyle: SystemUiOverlayStyle(
          statusBarColor: AppColors.transparent,
          statusBarIconBrightness: Brightness.light,
          statusBarBrightness: Brightness.dark,
        ),
      ),

      elevatedButtonTheme: ElevatedButtonThemeData(
        style: ElevatedButton.styleFrom(
          backgroundColor: AppColors.fillButtonBackground,
          foregroundColor: AppColors.light,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(12),
          ),
          padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 12),
        ),
      ),

      outlinedButtonTheme: OutlinedButtonThemeData(
        style: OutlinedButton.styleFrom(
          foregroundColor: AppColors.buttonWithoutBackGround,
          side: const BorderSide(
            color: AppColors.borderButtonLight,
            width: 1,
          ),
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(12),
          ),
          padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 12),
        ),
      ),

      textButtonTheme: TextButtonThemeData(
        style: TextButton.styleFrom(
          foregroundColor: AppColors.buttonWithoutBackGround,
        ),
      ),

      inputDecorationTheme: InputDecorationTheme(
        filled: true,
        fillColor: AppColors.inputTextBackground,
        border: OutlineInputBorder(
          borderRadius: BorderRadius.circular(12),
          borderSide: const BorderSide(color: AppColors.borderInputField),
        ),
        enabledBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(12),
          borderSide: const BorderSide(color: AppColors.borderInputField),
        ),
        focusedBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(12),
          borderSide: const BorderSide(color: AppColors.color1, width: 2),
        ),
        errorBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(12),
          borderSide: const BorderSide(color: AppColors.error),
        ),
        focusedErrorBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(12),
          borderSide: const BorderSide(color: AppColors.error, width: 2),
        ),
        hintStyle: _textTheme.bodySmall?.copyWith(
          color: AppColors.placeHolderInput,
        ),
        labelStyle: _textTheme.labelMedium?.copyWith(
          color: AppColors.textColor,
        ),
        errorStyle: _textTheme.labelSmall?.copyWith(color: AppColors.error),
      ),

      iconTheme: const IconThemeData(color: AppColors.icon),

      cardTheme: CardThemeData(
        color: AppColors.light,
        elevation: 2,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
      ),

      chipTheme: ChipThemeData(
        backgroundColor: AppColors.softBackgroundColor,
        selectedColor: AppColors.color1,
        disabledColor: AppColors.unclickable,
        labelStyle: _textTheme.labelSmall?.copyWith(
          color: AppColors.buttonWithoutBackGround,
        ),
        padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 4),
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
      ),

      bottomNavigationBarTheme: const BottomNavigationBarThemeData(
        backgroundColor: AppColors.light,
        selectedItemColor: AppColors.color1,
        unselectedItemColor: AppColors.unclickable,
        showUnselectedLabels: true,
        type: BottomNavigationBarType.fixed,
      ),

      snackBarTheme: SnackBarThemeData(
        backgroundColor: AppColors.dark,
        contentTextStyle: _textTheme.bodyMedium?.copyWith(
          color: AppColors.light,
        ),
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8)),
        behavior: SnackBarBehavior.floating,
      ),

      progressIndicatorTheme: ProgressIndicatorThemeData(
        color: AppColors.color1,
        linearTrackColor: AppColors.softBackgroundColor,
        circularTrackColor: AppColors.softBackgroundColor,
      ),

      dividerTheme: DividerThemeData(
        color: AppColors.borderInputField.withValues(alpha: 0.2),
        thickness: 1,
      ),

      switchTheme: SwitchThemeData(
        thumbColor: WidgetStateProperty.resolveWith((states) {
          if (states.contains(WidgetState.selected)) {
            return AppColors.light;
          }
          return AppColors.unclickable;
        }),
        trackColor: WidgetStateProperty.resolveWith((states) {
          if (states.contains(WidgetState.selected)) {
            return AppColors.progress; // Vert comme le CircularProgressBar
          }
          return AppColors.unclickable.withValues(alpha: 0.3);
        }),
      ),

      floatingActionButtonTheme: const FloatingActionButtonThemeData(
        backgroundColor: AppColors.color1,
        foregroundColor: AppColors.light,
      ),

      dialogTheme: DialogThemeData(
        backgroundColor: AppColors.light,
        titleTextStyle: _textTheme.headlineSmall?.copyWith(
          color: AppColors.textColor,
        ),
        contentTextStyle: _textTheme.bodyMedium?.copyWith(
          color: AppColors.textColor,
        ),
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
      ),
    );
  }

  static ThemeData get darkTheme {
    return ThemeData(
      useMaterial3: true,
      brightness: Brightness.dark,
      fontFamily: 'Inder',
      textTheme: _textTheme,

      colorScheme: ColorScheme.dark(
        primary: AppColors.color1,
        secondary: AppColors.color2,
        surface: AppColors.backgroundSecondary,
        error: AppColors.error,
        onPrimary: AppColors.light,
        onSecondary: AppColors.light,
        onSurface: AppColors.textColorDark,
        onError: AppColors.light,
        primaryContainer: AppColors.backgroundSoft,
        secondaryContainer: AppColors.backgroundSoft,
        tertiary: AppColors.color1,
        outline: AppColors.borderButtonDark,
      ),

      scaffoldBackgroundColor: AppColors.backgroundPrimary,

      appBarTheme: AppBarTheme(
        backgroundColor: AppColors.backgroundPrimary,
        foregroundColor: AppColors.light,
        elevation: 0,
        centerTitle: true,
        iconTheme: const IconThemeData(color: AppColors.light),
        titleTextStyle: _textTheme.headlineSmall?.copyWith(
          color: AppColors.light,
        ),
        systemOverlayStyle: SystemUiOverlayStyle(
          statusBarColor: AppColors.transparent,
          statusBarIconBrightness: Brightness.light,
          statusBarBrightness: Brightness.dark,
        ),
      ),

      elevatedButtonTheme: ElevatedButtonThemeData(
        style: ElevatedButton.styleFrom(
          backgroundColor: AppColors.color1,
          foregroundColor: AppColors.light,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(12),
          ),
          padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 12),
        ),
      ),

      outlinedButtonTheme: OutlinedButtonThemeData(
        style: OutlinedButton.styleFrom(
          foregroundColor: AppColors.buttonWithoutBackGroundDark,
          side: const BorderSide(color: AppColors.borderButtonDark, width: 1),
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(12),
          ),
          padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 12),
        ),
      ),

      textButtonTheme: TextButtonThemeData(
        style: TextButton.styleFrom(foregroundColor: AppColors.buttonWithoutBackGroundDark),
      ),

      inputDecorationTheme: InputDecorationTheme(
        filled: true,
        fillColor: AppColors.backgroundSecondary,
        border: OutlineInputBorder(
          borderRadius: BorderRadius.circular(12),
          borderSide: BorderSide(
            color: AppColors.light.withValues(alpha: 0.2),
          ),
        ),
        enabledBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(12),
          borderSide: BorderSide(
            color: AppColors.light.withValues(alpha: 0.2),
          ),
        ),
        focusedBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(12),
          borderSide: BorderSide(color: AppColors.light.withValues(alpha: 0.4), width: 2),
        ),
        errorBorder: const OutlineInputBorder(
          borderRadius: BorderRadius.all(Radius.circular(12)),
          borderSide: BorderSide(color: AppColors.error),
        ),
        focusedErrorBorder: const OutlineInputBorder(
          borderRadius: BorderRadius.all(Radius.circular(12)),
          borderSide: BorderSide(color: AppColors.error, width: 2),
        ),
        hintStyle: _textTheme.bodySmall?.copyWith(
          color: AppColors.light.withValues(alpha: 0.7),
        ),
        labelStyle: _textTheme.labelMedium?.copyWith(
          color: AppColors.light,
        ),
        prefixIconColor: AppColors.light,
        suffixIconColor: AppColors.light,
        errorStyle: _textTheme.labelSmall?.copyWith(color: AppColors.error),
      ),

      iconTheme: const IconThemeData(color: AppColors.iconDark),

      cardTheme: CardThemeData(
        color: AppColors.backgroundSoft,
        elevation: 4,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
      ),

      chipTheme: ChipThemeData(
        backgroundColor: AppColors.backgroundSoft,
        selectedColor: AppColors.color1,
        disabledColor: AppColors.unclickable.withValues(alpha: 0.3),
        labelStyle: _textTheme.labelSmall?.copyWith(color: AppColors.textColorDark),
        padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 4),
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
      ),

      bottomNavigationBarTheme: const BottomNavigationBarThemeData(
        backgroundColor: AppColors.backgroundSecondary,
        selectedItemColor: AppColors.color1,
        unselectedItemColor: AppColors.unclickable,
        showUnselectedLabels: true,
        type: BottomNavigationBarType.fixed,
      ),

      snackBarTheme: SnackBarThemeData(
        backgroundColor: AppColors.backgroundSecondary,
        contentTextStyle: _textTheme.bodyMedium?.copyWith(
          color: AppColors.textColorDark,
        ),
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8)),
        behavior: SnackBarBehavior.floating,
      ),

      progressIndicatorTheme: ProgressIndicatorThemeData(
        color: AppColors.progress,
        linearTrackColor: AppColors.backgroundSoft,
        circularTrackColor: AppColors.backgroundSoft,
      ),

      dividerTheme: DividerThemeData(
        color: AppColors.borderButtonDark.withValues(alpha: 0.3),
        thickness: 1,
      ),

      switchTheme: SwitchThemeData(
        thumbColor: WidgetStateProperty.resolveWith((states) {
          if (states.contains(WidgetState.selected)) {
            return AppColors.light;
          }
          return AppColors.unclickable;
        }),
        trackColor: WidgetStateProperty.resolveWith((states) {
          if (states.contains(WidgetState.selected)) {
            return AppColors.progress; // Vert comme le CircularProgressBar
          }
          return AppColors.unclickable.withValues(alpha: 0.3);
        }),
      ),

      floatingActionButtonTheme: const FloatingActionButtonThemeData(
        backgroundColor: AppColors.color1,
        foregroundColor: AppColors.light,
      ),

      dialogTheme: DialogThemeData(
        backgroundColor: AppColors.backgroundSecondary,
        titleTextStyle: _textTheme.headlineSmall?.copyWith(
          color: AppColors.textColorDark,
        ),
        contentTextStyle: _textTheme.bodyMedium?.copyWith(
          color: AppColors.textColorDark,
        ),
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
      ),
    );
  }

  static ThemeData getThemeByMode(ThemeMode mode) {
    switch (mode) {
      case ThemeMode.dark:
        return darkTheme;
      case ThemeMode.light:
      case ThemeMode.system: // Le mode automatique est supprimé: fallback => light
        return lightTheme;
    }
  }
}
