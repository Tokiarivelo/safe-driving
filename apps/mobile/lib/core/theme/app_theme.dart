import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import '../constants/colors/colors.dart';

class AppTheme {
  AppTheme._();

  static ThemeData get lightTheme {
    return ThemeData(
      useMaterial3: true,
      brightness: Brightness.light,
      fontFamily: 'Inder',
      
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
        iconTheme: const IconThemeData(
          color: AppColors.light,
        ),
        titleTextStyle: const TextStyle(
          fontFamily: 'Inder',
          fontSize: 20,
          fontWeight: FontWeight.w800,
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
          textStyle: const TextStyle(
            fontFamily: 'Inder',
            fontSize: 16,
            fontWeight: FontWeight.w500,
          ),
        ),
      ),
      
      outlinedButtonTheme: OutlinedButtonThemeData(
        style: OutlinedButton.styleFrom(
          foregroundColor: AppColors.buttonWithoutBackGround,
          side: const BorderSide(
            color: AppColors.buttonWithoutBackGround,
            width: 2,
          ),
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(12),
          ),
          padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 12),
          textStyle: const TextStyle(
            fontFamily: 'Inder',
            fontSize: 16,
            fontWeight: FontWeight.w500,
          ),
        ),
      ),
      
      textButtonTheme: TextButtonThemeData(
        style: TextButton.styleFrom(
          foregroundColor: AppColors.buttonWithoutBackGround,
          textStyle: const TextStyle(
            fontFamily: 'Inder',
            fontSize: 16,
            fontWeight: FontWeight.w500,
          ),
        ),
      ),
      
      inputDecorationTheme: InputDecorationTheme(
        filled: true,
        fillColor: AppColors.inputTextBackground,
        border: OutlineInputBorder(
          borderRadius: BorderRadius.circular(12),
          borderSide: const BorderSide(
            color: AppColors.borderInputField,
          ),
        ),
        enabledBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(12),
          borderSide: const BorderSide(
            color: AppColors.borderInputField,
          ),
        ),
        focusedBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(12),
          borderSide: const BorderSide(
            color: AppColors.color1,
            width: 2,
          ),
        ),
        errorBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(12),
          borderSide: const BorderSide(
            color: AppColors.error,
          ),
        ),
        focusedErrorBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(12),
          borderSide: const BorderSide(
            color: AppColors.error,
            width: 2,
          ),
        ),
        hintStyle: const TextStyle(
          color: AppColors.placeHolderInput,
          fontFamily: 'Inder',
          fontSize: 14,
        ),
        labelStyle: const TextStyle(
          color: AppColors.textColor,
          fontFamily: 'Inder',
          fontSize: 14,
        ),
        errorStyle: const TextStyle(
          color: AppColors.error,
          fontFamily: 'Inder',
          fontSize: 12,
        ),
      ),
      
      iconTheme: const IconThemeData(
        color: AppColors.icon,
      ),
      
      cardTheme: CardThemeData(
        color: AppColors.light,
        elevation: 2,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(16),
        ),
      ),
      
      chipTheme: ChipThemeData(
        backgroundColor: AppColors.softBackgroundColor,
        selectedColor: AppColors.color1,
        disabledColor: AppColors.unclickable,
        labelStyle: const TextStyle(
          fontFamily: 'Inder',
          fontSize: 12,
          color: AppColors.buttonWithoutBackGround,
        ),
        padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 4),
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(20),
        ),
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
        contentTextStyle: const TextStyle(
          color: AppColors.light,
          fontFamily: 'Inder',
        ),
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(8),
        ),
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
            return AppColors.color1;
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
        titleTextStyle: const TextStyle(
          fontFamily: 'Inder',
          fontSize: 20,
          fontWeight: FontWeight.w800,
          color: AppColors.buttonWithoutBackGround,
        ),
        contentTextStyle: const TextStyle(
          fontFamily: 'Inder',
          fontSize: 16,
          color: AppColors.textColor,
        ),
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(20),
        ),
      ),
    );
  }

  static ThemeData get darkTheme {
    return ThemeData(
      useMaterial3: true,
      brightness: Brightness.dark,
      fontFamily: 'Inder',
      
      colorScheme: ColorScheme.dark(
        primary: AppColors.color1,
        secondary: AppColors.color2,
        surface: AppColors.dark,
        error: AppColors.error,
        onPrimary: AppColors.light,
        onSecondary: AppColors.light,
        onSurface: AppColors.light,
        onError: AppColors.light,
        primaryContainer: AppColors.buttonWithoutBackGround.withValues(alpha: 0.3),
        secondaryContainer: AppColors.buttonWithoutBackGround.withValues(alpha: 0.2),
        tertiary: AppColors.color1,
        outline: AppColors.color1.withValues(alpha: 0.5),
      ),
      
      scaffoldBackgroundColor: AppColors.dark,
      
      appBarTheme: AppBarTheme(
        backgroundColor: AppColors.dark,
        foregroundColor: AppColors.light,
        elevation: 0,
        centerTitle: true,
        iconTheme: const IconThemeData(
          color: AppColors.light,
        ),
        titleTextStyle: const TextStyle(
          fontFamily: 'Inder',
          fontSize: 20,
          fontWeight: FontWeight.w800,
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
          textStyle: const TextStyle(
            fontFamily: 'Inder',
            fontSize: 16,
            fontWeight: FontWeight.w500,
          ),
        ),
      ),
      
      outlinedButtonTheme: OutlinedButtonThemeData(
        style: OutlinedButton.styleFrom(
          foregroundColor: AppColors.color1,
          side: const BorderSide(
            color: AppColors.color1,
            width: 2,
          ),
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(12),
          ),
          padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 12),
          textStyle: const TextStyle(
            fontFamily: 'Inder',
            fontSize: 16,
            fontWeight: FontWeight.w500,
          ),
        ),
      ),
      
      textButtonTheme: TextButtonThemeData(
        style: TextButton.styleFrom(
          foregroundColor: AppColors.color1,
          textStyle: const TextStyle(
            fontFamily: 'Inder',
            fontSize: 16,
            fontWeight: FontWeight.w500,
          ),
        ),
      ),
      
      inputDecorationTheme: InputDecorationTheme(
        filled: true,
        fillColor: AppColors.dark,
        border: OutlineInputBorder(
          borderRadius: BorderRadius.circular(12),
          borderSide: BorderSide(
            color: AppColors.color1.withValues(alpha: 0.3),
          ),
        ),
        enabledBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(12),
          borderSide: BorderSide(
            color: AppColors.color1.withValues(alpha: 0.3),
          ),
        ),
        focusedBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(12),
          borderSide: const BorderSide(
            color: AppColors.color1,
            width: 2,
          ),
        ),
        errorBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(12),
          borderSide: const BorderSide(
            color: AppColors.error,
          ),
        ),
        focusedErrorBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(12),
          borderSide: const BorderSide(
            color: AppColors.error,
            width: 2,
          ),
        ),
        hintStyle: TextStyle(
          color: AppColors.light.withValues(alpha: 0.5),
          fontFamily: 'Inder',
          fontSize: 14,
        ),
        labelStyle: TextStyle(
          color: AppColors.light.withValues(alpha: 0.8),
          fontFamily: 'Inder',
          fontSize: 14,
        ),
        errorStyle: const TextStyle(
          color: AppColors.error,
          fontFamily: 'Inder',
          fontSize: 12,
        ),
      ),
      
      iconTheme: const IconThemeData(
        color: AppColors.color1,
      ),
      
      cardTheme: CardThemeData(
        color: AppColors.dark,
        elevation: 4,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(16),
        ),
      ),
      
      chipTheme: ChipThemeData(
        backgroundColor: AppColors.buttonWithoutBackGround.withValues(alpha: 0.2),
        selectedColor: AppColors.color1,
        disabledColor: AppColors.unclickable.withValues(alpha: 0.3),
        labelStyle: const TextStyle(
          fontFamily: 'Inder',
          fontSize: 12,
          color: AppColors.light,
        ),
        padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 4),
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(20),
        ),
      ),
      
      bottomNavigationBarTheme: const BottomNavigationBarThemeData(
        backgroundColor: AppColors.dark,
        selectedItemColor: AppColors.color1,
        unselectedItemColor: AppColors.unclickable,
        showUnselectedLabels: true,
        type: BottomNavigationBarType.fixed,
      ),
      
      snackBarTheme: SnackBarThemeData(
        backgroundColor: AppColors.dark,
        contentTextStyle: const TextStyle(
          color: AppColors.light,
          fontFamily: 'Inder',
        ),
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(8),
        ),
        behavior: SnackBarBehavior.floating,
      ),
      
      progressIndicatorTheme: ProgressIndicatorThemeData(
        color: AppColors.color1,
        linearTrackColor: AppColors.buttonWithoutBackGround.withValues(alpha: 0.2),
        circularTrackColor: AppColors.buttonWithoutBackGround.withValues(alpha: 0.2),
      ),
      
      dividerTheme: DividerThemeData(
        color: AppColors.light.withValues(alpha: 0.1),
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
            return AppColors.color1;
          }
          return AppColors.unclickable.withValues(alpha: 0.3);
        }),
      ),
      
      floatingActionButtonTheme: const FloatingActionButtonThemeData(
        backgroundColor: AppColors.color1,
        foregroundColor: AppColors.light,
      ),
      
      dialogTheme: DialogThemeData(
        backgroundColor: AppColors.dark,
        titleTextStyle: const TextStyle(
          fontFamily: 'Inder',
          fontSize: 20,
          fontWeight: FontWeight.w800,
          color: AppColors.light,
        ),
        contentTextStyle: TextStyle(
          fontFamily: 'Inder',
          fontSize: 16,
          color: AppColors.light.withValues(alpha: 0.9),
        ),
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(20),
        ),
      ),
    );
  }

  static ThemeData getThemeByMode(ThemeMode mode) {
    switch (mode) {
      case ThemeMode.dark:
        return darkTheme;
      case ThemeMode.light:
        return lightTheme;
      case ThemeMode.system:
        final brightness = WidgetsBinding.instance.platformDispatcher.platformBrightness;
        return brightness == Brightness.dark ? darkTheme : lightTheme;
    }
  }
}
