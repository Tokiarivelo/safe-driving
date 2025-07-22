import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:safe_driving/core/constants/colors/colors.dart';
import 'package:safe_driving/models/auth/interactive_menu/for_user.dart';
import 'package:safe_driving/shared/widgets/animations/animation_widget.dart';

class InteractiveMenuWidget extends StatefulWidget {
  const InteractiveMenuWidget({super.key});

  @override
  InteractiveMenuWidgetState createState() => InteractiveMenuWidgetState();
}

class InteractiveMenuWidgetState extends State<InteractiveMenuWidget> {
  static const int _totalSteps = 6;

  int _currentStep = 1;
  AppState _appState = const AppState();
  final Map<int, bool> _expandedTiles = {};

  // Configuration des étapes
  static const List<StepInfo> _steps = [
    StepInfo(title: 'Bienvenue', emoji: '👋'),
    StepInfo(title: 'GPS', icon: Icons.location_on),
    StepInfo(title: 'Notifications', icon: Icons.notifications),
    StepInfo(title: 'Préférence', icon: Icons.settings),
    StepInfo(title: 'Récapitulatif', icon: Icons.recent_actors),
  ];

  static const List<String> _transportModes = [
    'Voiture',
    'Moto',
    'TukTuk',
    'Vélo',
  ];

  static const Map<String, IconData> _transportIcons = {
    'Voiture': Icons.directions_car,
    'Moto': Icons.motorcycle,
    'TukTuk': Icons.electric_rickshaw,
    'Vélo': Icons.pedal_bike,
  };

  @override
  void initState() {
    super.initState();
    _initializeExpandedTiles();
  }

  void _initializeExpandedTiles() {
    for (int i = 2; i <= _totalSteps; i++) {
      _expandedTiles[i] = false;
    }
  }

  // Navigation entre les étapes (ici steps ce sont les expansions)
  void _nextStep() {
    if (_currentStep < _totalSteps) {
      _updateStep(_currentStep + 1);
    }
  }

  void _goToStep(int step) {
    if (step >= 1 && step <= _totalSteps) {
      _updateStep(step);
    }
  }

  void _nextStepImmediate() {
    if (_currentStep < _totalSteps) {
      final newStep = _currentStep + 1;
      setState(() {
        if (_currentStep > 1) {
          _expandedTiles[_currentStep] = false;
        }
        _currentStep = newStep;
        if (newStep > 1) {
          _expandedTiles[newStep] = true;
        }
      });
    }
  }

  void _updateStep(int newStep) {
    setState(() {
      if (_currentStep > 1) {
        _expandedTiles[_currentStep] = false;
      }
      _currentStep = newStep;
      // Ouvrir immédiatement la nouvelle step
      if (newStep > 1) {
        _expandedTiles[newStep] = true;
      }
    });
  }

  String _getStepTitle(int step) {
    const titles = {
      1: 'Rôle',
      2: 'Bienvenue',
      3: 'GPS',
      4: 'Notifications',
      5: 'Préférences',
      6: 'Récapitulatif',
    };
    return titles[step] ?? 'Étape $step';
  }

  // Update state
  void _updateGps(bool value) {
    setState(() {
      _appState = _appState.copyWith(gpsEnabled: value);
    });
  }

  void _updateNotifications(bool value) {
    setState(() {
      _appState = _appState.copyWith(notifEnabled: value);
    });
  }

  void _updateTheme(String theme) {
    setState(() {
      _appState = _appState.copyWith(selectedTheme: theme);
    });
  }

  void _updateTransport(String transport, bool selected) {
    setState(() {
      final newTransports = List<String>.from(_appState.selectedTransports);
      if (selected) {
        newTransports.add(transport);
      } else {
        newTransports.remove(transport);
      }
      _appState = _appState.copyWith(selectedTransports: newTransports);
    });
  }

  void _removeTransport(String transport) {
    setState(() {
      final newTransports = List<String>.from(_appState.selectedTransports);
      newTransports.remove(transport);
      _appState = _appState.copyWith(selectedTransports: newTransports);
    });
  }

  void _updateLanguage(String language) {
    setState(() {
      _appState = _appState.copyWith(selectedLanguage: language);
    });
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
              const SizedBox(width: 8),
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
              ? Column(
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
                          boxShadow: [
                            BoxShadow(color: AppColors.blur, blurRadius: 15),
                          ],
                        ),
                        child: _buildStepContent(1),
                      ),
                    ),
                  ],
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

  //Les expansions avec effet de slide (on utilise un widget animation)
  Widget _buildExpansionTile(int step) {
    final info = _steps[step - 2];
    final isExpanded = _expandedTiles[step] ?? false;

    return Container(
      margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 6),
      child: Theme(
        data: Theme.of(context).copyWith(dividerColor: Colors.transparent),
        child: ExpansionTile(
          key: ValueKey(
            'expansion_tile_${step}_$isExpanded',
          ), // Clé dynamique pour forcer le rebuild
          backgroundColor: AppColors.transparent,
          collapsedBackgroundColor: AppColors.transparent,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(12),
            side: BorderSide(color: AppColors.light, width: 1.0),
          ),
          collapsedShape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(12),
            side: BorderSide(color: AppColors.light, width: 1.0),
          ),
          initiallyExpanded: isExpanded,
          maintainState:
              true, // Maintient l'état pour éviter les reconstructions
          onExpansionChanged: (bool expanded) {
            setState(() {
              _expandedTiles[step] = expanded;
              if (expanded && _currentStep != step) {
                // Fermer les autres tiles
                for (int i = 2; i <= 6; i++) {
                  if (i != step) {
                    _expandedTiles[i] = false;
                  }
                }
                _currentStep = step;
              }
            });
          },
          controlAffinity: ListTileControlAffinity
              .trailing, // on assure que la flèche est bien gérée (compliquer à gérer avec SlidingExpansionTile)
          tilePadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
          title: Row(
            children: [
              if (info.emoji != null)
                Transform.translate(
                  offset: const Offset(-4, 0),
                  child: Container(
                    width: 24,
                    height: 30,
                    alignment: Alignment.centerLeft,
                    child: Text(
                      info.emoji!,
                      style: const TextStyle(fontSize: 20),
                    ),
                  ),
                )
              else if (info.icon != null)
                Icon(info.icon, color: AppColors.light, size: 24),
              const SizedBox(width: 8),
              Text(
                info.title,
                style: TextStyle(
                  color: AppColors.light,
                  fontWeight: FontWeight.normal,
                  fontSize: 16,
                ),
              ),
            ],
          ),
          children: [
            slideSmoothAnimation(
              child: Container(
                width: double.infinity,
                decoration: BoxDecoration(
                  color: AppColors.secondBackgroundColor,
                  borderRadius: const BorderRadius.only(
                    bottomLeft: Radius.circular(12),
                    bottomRight: Radius.circular(12),
                  ),
                  border: Border(
                    top: BorderSide(color: AppColors.blur, width: 1),
                  ),
                  boxShadow: [BoxShadow(color: AppColors.blur, blurRadius: 15)],
                ),
                padding: const EdgeInsets.all(16),
                child: _buildStepContent(step),
              ),
            ),
          ],
        ),
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
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(2),
                      ),
                    ),
                    onPressed: _nextStep,
                    child: const Text(
                      'Je suis utilisateur',
                      style: TextStyle(color: AppColors.light, fontSize: 10),
                    ),
                  ),
                ),
                const SizedBox(width: 50),
                Expanded(
                  child: ElevatedButton(
                    style: ElevatedButton.styleFrom(
                      backgroundColor: AppColors.fillButtonBackgorund,
                      padding: const EdgeInsets.symmetric(vertical: 12),
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(2),
                      ),
                    ),
                    onPressed: _nextStep,
                    child: const Text(
                      'Je suis un chauffeur',
                      style: TextStyle(color: AppColors.light, fontSize: 10),
                    ),
                  ),
                ),
              ],
            ),
          ],
        );

      case 2:
        return Column(
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            Text(
              'Bienvenue chez Safe Driving !',
              style: TextStyle(
                color: AppColors.buttonWithoutBackGround,
                fontWeight: FontWeight.w800,
                fontSize: 18,
              ),
            ),
            const SizedBox(height: 8),
            Text(
              'Merci d’avoir rejoint notre communauté ! Laissez-nous vous guider pour personnaliser votre expérience.',
              style: TextStyle(
                color: AppColors.buttonWithoutBackGround.withAlpha(190),
              ),
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
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(2),
                    ),
                  ),
                  onPressed: _nextStepImmediate,
                  child: Text(
                    'Plus tard',
                    style: TextStyle(color: AppColors.buttonWithoutBackGround),
                  ),
                ),
                ElevatedButton(
                  style: ElevatedButton.styleFrom(
                    backgroundColor: AppColors.fillButtonBackgorund,
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(2),
                    ),
                  ),
                  onPressed: _nextStepImmediate,
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
                fontWeight: FontWeight.w800,
                color: AppColors.buttonWithoutBackGround,
              ),
            ),
            const SizedBox(height: 8),
            Text(
              'Pour vous proposer les véhicules les plus proches, autorisez l\'accès à votre position. C\'est rapide et sécurisé.',
              style: TextStyle(
                color: AppColors.buttonWithoutBackGround.withAlpha(190),
              ),
            ),
            const SizedBox(height: 16),
            Row(
              children: [
                Expanded(
                  child: RadioListTile<bool>(
                    contentPadding: EdgeInsets.zero,
                    visualDensity: const VisualDensity(horizontal: -4),
                    title: Text(
                      'Plus tard',
                      style: TextStyle(
                        color: AppColors.buttonWithoutBackGround,
                        fontWeight: FontWeight.w600,
                      ),
                    ),
                    value: false,
                    groupValue: _appState.gpsEnabled,
                    activeColor: AppColors.buttonWithoutBackGround,
                    onChanged: (value) => _updateGps(value!),
                  ),
                ),
                Expanded(
                  child: RadioListTile<bool>(
                    contentPadding: EdgeInsets.zero,
                    visualDensity: const VisualDensity(horizontal: -4),
                    title: Text(
                      'Activer',
                      style: TextStyle(
                        color: AppColors.buttonWithoutBackGround,
                        fontWeight: FontWeight.w600,
                      ),
                    ),
                    value: true,
                    groupValue: _appState.gpsEnabled,
                    activeColor: AppColors.buttonWithoutBackGround,
                    onChanged: (value) => _updateGps(value!),
                  ),
                ),
              ],
            ),
            const SizedBox(height: 8),
            Center(
              child: ElevatedButton(
                style: ElevatedButton.styleFrom(
                  backgroundColor: AppColors.fillButtonBackgorund,
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(2),
                  ),
                ),
                onPressed: _nextStepImmediate,
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
                fontWeight: FontWeight.w800,
                color: AppColors.buttonWithoutBackGround,
              ),
            ),
            const SizedBox(height: 8),
            Text(
              'Choisissez de recevoir des alertes en temps réel sur l\'arrivée de votre chauffeur et l\'état de votre trajet.',
              style: TextStyle(
                color: AppColors.buttonWithoutBackGround.withAlpha(190),
              ),
            ),
            const SizedBox(height: 16),
            Row(
              children: [
                Expanded(
                  child: RadioListTile<bool>(
                    contentPadding: EdgeInsets.zero,
                    visualDensity: const VisualDensity(horizontal: -4),
                    title: Text(
                      'Plus tard',
                      style: TextStyle(
                        color: AppColors.buttonWithoutBackGround,
                        fontWeight: FontWeight.w600,
                      ),
                    ),
                    value: false,
                    groupValue: _appState.notifEnabled,
                    activeColor: AppColors.buttonWithoutBackGround,
                    onChanged: (value) => _updateNotifications(value!),
                  ),
                ),
                Expanded(
                  child: RadioListTile<bool>(
                    contentPadding: EdgeInsets.zero,
                    visualDensity: const VisualDensity(horizontal: -4),
                    title: Text(
                      'Activer',
                      style: TextStyle(
                        color: AppColors.buttonWithoutBackGround,
                        fontWeight: FontWeight.w600,
                      ),
                    ),
                    value: true,
                    groupValue: _appState.notifEnabled,
                    activeColor: AppColors.buttonWithoutBackGround,
                    onChanged: (value) => _updateNotifications(value!),
                  ),
                ),
              ],
            ),
            const SizedBox(height: 8),
            Center(
              child: ElevatedButton(
                style: ElevatedButton.styleFrom(
                  backgroundColor: AppColors.fillButtonBackgorund,
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(2),
                  ),
                ),
                onPressed: _nextStepImmediate,
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
                fontWeight: FontWeight.w800,
                color: AppColors.buttonWithoutBackGround,
              ),
            ),
            const SizedBox(height: 8),
            Text(
              'Sélectionnez vos modes de transport favoris et activez le thème sombre si vous préférez une expérience plus douce pour les yeux.',
              style: TextStyle(
                color: AppColors.buttonWithoutBackGround.withAlpha(190),
              ),
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
                  selected: _appState.selectedTheme == 'Clair',
                  onSelected: (_) => _updateTheme('Clair'),
                ),
                const SizedBox(width: 8),
                ChoiceChip(
                  label: const Text('Sombre'),
                  selected: _appState.selectedTheme == 'Sombre',
                  onSelected: (_) => _updateTheme('Sombre'),
                ),
              ],
            ),
            const SizedBox(height: 16),
            Text(
              'Type de transport',
              style: TextStyle(color: AppColors.buttonWithoutBackGround),
            ),
            const SizedBox(height: 8),
            Container(
              decoration: BoxDecoration(
                border: Border.all(
                  color: AppColors.fillButtonBackgorund.withValues(alpha: 0.3),
                  width: 1,
                ),
                borderRadius: BorderRadius.circular(8),
              ),
              padding: const EdgeInsets.all(8),
              child: Wrap(
                spacing: 8,
                children: _transportModes.map((mode) {
                  final isSelected = _appState.selectedTransports.contains(
                    mode,
                  );
                  return FilterChip(
                    avatar: Icon(_transportIcons[mode], size: 18),
                    label: Text(mode),
                    selected: isSelected,
                    onSelected: (selected) => _updateTransport(mode, selected),
                    selectedColor: AppColors.fillButtonBackgorund,
                    checkmarkColor: AppColors.light,
                  );
                }).toList(),
              ),
            ),
            const SizedBox(height: 24),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceAround,
              children: [
                OutlinedButton(
                  style: OutlinedButton.styleFrom(
                    backgroundColor: AppColors.secondBackgroundColor,
                    side: BorderSide(color: AppColors.buttonWithoutBackGround),
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(2),
                    ),
                  ),
                  onPressed: _nextStepImmediate,
                  child: Text(
                    'Plus tard',
                    style: TextStyle(color: AppColors.buttonWithoutBackGround),
                  ),
                ),
                ElevatedButton(
                  style: ElevatedButton.styleFrom(
                    backgroundColor: AppColors.fillButtonBackgorund,
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(2),
                    ),
                  ),
                  onPressed: _nextStepImmediate,
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
                fontWeight: FontWeight.w800,
                color: AppColors.buttonWithoutBackGround,
              ),
            ),
            const SizedBox(height: 8),
            Text(
              'Voilà un résumé de vos choix. Vous pouvez toujours les modifier plus tard dans les paramètres. Prêt·e à démarrer ?',
              style: TextStyle(
                color: AppColors.buttonWithoutBackGround.withAlpha(190),
              ),
            ),
            const SizedBox(height: 16),
            Row(
              children: [
                Switch(
                  value: _appState.gpsEnabled,
                  activeColor: AppColors.progress,
                  onChanged: _updateGps,
                ),
                const SizedBox(width: 8),
                const Text(
                  'GPS',
                  style: TextStyle(color: AppColors.buttonWithoutBackGround),
                ),
              ],
            ),
            Row(
              children: [
                Switch(
                  value: _appState.notifEnabled,
                  activeColor: AppColors.progress,
                  onChanged: _updateNotifications,
                ),
                const SizedBox(width: 8),
                const Text(
                  'Notifications',
                  style: TextStyle(color: AppColors.buttonWithoutBackGround),
                ),
              ],
            ),
            const SizedBox(height: 16),
            Text(
              'Thème : ${_appState.selectedTheme}',
              style: TextStyle(color: AppColors.buttonWithoutBackGround),
            ),
            const SizedBox(height: 8),
            Text(
              'Transport(s) :',
              style: TextStyle(color: AppColors.buttonWithoutBackGround),
            ),
            const SizedBox(height: 8),
            Container(
              decoration: BoxDecoration(
                border: Border.all(
                  color: AppColors.fillButtonBackgorund.withValues(alpha: 0.3),
                  width: 1,
                ),
                borderRadius: BorderRadius.circular(8),
              ),
              padding: const EdgeInsets.all(12),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  if (_appState.selectedTransports.isNotEmpty)
                    Wrap(
                      spacing: 8,
                      runSpacing: 4,
                      children: _appState.selectedTransports.map((transport) {
                        return Chip(
                          avatar: Icon(
                            _transportIcons[transport],
                            size: 16,
                            color: AppColors.buttonWithoutBackGround,
                          ),
                          label: Text(
                            transport,
                            style: TextStyle(
                              color: AppColors.buttonWithoutBackGround,
                              fontSize: 12,
                            ),
                          ),
                          deleteIcon: Icon(
                            Icons.close,
                            size: 18,
                            color: AppColors.buttonWithoutBackGround,
                          ),
                          onDeleted: () => _removeTransport(transport),
                          backgroundColor: AppColors.secondBackgroundColor,
                          side: BorderSide(
                            color: AppColors.fillButtonBackgorund.withValues(
                              alpha: 0.5,
                            ),
                            width: 1,
                          ),
                        );
                      }).toList(),
                    )
                  else
                    Text(
                      'Aucun transport sélectionné',
                      style: TextStyle(
                        color: AppColors.buttonWithoutBackGround.withValues(
                          alpha: 0.6,
                        ),
                        fontStyle: FontStyle.italic,
                      ),
                    ),
                ],
              ),
            ),
            const SizedBox(height: 16),
            Text(
              'Langue :',
              style: TextStyle(color: AppColors.buttonWithoutBackGround),
            ),
            const SizedBox(height: 8),
            Container(
              decoration: BoxDecoration(
                border: Border.all(
                  color: AppColors.fillButtonBackgorund.withValues(alpha: 0.3),
                  width: 1,
                ),
                borderRadius: BorderRadius.circular(8),
              ),
              padding: const EdgeInsets.all(12),
              child: Row(
                children: [
                  GestureDetector(
                    onTap: () => _updateLanguage('Français'),
                    child: Container(
                      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
                      decoration: BoxDecoration(
                        color: _appState.selectedLanguage == 'Français'
                            ? AppColors.fillButtonBackgorund
                            : Colors.transparent,
                        borderRadius: BorderRadius.circular(6),
                        border: Border.all(
                          color: _appState.selectedLanguage == 'Français'
                              ? AppColors.fillButtonBackgorund
                              : AppColors.buttonWithoutBackGround.withValues(alpha: 0.3),
                        ),
                      ),
                      child: Row(
                        mainAxisSize: MainAxisSize.min,
                        children: [
                          Text(
                            '🇫🇷',
                            style: TextStyle(fontSize: 16),
                          ),
                          const SizedBox(width: 6),
                          Text(
                            'Français',
                            style: TextStyle(
                              color: _appState.selectedLanguage == 'Français'
                                  ? AppColors.light
                                  : AppColors.buttonWithoutBackGround,
                              fontSize: 12,
                            ),
                          ),
                        ],
                      ),
                    ),
                  ),
                  const SizedBox(width: 12),
                  GestureDetector(
                    onTap: () => _updateLanguage('English'),
                    child: Container(
                      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
                      decoration: BoxDecoration(
                        color: _appState.selectedLanguage == 'English'
                            ? AppColors.fillButtonBackgorund
                            : Colors.transparent,
                        borderRadius: BorderRadius.circular(6),
                        border: Border.all(
                          color: _appState.selectedLanguage == 'English'
                              ? AppColors.fillButtonBackgorund
                              : AppColors.buttonWithoutBackGround.withValues(alpha: 0.3),
                        ),
                      ),
                      child: Row(
                        mainAxisSize: MainAxisSize.min,
                        children: [
                          Text(
                            '🇺🇸',
                            style: TextStyle(fontSize: 16),
                          ),
                          const SizedBox(width: 6),
                          Text(
                            'English',
                            style: TextStyle(
                              color: _appState.selectedLanguage == 'English'
                                  ? AppColors.light
                                  : AppColors.buttonWithoutBackGround,
                              fontSize: 12,
                            ),
                          ),
                        ],
                      ),
                    ),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 24),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceAround,
              children: [
                OutlinedButton(
                  style: OutlinedButton.styleFrom(
                    backgroundColor: AppColors.secondBackgroundColor,
                    side: BorderSide(color: AppColors.buttonWithoutBackGround),
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(2),
                    ),
                  ),
                  onPressed: () => _goToStep(1),
                  child: Text(
                    'Annuler',
                    style: TextStyle(color: AppColors.buttonWithoutBackGround),
                  ),
                ),
                ElevatedButton(
                  style: ElevatedButton.styleFrom(
                    backgroundColor: AppColors.fillButtonBackgorund,
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(2),
                    ),
                  ),
                  onPressed: () {
                    //finale (vers homeview)
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
