import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:provider/provider.dart';
import 'package:safe_driving/core/constants/colors/colors.dart';
import 'package:safe_driving/l10n/l10n.dart';

import '../../models/user_onboarding_data.dart';
import '../../viewmodels/user_onboarding_viewmodel.dart';
import 'user_progress_widget.dart';
import 'user_step_content_widget.dart';

class UserInteractiveMenuWidget extends StatelessWidget {
  const UserInteractiveMenuWidget({super.key});

  @override
  Widget build(BuildContext context) {
    final viewModel = context.watch<UserOnboardingViewModel>();

    return Column(
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

        // Progress header
        Builder(
          builder: (context) => UserProgressWidget(
            currentStep: viewModel.currentStep,
            totalSteps: viewModel.totalSteps,
            stepTitle: () {
              switch (viewModel.currentStep) {
                case 1:
                  return context.l10n.onboardingWelcome;
                case 2:
                  return context.l10n.onboardingGps;
                case 3:
                  return context.l10n.onboardingNotifications;
                case 4:
                  return context.l10n.onboardingPreferences;
                case 5:
                default:
                  return context.l10n.onboardingSummary;
              }
            }(),
          ),
        ),

        // Steps list
        Expanded(
          child: ListView.builder(
            itemCount: viewModel.totalSteps,
            itemBuilder: (ctx, index) {
              final step = index + 1;
              final isExpanded = viewModel.expandedTiles[step] ?? false;
              final stepInfo = UserOnboardingData.steps[index];

              return Container(
                margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 6),
                child: Theme(
                  data: Theme.of(
                    context,
                  ).copyWith(dividerColor: Colors.transparent),
                  child: Builder(
                    builder: (context) => ExpansionTile(
                      key: ValueKey('expansion_tile_${step}_$isExpanded'),
                      backgroundColor: AppColors.transparent,
                      collapsedBackgroundColor: AppColors.transparent,
                      iconColor: AppColors.light.adapt(context),
                      collapsedIconColor: AppColors.light.adapt(context),
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(12),
                        side: BorderSide(
                          color: AppColors.light.adapt(context),
                          width: 1.0,
                        ),
                      ),
                      collapsedShape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(12),
                        side: BorderSide(
                          color: AppColors.light.adapt(context),
                          width: 1.0,
                        ),
                      ),
                      initiallyExpanded: isExpanded,
                      maintainState: true,
                      onExpansionChanged: (bool expanded) {
                        viewModel.updateExpansionTile(step, expanded);
                      },
                      controlAffinity: ListTileControlAffinity.trailing,
                      tilePadding: const EdgeInsets.symmetric(
                        horizontal: 16,
                        vertical: 12,
                      ),
                      title: Row(
                        children: [
                          if (stepInfo.emoji != null)
                            Text(
                              stepInfo.emoji!,
                              style: const TextStyle(fontSize: 24),
                            )
                          else if (stepInfo.icon != null)
                            Icon(stepInfo.icon!, color: AppColors.light.adapt(context), size: 24)
                          else
                            Icon(
                              Icons.help,
                              color: AppColors.light.adapt(context),
                              size: 24,
                            ),
                          const SizedBox(width: 8),
                          Builder(
                            builder: (context) => Text(
                              () {
                                switch (step) {
                                  case 1:
                                    return context.l10n.onboardingWelcome;
                                  case 2:
                                    return context.l10n.onboardingGps;
                                  case 3:
                                    return context.l10n.onboardingNotifications;
                                  case 4:
                                    return context.l10n.onboardingPreferences;
                                  case 5:
                                  default:
                                    return context.l10n.onboardingSummary;
                                }
                              }(),
                              style: TextStyle(
                                color: AppColors.light.adapt(context),
                                fontWeight: FontWeight.normal,
                                fontSize: 16,
                              ),
                            ),
                          ),
                        ],
                      ),
                      children: [
                        Container(
                          width: double.infinity,
                          decoration: BoxDecoration(
                            color: Theme.of(context).colorScheme.surface,
                            borderRadius: const BorderRadius.only(
                              bottomLeft: Radius.circular(12),
                              bottomRight: Radius.circular(12),
                            ),
                            border: Border(
                              top: BorderSide(color: AppColors.light.adapt(context), width: 1),
                            ),
                          ),
                          padding: const EdgeInsets.all(16),
                          child: UserStepContentWidget(step: step),
                        ),
                      ],
                    ),
                  ),
                ),
              );
            },
          ),
        ),
      ],
    );
  }
}
