import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:safe_driving/core/constants/colors/colors.dart';
import 'package:safe_driving/core/theme/app_text_styles.dart';
import 'package:safe_driving/shared/widgets/customs/buttons/composite/button_rows.dart';
import 'package:safe_driving/shared/widgets/customs/colors/colors_widget.dart';
import 'package:safe_driving/l10n/l10n.dart';
import 'package:safe_driving/shared/state_management/service_locator.dart';
import 'package:safe_driving/features/onboarding/driver/core/interfaces/driver_service_interface.dart';
import 'package:safe_driving/features/authentication/services/session_service.dart';
import 'package:safe_driving/shared/widgets/customs/snackbar/snackbar_helper.dart';
import 'dart:developer' as developer;

class OnboardingScreen extends StatelessWidget {
  final VoidCallback onUserPressed;
  final VoidCallback onDriverPressed;

  const OnboardingScreen({
    super.key,
    required this.onUserPressed,
    required this.onDriverPressed,
  });

  Widget _buildProgressCircle(BuildContext context) {
    return SizedBox(
      width: 60,
      height: 60,
      child: Stack(
        alignment: Alignment.center,
        children: [
          CircularProgressIndicator(
            value: 1 / 6,
            backgroundColor: AppColors.light.adapt(context),
            valueColor: AlwaysStoppedAnimation(
              AppColors.progress.adapt(context),
            ),
            strokeWidth: 4,
          ),
          Text(
            '1/6',
            style: TextStyle(
              color: AppColors.light.adapt(context),
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
        decoration: ColorsWidget.background(context),
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
                  _buildProgressCircle(context),
                  const SizedBox(width: 8),
                  Expanded(
                    child: Text(
                      context.l10n.onboardingRole,
                      style: TextStyle(
                        color: AppColors.light.adapt(context),
                        fontSize: 16,
                      ),
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
                        color: Theme.of(context).colorScheme.surface,
                        borderRadius: BorderRadius.circular(6),
                        border: Border.all(
                          color: ColorsWidget.subtleBorderColor(context),
                          width: 1.0,
                        ),
                      ),
                      child: Column(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Text(
                            context.l10n.stepRoleTitle,
                            style: AppTextStyles.title20Regular(context),
                          ),
                          const SizedBox(height: 20),
                          ButtonRows.roleChoiceButtons(
onUserPressed: () async {
                              try {
                                final session = ServiceLocator.instance.get<SessionService>();
                                await session.savePendingRole('USER');
                                final uid = session.userId ?? '';
                                developer.log('Role selection: USER; userId=$uid');
                                final svc = ServiceLocator.instance.get<IDriverService>();
                                if (uid.isNotEmpty) {
                                  await svc.setUserRole(isDriver: false);
                                  await session.clearPendingRole();
                                  developer.log('Role USER assigned successfully');
                                }
                              } catch (e) {
                                developer.log('Role USER assignment failed: $e');
                                if (!context.mounted) return;
                                if (Navigator.canPop(context)) {
                                  SnackbarHelper.showError(context, 'Échec de l\'assignation du rôle utilisateur');
                                }
                              }
                              onUserPressed();
                            },
onDriverPressed: () async {
                              try {
                                final session = ServiceLocator.instance.get<SessionService>();
                                await session.savePendingRole('DRIVER');
                                final uid = session.userId ?? '';
                                developer.log('Role selection: DRIVER; userId=$uid');
                                final svc = ServiceLocator.instance.get<IDriverService>();
                                if (uid.isNotEmpty) {
                                  await svc.setUserRole(isDriver: true);
                                  await session.clearPendingRole();
                                  developer.log('Role DRIVER assigned successfully');
                                }
                              } catch (e) {
                                developer.log('Role DRIVER assignment failed: $e');
                                if (!context.mounted) return;
                                if (Navigator.canPop(context)) {
                                  SnackbarHelper.showError(context, 'Échec de l\'assignation du rôle chauffeur');
                                }
                              }
                              onDriverPressed();
                            },
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
