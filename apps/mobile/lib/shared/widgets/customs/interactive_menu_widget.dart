import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:safe_driving/core/constants/colors/colors.dart';

class InteractiveMenuWidget extends StatefulWidget {
  const InteractiveMenuWidget({super.key});

  @override
  InteractiveMenuWidgetState createState() => InteractiveMenuWidgetState();
}

class InteractiveMenuWidgetState extends State<InteractiveMenuWidget> {
  int _currentStep = 1;

  // États pour les steps
  bool _gpsEnabled = false;
  bool _notifEnabled = false;
  String _selectedTheme = 'Clair';
  final List<String> _selectedTransports = [];

  final List<_StepInfo> _steps = [
    _StepInfo(title: '👋 Bienvenue', icon: null),
    _StepInfo(title: 'GPS', icon: Icons.gps_fixed),
    _StepInfo(title: 'Notifications', icon: Icons.notifications),
    _StepInfo(title: 'Préférence', icon: Icons.settings),
    _StepInfo(title: 'Récapitulatif', icon: Icons.recent_actors),
  ];

  void _nextStep() {
    if (_currentStep < 6) setState(() => _currentStep++);
  }

  String _getStepTitle(int step) {
    switch (step) {
      case 1:
        return 'Rôle';
      case 2:
        return 'Bienvenue';
      case 3:
        return 'GPS';
      case 4:
        return 'Notifications';
      case 5:
        return 'Préférences';
      case 6:
        return 'Récapitulatif';
      default:
        return 'Étape $step';
    }
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        //Logo
        Padding(
          padding: const EdgeInsets.only(top: 20, bottom: 10),
          child: Center(
            child: SvgPicture.asset(
              'assets/logo/logo_white.svg',
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
              const SizedBox(width: 1),
              Expanded(
                child: Text(
                  _getStepTitle(_currentStep),
                  style: TextStyle(color: AppColors.light, fontSize: 16),
                ),
              ),
            ],
          ),
        ),

        //Zone contenu
        Expanded(
          child: _currentStep == 1
              // Step 1 : carte blanche
              ? Padding(
                  padding: const EdgeInsets.only(bottom: 100),
                  child: Center(
                    child: Container(
                      width: 300,
                      constraints: const BoxConstraints(
                        maxHeight: 130, // Limiter du hauteur
                      ),
                      padding: const EdgeInsets.all(20),
                      decoration: BoxDecoration(
                        color: AppColors.secondBackgroundColor,
                        borderRadius: BorderRadius.circular(5),
                        boxShadow: [
                          BoxShadow(color: AppColors.blur, blurRadius: 10),
                        ],
                      ),
                      child: _buildStepContent(1),
                    ),
                  ),
                )
              // Steps 2–6 : ExpansionTiles
              : ListView.builder(
                  itemCount: 5,
                  itemBuilder: (ctx, i) => _buildExpansionTile(i + 2),
                ),
        ),
      ],
    );
  }

  Widget _buildProgressCircle() {
    return SizedBox(
      width: 60,
      height: 60,
      child: Stack(
        alignment: Alignment.center,
        children: [
          CircularProgressIndicator(
            value: _currentStep / 6,
            backgroundColor: AppColors.light,
            valueColor: AlwaysStoppedAnimation(AppColors.progress),
            strokeWidth: 4,
          ),
          Text(
            '$_currentStep/6',
            style: const TextStyle(
              color: AppColors.light,
              fontWeight: FontWeight.bold,
            ),
          ),
        ],
      ),
    );
  }

  //Les expansions
  Widget _buildExpansionTile(int step) {
    final info = _steps[step - 2];
    final isExpanded = _currentStep == step;

    return Container(
      margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 6),
      child: ExpansionTile(
        key: Key('step_$step'),
        backgroundColor: AppColors.transparent,
        collapsedBackgroundColor: AppColors.secondBackgroundColor,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(12),
          side: BorderSide(color: AppColors.light.withAlpha(100)),
        ),
        collapsedShape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(12),
          side: BorderSide(color: AppColors.light.withAlpha(100)),
        ),
        initiallyExpanded: isExpanded,
        onExpansionChanged: (open) {
          if (open) setState(() => _currentStep = step);
        },
        tilePadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
        title: Row(
          children: [
            Icon(info.icon, color: AppColors.light),
            const SizedBox(width: 8),
            Text(
              info.title,
              style: TextStyle(
                color: AppColors.buttonWithoutBackGround,
                fontWeight: FontWeight.bold,
              ),
            ),
          ],
        ),
        trailing: Icon(
          isExpanded ? Icons.expand_less : Icons.expand_more,
          color: AppColors.light,
        ),
        children: [
          Container(
            width: double.infinity,
            decoration: BoxDecoration(
              color: AppColors.secondBackgroundColor,
              borderRadius: BorderRadius.circular(12),
              boxShadow: [BoxShadow(color: AppColors.blur, blurRadius: 6)],
            ),
            padding: const EdgeInsets.all(16),
            child: _buildStepContent(step),
          ),
        ], // ← children toujours en dernier
      ),
    );
  }

  Widget _buildStepContent(int step) {
    switch (step) {
      case 1:
        return Column(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Text(
              'Vous êtes… ?',
              style: TextStyle(
                color: AppColors.buttonWithoutBackGround,
                fontSize: 20,
                fontWeight: FontWeight.w400,
              ),
            ),
            const SizedBox(height: 20),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceEvenly,
              children: [
                Expanded(
                  child: ElevatedButton(
                    style: ElevatedButton.styleFrom(
                      backgroundColor: AppColors.fillButtonBackgorund,
                      padding: const EdgeInsets.symmetric(vertical: 12),
                    ),
                    onPressed: _nextStep,
                    child: const Text(
                      'Je suis utilisateur',
                      style: TextStyle(color: AppColors.light, fontSize: 9),
                    ),
                  ),
                ),
                const SizedBox(width: 8),
                Expanded(
                  child: ElevatedButton(
                    style: ElevatedButton.styleFrom(
                      backgroundColor: AppColors.fillButtonBackgorund,
                      padding: const EdgeInsets.symmetric(vertical: 12),
                    ),
                    onPressed: () {},
                    child: const Text(
                      'Je suis un chauffeur',
                      style: TextStyle(color: AppColors.light, fontSize: 9),
                    ),
                  ),
                ),
              ],
            ),
          ],
        );

      case 2:
        return Column(
          children: [
            Text(
              'Bienvenue chez Safe Driving !',
              style: TextStyle(
                color: AppColors.fillButtonBackgorund,
                fontSize: 18,
              ),
            ),
            const SizedBox(height: 8),
            Text(
              'Merci d’avoir rejoint notre communauté ! Laissez-nous vous guider pour personnaliser votre expérience.',
              style: TextStyle(color: AppColors.fillButtonBackgorund),
              textAlign: TextAlign.center,
            ),
            const SizedBox(height: 16),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceAround,
              children: [
                OutlinedButton(
                  style: OutlinedButton.styleFrom(
                    backgroundColor: AppColors.secondBackgroundColor,
                    side: BorderSide(color: AppColors.buttonWithoutBackGround),
                  ),
                  onPressed: () => setState(() => _currentStep = 3),
                  child: Text(
                    'Plus tard',
                    style: TextStyle(color: AppColors.buttonWithoutBackGround),
                  ),
                ),
                ElevatedButton(
                  style: ElevatedButton.styleFrom(
                    backgroundColor: AppColors.fillButtonBackgorund,
                  ),
                  onPressed: () => setState(() => _currentStep = 3),
                  child: const Text(
                    'Démarrer',
                    style: TextStyle(color: AppColors.light),
                  ),
                ),
              ],
            ),
          ],
        );

      case 3:
        return Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              'Où êtes-vous ?',
              style: TextStyle(
                fontSize: 20,
                fontWeight: FontWeight.bold,
                color: AppColors.buttonWithoutBackGround,
              ),
            ),
            const SizedBox(height: 8),
            Text(
              'Pour vous proposer les véhicules les plus proches, autorisez l’accès à votre position. C’est rapide et sécurisé.',
              style: TextStyle(color: AppColors.fillButtonBackgorund),
            ),
            const SizedBox(height: 16),
            RadioListTile<bool>(
              title: const Text('Plus tard'),
              value: false,
              groupValue: _gpsEnabled,
              activeColor: AppColors.buttonWithoutBackGround,
              onChanged: (v) => setState(() => _gpsEnabled = v!),
            ),
            RadioListTile<bool>(
              title: const Text('Activer'),
              value: true,
              groupValue: _gpsEnabled,
              activeColor: AppColors.buttonWithoutBackGround,
              onChanged: (v) => setState(() => _gpsEnabled = v!),
            ),
            const SizedBox(height: 8),
            Center(
              child: ElevatedButton(
                style: ElevatedButton.styleFrom(
                  backgroundColor: AppColors.fillButtonBackgorund,
                ),
                onPressed: () => setState(() => _currentStep = 4),
                child: const Text(
                  'Suivant',
                  style: TextStyle(color: AppColors.light),
                ),
              ),
            ),
          ],
        );

      case 4:
        return Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              'Restez informé',
              style: TextStyle(
                fontSize: 20,
                fontWeight: FontWeight.bold,
                color: AppColors.buttonWithoutBackGround,
              ),
            ),
            const SizedBox(height: 8),
            Text(
              'Choisissez de recevoir des alertes en temps réel sur l’arrivée de votre chauffeur et l’état de votre trajet.',
              style: TextStyle(color: AppColors.fillButtonBackgorund),
            ),
            const SizedBox(height: 16),
            RadioListTile<bool>(
              title: const Text('Plus tard'),
              value: false,
              groupValue: _notifEnabled,
              activeColor: AppColors.buttonWithoutBackGround,
              onChanged: (v) => setState(() => _notifEnabled = v!),
            ),
            RadioListTile<bool>(
              title: const Text('Activer'),
              value: true,
              groupValue: _notifEnabled,
              activeColor: AppColors.buttonWithoutBackGround,
              onChanged: (v) => setState(() => _notifEnabled = v!),
            ),
            const SizedBox(height: 8),
            Center(
              child: ElevatedButton(
                style: ElevatedButton.styleFrom(
                  backgroundColor: AppColors.fillButtonBackgorund,
                ),
                onPressed: () => setState(() => _currentStep = 5),
                child: const Text(
                  'Suivant',
                  style: TextStyle(color: AppColors.light),
                ),
              ),
            ),
          ],
        );

      case 5:
        return Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              'Faites-le à votre façon',
              style: TextStyle(
                fontSize: 20,
                fontWeight: FontWeight.bold,
                color: AppColors.buttonWithoutBackGround,
              ),
            ),
            const SizedBox(height: 8),
            Text(
              'Sélectionnez vos modes de transport favoris et activez le thème sombre si vous préférez une expérience plus douce pour les yeux.',
              style: TextStyle(color: AppColors.fillButtonBackgorund),
            ),
            const SizedBox(height: 16),
            Text(
              'Thème',
              style: TextStyle(color: AppColors.buttonWithoutBackGround),
            ),
            Row(
              children: [
                ChoiceChip(
                  label: const Text('Clair'),
                  selected: _selectedTheme == 'Clair',
                  onSelected: (_) => setState(() => _selectedTheme = 'Clair'),
                ),
                const SizedBox(width: 8),
                ChoiceChip(
                  label: const Text('Sombre'),
                  selected: _selectedTheme == 'Sombre',
                  onSelected: (_) => setState(() => _selectedTheme = 'Sombre'),
                ),
              ],
            ),
            const SizedBox(height: 16),
            Text(
              'Type de transport',
              style: TextStyle(color: AppColors.buttonWithoutBackGround),
            ),
            const SizedBox(height: 8),
            Wrap(
              spacing: 8,
              children: ['Voiture', 'Moto', 'TukTuk'].map((mode) {
                final sel = _selectedTransports.contains(mode);
                return FilterChip(
                  avatar: Icon(
                    mode == 'Voiture'
                        ? Icons.directions_car
                        : mode == 'Moto'
                        ? Icons.motorcycle
                        : Icons.electric_rickshaw,
                    size: 18,
                  ),
                  label: Text(mode),
                  selected: sel,
                  onSelected: (on) {
                    setState(() {
                      if (on) {
                        _selectedTransports.add(mode);
                      } else {
                        _selectedTransports.remove(mode);
                      }
                    });
                  },
                  selectedColor: AppColors.fillButtonBackgorund,
                  checkmarkColor: AppColors.light,
                );
              }).toList(),
            ),
            const SizedBox(height: 24),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceAround,
              children: [
                OutlinedButton(
                  style: OutlinedButton.styleFrom(
                    backgroundColor: AppColors.secondBackgroundColor,
                    side: BorderSide(color: AppColors.buttonWithoutBackGround),
                  ),
                  onPressed: () => setState(() => _currentStep = 6),
                  child: Text(
                    'Plus tard',
                    style: TextStyle(color: AppColors.buttonWithoutBackGround),
                  ),
                ),
                ElevatedButton(
                  style: ElevatedButton.styleFrom(
                    backgroundColor: AppColors.fillButtonBackgorund,
                  ),
                  onPressed: () => setState(() => _currentStep = 6),
                  child: const Text(
                    'Valider',
                    style: TextStyle(color: AppColors.light),
                  ),
                ),
              ],
            ),
          ],
        );

      case 6:
        return Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              'Tout est prêt !',
              style: TextStyle(
                fontSize: 20,
                fontWeight: FontWeight.bold,
                color: AppColors.buttonWithoutBackGround,
              ),
            ),
            const SizedBox(height: 8),
            Text(
              'Voilà un résumé de vos choix. Vous pouvez toujours les modifier plus tard dans les paramètres. Prêt·e à démarrer ?',
              style: TextStyle(color: AppColors.fillButtonBackgorund),
            ),
            const SizedBox(height: 16),
            SwitchListTile(
              title: const Text('GPS'),
              value: _gpsEnabled,
              activeColor: AppColors.progress,
              onChanged: (v) => setState(() => _gpsEnabled = v),
            ),
            SwitchListTile(
              title: const Text('Notifications'),
              value: _notifEnabled,
              activeColor: AppColors.progress,
              onChanged: (v) => setState(() => _notifEnabled = v),
            ),
            const SizedBox(height: 16),
            Text(
              'Thème : $_selectedTheme',
              style: TextStyle(color: AppColors.buttonWithoutBackGround),
            ),
            Text(
              'Transport : ${_selectedTransports.join(', ')}',
              style: TextStyle(color: AppColors.buttonWithoutBackGround),
            ),
            const SizedBox(height: 24),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceAround,
              children: [
                OutlinedButton(
                  style: OutlinedButton.styleFrom(
                    backgroundColor: AppColors.secondBackgroundColor,
                    side: BorderSide(color: AppColors.buttonWithoutBackGround),
                  ),
                  onPressed: () => setState(() => _currentStep = 1),
                  child: Text(
                    'Annuler',
                    style: TextStyle(color: AppColors.buttonWithoutBackGround),
                  ),
                ),
                ElevatedButton(
                  style: ElevatedButton.styleFrom(
                    backgroundColor: AppColors.fillButtonBackgorund,
                  ),
                  onPressed: () {
                    //finale
                  },
                  child: const Text(
                    'Valider',
                    style: TextStyle(color: AppColors.light),
                  ),
                ),
              ],
            ),
          ],
        );

      default:
        return const SizedBox.shrink();
    }
  }
}

class _StepInfo {
  final String title;
  final IconData? icon;
  _StepInfo({required this.title, this.icon});
}
