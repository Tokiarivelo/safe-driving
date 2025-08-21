import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:provider/provider.dart';
import 'package:safe_driving/core/constants/colors/colors.dart';
import 'package:safe_driving/features/onboarding/driver/ui/widgets/driver_pagination_widget.dart';
import 'package:safe_driving/shared/widgets/customs/colors/colors_widget.dart';

import '../../viewmodels/driver_onboarding_viewmodel.dart';
import '../builders/driver_ui_builder.dart';
import '../widgets/driver_step_indicator.dart';

class DriverOnboardingScreen extends StatefulWidget {
  const DriverOnboardingScreen({super.key});

  @override
  DriverOnboardingScreenState createState() => DriverOnboardingScreenState();
}

class DriverOnboardingScreenState extends State<DriverOnboardingScreen> {
  final GlobalKey<DriverPaginationWidgetState> _paginationKey =
      GlobalKey<DriverPaginationWidgetState>();

  void _navigateToStep(int stepIndex, DriverOnboardingViewModel viewModel) {
    _paginationKey.currentState?.goToStep(stepIndex);
    viewModel.goToStep(stepIndex);
  }

  @override
  Widget build(BuildContext context) {
    return Consumer<DriverOnboardingViewModel>(
      builder: (context, viewModel, child) {
        final screenHeight = MediaQuery.of(context).size.height;
        final headerHeight = screenHeight * 0.25;

        return Scaffold(
          body: Container(
            decoration: ColorsWidget.background,
            child: DriverPaginationWidget(
              key: _paginationKey,
              totalSteps: viewModel.steps.length,
              contentBuilder: (currentStep, nextStep, previousStep) {
                return Stack(
                  children: [
                    // Header with logo and progress
                    Positioned(
                      top: 0,
                      left: 0,
                      right: 0,
                      height: headerHeight,
                      child: Container(
                        width: double.infinity,
                        decoration: ColorsWidget.background,
                        child: SafeArea(
                          child: Column(
                            children: [
                              // Logo
                              Expanded(
                                flex: 2,
                                child: Center(
                                  child: SvgPicture.asset(
                                    'lib/resources/assets/logo/logo_white.svg',
                                    width: 85,
                                    height: 85,
                                  ),
                                ),
                              ),
                              // Progress indicator
                              Transform.translate(
                                offset: const Offset(0, -12),
                                child: Expanded(
                                  flex: 1,
                                  child: Padding(
                                    padding: const EdgeInsets.symmetric(
                                      horizontal: 24,
                                    ),
                                    child: DriverStepIndicator(
                                      currentStep: currentStep,
                                      totalSteps: viewModel.steps.length,
                                    ),
                                  ),
                                ),
                              ),
                            ],
                          ),
                        ),
                      ),
                    ),
                    // Content area
                    Positioned(
                      top: headerHeight,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      child: ClipRRect(
                        borderRadius: const BorderRadius.only(
                          topLeft: Radius.circular(24),
                          topRight: Radius.circular(24),
                        ),
                        child: Container(
                          color: AppColors.secondBackgroundColor,
                          child:
                              _paginationKey.currentState?.buildPageView(
                                itemBuilder: (index) {
                                    return SingleChildScrollView(
                                      child: DriverUIBuilder.buildStepContent(
                                        viewModel.steps[index],
                                        viewModel,
                                        nextStep,
                                        (stepIndex) => _navigateToStep(stepIndex, viewModel),
                                        context,
                                      ),
                                    );
                                },
                                itemCount: viewModel.steps.length,
                              ) ??
                              const Center(child: CircularProgressIndicator()),
                        ),
                      ),
                    ),
                    // Loading overlay
                    if (viewModel.isLoading)
                      Positioned.fill(
                        child: Container(
                          color: Colors.black.withValues(alpha: 0.5),
                          child: const Center(
                            child: CircularProgressIndicator(),
                          ),
                        ),
                      ),
                  ],
                );
              },
            ),
          ),
        );
      },
    );
  }
}
