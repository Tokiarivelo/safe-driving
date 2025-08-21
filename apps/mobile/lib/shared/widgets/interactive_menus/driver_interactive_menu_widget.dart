import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:safe_driving/core/constants/colors/colors.dart';
import 'package:safe_driving/shared/widgets/customs/colors/colors_widget.dart';
import 'package:safe_driving/shared/widgets/pagination/pagination_widget.dart';
import 'package:safe_driving/models/interactive_menu/interactive_menu_models.dart';
import 'package:safe_driving/shared/widgets/customs/buttons/buttons_widget.dart';

class DriverInteractiveMenuWidget extends StatefulWidget {
  const DriverInteractiveMenuWidget({super.key});

  @override
  DriverInteractiveMenuWidgetState createState() =>
      DriverInteractiveMenuWidgetState();
}

class DriverInteractiveMenuWidgetState
    extends State<DriverInteractiveMenuWidget> {
  static const int _totalSteps = 14;
  final GlobalKey<PaginationWidgetState> _paginationKey =
      GlobalKey<PaginationWidgetState>();
  final List<StepDriverContent> stepContents = StepDriverData.stepContents;

  Widget _buildStepContent(StepDriverContent step, VoidCallback nextStep) {
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.all(24),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            step.title,
            style: const TextStyle(
              fontSize: 24,
              fontWeight: FontWeight.bold,
              color: AppColors.textColor,
            ),
          ),
          const SizedBox(height: 16),
          Text(
            step.subtitle,
            style: const TextStyle(
              fontSize: 16,
              color: AppColors.textColor,
              height: 1.5,
            ),
          ),
          const SizedBox(height: 24),
          // Contenu additionnel basé sur le type de step
          if (step.additionalContent != null)
            _buildAdditionalContent(step.additionalContent!),
          const SizedBox(height: 32),
          // Boutons
          if (step.buttonTitles.isNotEmpty)
            ButtonsWidget.buttonRow(
              buttonTitles: step.buttonTitles,
              onPressedList: step.buttonTitles.map((buttonTitle) {
                final isMainButton =
                    step.buttonTitles.indexOf(buttonTitle) ==
                    step.buttonTitles.length - 1;
                return () {
                  if (isMainButton) {
                    nextStep();
                  }
                };
              }).toList(),
              mainAxisAlignment: MainAxisAlignment.spaceEvenly,
              isLastButtonPrimary: true,
              spacing: 8,
              buttonPadding: const EdgeInsets.symmetric(vertical: 16),
              fontSize: 16,
            ),
        ],
      ),
    );
  }

  Widget _buildAdditionalContent(Map<String, dynamic> content) {
    // basé sur les clés dans additionalContent (form, documents, etc.)
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: AppColors.inputTextBackground.withAlpha(77),
        borderRadius: BorderRadius.circular(12),
      ),
      child: const Text(
        'Contenu additionnel à implémenter selon le type',
        style: TextStyle(
          color: AppColors.textColor,
          fontStyle: FontStyle.italic,
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final screenHeight = MediaQuery.of(context).size.height;
    final headerHeight = screenHeight * 0.25;

    return Scaffold(
      body: Container(
        decoration: ColorsWidget.background,
        child: PaginationWidget(
          key: _paginationKey,
          totalSteps: _totalSteps,
          contentBuilder: (currentStep, nextStep, previousStep) {
            return Stack(
              children: [
                // Container du haut (25% de l'écran)
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
                                'assets/logo/logo_white.svg',
                                width: 85,
                                height: 85,
                              ),
                            ),
                          ),
                          // Zone progression
                          Transform.translate(
                            offset: const Offset(0, -12),
                            child: Expanded(
                              flex: 1,
                              child: Padding(
                                padding: const EdgeInsets.symmetric(
                                  horizontal: 24,
                                ),
                                child: Row(
                                  crossAxisAlignment: CrossAxisAlignment.center,
                                  children: [
                                    _paginationKey.currentState
                                            ?.buildCircularProgress() ??
                                        const SizedBox(),
                                    const SizedBox(width: 8),
                                    Expanded(
                                      child: Transform.translate(
                                        offset: const Offset(0, -5),
                                        child: Container(
                                          alignment: Alignment.centerLeft,
                                          child:
                                              _paginationKey.currentState
                                                  ?.buildDotDashProgress() ??
                                              const SizedBox(),
                                        ),
                                      ),
                                    ),
                                  ],
                                ),
                              ),
                            ),
                          ),
                        ],
                      ),
                    ),
                  ),
                ),
                // Zone contenu (reste de l'écran) avec border radius forcé
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
                                child: _buildStepContent(
                                  stepContents[index],
                                  nextStep,
                                ),
                              );
                            },
                            itemCount: stepContents.length,
                          ) ??
                          const Center(child: CircularProgressIndicator()),
                    ),
                  ),
                ),
              ],
            );
          },
        ),
      ),
    );
  }
}
