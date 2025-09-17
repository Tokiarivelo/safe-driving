import 'dart:convert';
import 'dart:typed_data';
import 'package:flutter/material.dart';
import 'package:safe_driving/core/constants/colors/colors.dart';
import 'package:safe_driving/core/theme/app_text_styles.dart';
import 'package:safe_driving/features/onboarding/driver/models/driver_onboarding_step_model.dart';
import 'package:safe_driving/features/onboarding/driver/viewmodels/driver_onboarding_coordinator.dart';
import 'package:safe_driving/shared/state_management/providers.dart';
import 'package:safe_driving/shared/widgets/customs/buttons/basic/primary_button.dart';
import 'package:safe_driving/l10n/l10n.dart';
import 'package:confetti/confetti.dart';

class StepTwelveView extends StatefulWidget {
  final DriverOnboardingStepModel step;
  final DriverOnboardingCoordinator coordinator;
  final VoidCallback onContinue;
  final VoidCallback? onSkip;

  const StepTwelveView({
    super.key,
    required this.step,
    required this.coordinator,
    required this.onContinue,
    this.onSkip,
  });

  @override
  State<StepTwelveView> createState() => _StepTwelveViewState();
}

class _StepTwelveViewState extends State<StepTwelveView> {
  late final ConfettiController _confetti;

  @override
  void initState() {
    super.initState();
    _confetti = ConfettiController(duration: const Duration(seconds: 2))
      ..play();
  }

  @override
  void dispose() {
    _confetti.dispose();
    super.dispose();
  }

  String _buildWelcomeTitle(BuildContext context) {
    String display = '';
    try {
      final user = context.authVM.currentUser;
      final first = (user?.firstName ?? '').trim();
      display = first.isNotEmpty
          ? first
          : ((user?.fullName ?? user?.email ?? '').trim());
    } catch (_) {}
    final base = context.l10n.driverCompleteTitle;
    if (display.isEmpty) return base.trim();
    return '$base$display';
  }

  @override
  Widget build(BuildContext context) {
    return Stack(
      children: [
        Container(
          width: double.infinity,
          padding: const EdgeInsets.all(24),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              const SizedBox(height: 20),
              Text(
                _buildWelcomeTitle(context),
                textAlign: TextAlign.center,
                style: AppTextStyles.h1(context).copyWith(
                  fontSize: 24,
                  fontWeight: FontWeight.w600,
                  color: Theme.of(context).colorScheme.onSurface,
                ),
              ),
              const SizedBox(height: 16),
              Text(
                context.l10n.driverCompleteSubtitle,
                textAlign: TextAlign.center,
                style: AppTextStyles.body16(context).copyWith(
                  color: Theme.of(
                    context,
                  ).colorScheme.onSurface.withValues(alpha: 0.7),
                  height: 1.5,
                ),
              ),
              const SizedBox(height: 24),

              // QR Code section
              Column(
                crossAxisAlignment: CrossAxisAlignment.center,
                children: [
                  Text(
                    context.l10n.driverCompleteQrCodeSubtitle,
                    textAlign: TextAlign.center,
                    style: AppTextStyles.body16(context).copyWith(
                      fontWeight: FontWeight.w600,
                      color: Theme.of(context).colorScheme.onSurface,
                    ),
                  ),
                  const SizedBox(height: 16),

                  FutureBuilder<String>(
                    future: coordinator.generateDriverQrCode(type: 'driver'),
                    builder: (context, snapshot) {
                      if (snapshot.connectionState == ConnectionState.waiting) {
                        return Container(
                          width: 150,
                          height: 150,
                          alignment: Alignment.center,
                          decoration: BoxDecoration(
                            color: AppColors.inputTextBackground
                                .adapt(context)
                                .withAlpha(100),
                            borderRadius: BorderRadius.circular(12),
                            border: Border.all(
                              color: AppColors.fillButtonBackground
                                  .adapt(context)
                                  .withAlpha(100),
                              width: 2,
                            ),
                          ),
                          child: const SizedBox(
                            width: 28,
                            height: 28,
                            child: CircularProgressIndicator(strokeWidth: 2.2),
                          ),
                        );
                      }
                      if (snapshot.hasError || !(snapshot.hasData)) {
                        return Container(
                          width: 150,
                          height: 150,
                          alignment: Alignment.center,
                          decoration: BoxDecoration(
                            color: AppColors.inputTextBackground
                                .adapt(context)
                                .withAlpha(100),
                            borderRadius: BorderRadius.circular(12),
                            border: Border.all(
                              color: AppColors.fillButtonBackground
                                  .adapt(context)
                                  .withAlpha(100),
                              width: 2,
                            ),
                          ),
                          child: Icon(
                            Icons.qr_code_2,
                            size: 80,
                            color: AppColors.fillButtonBackground.adapt(
                              context,
                            ),
                          ),
                        );
                      }
                      final qrUrl = snapshot.data!;
                      return Container(
                        width: 150,
                        height: 150,
                        padding: const EdgeInsets.all(8),
                        decoration: BoxDecoration(
                          color: AppColors.inputTextBackground
                              .adapt(context)
                              .withAlpha(100),
                          borderRadius: BorderRadius.circular(12),
                          border: Border.all(
                            color: AppColors.fillButtonBackground
                                .adapt(context)
                                .withAlpha(100),
                            width: 2,
                          ),
                        ),
                        child: ClipRRect(
                          borderRadius: BorderRadius.circular(8),
                          child: Image.network(
                            qrUrl,
                            width: 134,
                            height: 134,
                            fit: BoxFit.cover,
                          ),
                        ),
                      );
                    },
                  ),

                  const SizedBox(height: 16),
                  Text(
                    context.l10n.driverCompleteQrCodeInstructions,
                    textAlign: TextAlign.center,
                    style: TextStyle(
                      fontSize: 14,
                      color: Theme.of(
                        context,
                      ).colorScheme.onSurface.withValues(alpha: 0.7),
                      height: 1.4,
                      fontFamily: 'Inder',
                    ),
                  ),

                  const SizedBox(height: 20),
                  Container(
                    padding: const EdgeInsets.all(16),
                    decoration: BoxDecoration(
                      color: AppColors.backgroundSecondary,
                      borderRadius: BorderRadius.circular(12),
                      border: Border.all(
                        color: Theme.of(context).colorScheme.onSurface,
                        width: 1,
                      ),
                    ),
                    child: Text(
                      context.l10n.driverCompleteThankYou,
                      textAlign: TextAlign.center,
                      style: AppTextStyles.body14(context).copyWith(
                        fontWeight: FontWeight.w500,
                        height: 1.4,
                        color: Theme.of(context).colorScheme.onSurface,
                      ),
                    ),
                  ),
                ],
              ),

              const SizedBox(height: 32),

              PrimaryButton.primaryButton(
                text: context.l10n.driverCompleteStart,
                onPressed: widget.onContinue,
                padding: const EdgeInsets.symmetric(
                  vertical: 16,
                  horizontal: 40,
                ),
              ),
            ],
          ),
        ),
        Align(
          alignment: Alignment.topCenter,
          child: ConfettiWidget(
            confettiController: _confetti,
            blastDirectionality: BlastDirectionality.explosive,
            shouldLoop: false,
            emissionFrequency: 0.05,
            numberOfParticles: 20,
            maxBlastForce: 20,
            minBlastForce: 5,
          ),
        ),
      ],
    );
  }
}
