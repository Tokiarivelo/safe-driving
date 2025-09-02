import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:provider/provider.dart';
import 'package:safe_driving/core/constants/colors/colors.dart';

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
        UserProgressWidget(
          currentStep: viewModel.currentStep,
          totalSteps: viewModel.totalSteps,
          stepTitle: viewModel.getStepTitle(viewModel.currentStep),
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
                  data:
                      Theme.of(context).copyWith(dividerColor: Colors.transparent),
                  child: ExpansionTile(
                    key: ValueKey('expansion_tile_${step}_$isExpanded'),
                    backgroundColor: AppColors.transparent,
                    collapsedBackgroundColor: AppColors.transparent,
                    iconColor: AppColors.light,
                    collapsedIconColor: AppColors.light,
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(12),
                      side: const BorderSide(color: AppColors.light, width: 1.0),
                    ),
                    collapsedShape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(12),
                      side: const BorderSide(color: AppColors.light, width: 1.0),
                    ),
                    initiallyExpanded: isExpanded,
                    maintainState: true,
                    onExpansionChanged: (bool expanded) {
                      viewModel.updateExpansionTile(step, expanded);
                    },
                    controlAffinity: ListTileControlAffinity.trailing,
                    tilePadding:
                        const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
                    title: Row(
                      children: [
                        if (stepInfo.emoji != null)
                          Text(stepInfo.emoji!,
                              style: const TextStyle(fontSize: 24))
                        else if (stepInfo.icon != null)
                          Icon(stepInfo.icon!, color: AppColors.light, size: 24)
                        else
                          const Icon(Icons.help,
                              color: AppColors.light, size: 24),
                        const SizedBox(width: 8),
                        Text(
                          stepInfo.title,
                          style: const TextStyle(
                            color: AppColors.light,
                            fontWeight: FontWeight.normal,
                            fontSize: 16,
                          ),
                        ),
                      ],
                    ),
                    children: [
                      Container(
                        width: double.infinity,
                        decoration: const BoxDecoration(
                          color: AppColors.secondBackgroundColor,
                          borderRadius: BorderRadius.only(
                            bottomLeft: Radius.circular(12),
                            bottomRight: Radius.circular(12),
                          ),
                          border: Border(
                            top: BorderSide(color: AppColors.light, width: 1),
                          ),
                        ),
                        padding: const EdgeInsets.all(16),
                        child: UserStepContentWidget(step: step),
                      ),
                    ],
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
