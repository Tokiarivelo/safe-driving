import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:safe_driving/core/constants/colors/colors.dart';
import 'package:safe_driving/shared/widgets/customs/buttons/buttons_widget.dart';
import 'package:safe_driving/shared/widgets/customs/colors/colors_widget.dart';

class OnboardingScreen extends StatelessWidget {
  final VoidCallback onUserPressed;
  final VoidCallback onDriverPressed;

  const OnboardingScreen({
    super.key,
    required this.onUserPressed,
    required this.onDriverPressed,
  });

  Widget _buildProgressCircle() {
    return SizedBox(
      width: 60,
      height: 60,
      child: Stack(
        alignment: Alignment.center,
        children: [
          CircularProgressIndicator(
            value: 1 / 6, // Première étape sur 6
            backgroundColor: AppColors.light,
            valueColor: AlwaysStoppedAnimation(AppColors.progress),
            strokeWidth: 4,
          ),
          const Text(
            '1/6',
            style: TextStyle(
              color: AppColors.light,
              fontWeight: FontWeight.bold,
            ),
          ),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        decoration: ColorsWidget.background,
        child: Column(
          children: [
            // Logo
            Padding(
              padding: const EdgeInsets.only(top: 20, bottom: 10),
              child: Center(
                child: SvgPicture.asset(
                  'lib/resources/assets/logo/logo_white.svg',
                  width: 85,
                  height: 85,
                ),
              ),
            ),

            // Zone progression
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 10),
              child: Row(
                children: [
                  _buildProgressCircle(),
                  const SizedBox(width: 8),
                  const Expanded(
                    child: Text(
                      'Choix du rôle',
                      style: TextStyle(color: AppColors.light, fontSize: 16),
                    ),
                  ),
                ],
              ),
            ),

            // Contenu principal
            Expanded(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Padding(
                    padding: const EdgeInsets.only(
                      left: 16,
                      right: 16,
                      bottom: 30,
                    ),
                    child: Container(
                      width: 330,
                      padding: const EdgeInsets.all(16),
                      decoration: BoxDecoration(
                        color: AppColors.secondBackgroundColor,
                        borderRadius: BorderRadius.circular(5),
                      ),
                      child: Column(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          const Text(
                            'Vous êtes… ?',
                            style: TextStyle(
                              color: AppColors.buttonWithoutBackGround,
                              fontSize: 20,
                              fontWeight: FontWeight.w400,
                            ),
                          ),
                          const SizedBox(height: 20),
                          ButtonsWidget.roleChoiceButtons(
                            onUserPressed: onUserPressed,
                            onDriverPressed: onDriverPressed,
                          ),
                        ],
                      ),
                    ),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
