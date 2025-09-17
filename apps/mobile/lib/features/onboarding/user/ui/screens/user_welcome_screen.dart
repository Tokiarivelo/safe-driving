import 'package:flutter/material.dart';
import 'package:safe_driving/core/constants/colors/colors.dart';
import 'package:safe_driving/core/theme/app_text_styles.dart';
import 'package:safe_driving/shared/widgets/customs/buttons/basic/primary_button.dart';
import 'package:safe_driving/l10n/l10n.dart';
import 'package:provider/provider.dart';
import 'package:safe_driving/features/authentication/viewmodels/auth_view_model.dart';

import 'package:confetti/confetti.dart';

class UserWelcomeScreen extends StatefulWidget {
  const UserWelcomeScreen({super.key});

  @override
  State<UserWelcomeScreen> createState() => _UserWelcomeScreenState();
}

class _UserWelcomeScreenState extends State<UserWelcomeScreen> {
  late final ConfettiController _confetti;

  String _buildWelcomeTitle(BuildContext context) {
    String raw = '';
    try {
      final auth = Provider.of<AuthViewModel>(context, listen: false);
      raw = (auth.currentUser?.fullName ?? auth.currentUser?.email ?? '')
          .trim();
    } catch (_) {
      raw = '';
    }
    final base = context.l10n.driverCompleteTitle;
    if (raw.isEmpty) return base.trim();
    return '$base$raw';
  }

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

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Stack(
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
                  style: AppTextStyles.h1(
                    context,
                  ).copyWith(fontSize: 24, fontWeight: FontWeight.w600),
                ),
                const SizedBox(height: 16),
                Text(
                  'Votre profil a bien été complété et validé. Vous êtes maintenant prêt(e) à utiliser Safe Driving en tant qu’utilisateur.',
                  textAlign: TextAlign.center,
                  style: AppTextStyles.body16(context).copyWith(height: 1.5),
                ),
                const SizedBox(height: 24),
                Column(
                  crossAxisAlignment: CrossAxisAlignment.center,
                  children: [
                    Text(
                      'Votre QR code personnel a été généré :',
                      textAlign: TextAlign.center,
                      style: AppTextStyles.body16(
                        context,
                      ).copyWith(fontWeight: FontWeight.w600),
                    ),
                    const SizedBox(height: 16),
                    Container(
                      width: 150,
                      height: 150,
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
                      child: Center(
                        child: Icon(
                          Icons.qr_code,
                          size: 80,
                          color: AppColors.fillButtonBackground.adapt(context),
                        ),
                      ),
                    ),
                    const SizedBox(height: 16),
                    Text(
                      'Il permettra à vos passagers de vous identifier rapidement et en toute sécurité. Vous pouvez à tout moment consulter ou télécharger ce QR code dans le menu Mon compte > Mon QR code.',
                      textAlign: TextAlign.center,
                      style: AppTextStyles.body14(context).copyWith(
                        fontSize: 14,
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
                          color: AppColors.light.adapt(context),
                          width: 1,
                        ),
                      ),
                      child: Text(
                        context.l10n.driverCompleteThankYou,
                        textAlign: TextAlign.center,
                        style: AppTextStyles.body14(context).copyWith(
                          fontWeight: FontWeight.w500,
                          height: 1.4,
                          color: AppColors.light.adapt(context),
                        ),
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 32),
                PrimaryButton.primaryButton(
                  text: context.l10n.driverCompleteStart,
                  onPressed: () {
                    Navigator.pushReplacementNamed(context, '/home');
                  },
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
      ),
    );
  }
}
