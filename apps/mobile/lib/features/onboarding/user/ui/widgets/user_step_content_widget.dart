import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:safe_driving/core/constants/colors/colors.dart';
import 'package:safe_driving/core/theme/app_text_styles.dart';
import 'package:safe_driving/shared/widgets/customs/buttons/basic/primary_button.dart';
import 'package:safe_driving/shared/widgets/customs/buttons/composite/button_rows.dart';
import 'package:safe_driving/shared/widgets/customs/buttons/composite/language_buttons.dart';
import 'package:safe_driving/shared/widgets/customs/buttons/controls/switches_and_radios.dart';
import 'package:safe_driving/shared/widgets/customs/snackbar/snackbar_helper.dart';

import '../../models/user_onboarding_data.dart';
import '../../models/user_onboarding_step_model.dart';
import '../../viewmodels/user_onboarding_viewmodel.dart';
import 'user_theme_selector_widget.dart';
import 'user_transport_selector_widget.dart';

part 'steps/welcome_step.dart';
part 'steps/gps_step.dart';
part 'steps/notifications_step.dart';
part 'steps/preferences_step.dart';
part 'steps/summary_step.dart';

class UserStepContentWidget extends StatelessWidget {
  final int step; // 1..5

  const UserStepContentWidget({super.key, required this.step});

  @override
  Widget build(BuildContext context) {
    final viewModel = context.watch<UserOnboardingViewModel>();
    final stepContent = UserOnboardingData.getStepContent(step - 1);

    switch (step) {
      case 1:
        return _WelcomeStep(stepContent: stepContent, viewModel: viewModel);
      case 2:
        return _GpsStep(stepContent: stepContent, viewModel: viewModel);
      case 3:
        return _NotificationsStep(
          stepContent: stepContent,
          viewModel: viewModel,
        );
      case 4:
        return _PreferencesStep(stepContent: stepContent, viewModel: viewModel);
      case 5:
        return _SummaryStep(stepContent: stepContent, viewModel: viewModel);
      default:
        return const SizedBox.shrink();
    }
  }
}
