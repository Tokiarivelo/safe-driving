import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:safe_driving/core/constants/colors/colors.dart';
import 'package:safe_driving/models/interactive_menu/interactive_menu_models.dart';
import 'package:safe_driving/shared/widgets/customs/animations/animation_widget.dart';
import 'package:safe_driving/shared/widgets/customs/buttons/buttons_widget.dart';
import 'package:safe_driving/shared/widgets/interactive_menus/driver_interactive_menu_widget.dart';

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

  // Configuration des étapes (utilisation de StepUserData)
  static const List<StepInfo> _steps = StepUserDataText.steps;
  static const List<String> _transportModes = StepUserDataText.transportModes;
  static const Map<String, IconData> _transportIcons =
      StepUserDataText.transportIcons;

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
    return StepUserDataText.stepTitles[step] ?? 'Étape $step';
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

  // Méthode pour finaliser le processus d'onboarding
  void _completeOnboarding() {
    //rehefa vita
    Navigator.pushReplacementNamed(context, '/home'); // ou AppRoutes.home

    // Optionnel: Afficher un message de succès
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(
        content: Text('Configuration terminée avec succès !'),
        backgroundColor: AppColors.snackbarSuccess,
        duration: Duration(seconds: 2),
      ),
    );
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
          key: ValueKey('expansion_tile_${step}_$isExpanded'),
          backgroundColor: AppColors.transparent,
          collapsedBackgroundColor: AppColors.transparent,
          iconColor: AppColors.light,
          collapsedIconColor: AppColors.light,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(12),
            side: BorderSide(color: AppColors.light, width: 1.0),
          ),
          collapsedShape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(12),
            side: BorderSide(color: AppColors.light, width: 1.0),
          ),
          initiallyExpanded: isExpanded,
          maintainState: true,
          onExpansionChanged: (bool expanded) {
            setState(() {
              _expandedTiles[step] = expanded;
              if (expanded && _currentStep != step) {
                for (int i = 2; i <= 6; i++) {
                  if (i != step) {
                    _expandedTiles[i] = false;
                  }
                }
                _currentStep = step;
              }
            });
          },
          controlAffinity: ListTileControlAffinity.trailing,
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
                    top: BorderSide(color: AppColors.light, width: 1),
                  ),
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
    // Obtenir les données de l'étape depuis StepUserDatatext
    final stepContent = StepUserDataText.stepContents[step - 1];

    switch (step) {
      case 1:
        return Column(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Text(
              stepContent.title,
              style: TextStyle(
                color: AppColors.buttonWithoutBackGround,
                fontSize: 20,
                fontWeight: FontWeight.w400,
              ),
            ),
            const SizedBox(height: 20),
            ButtonsWidget.roleChoiceButtons(
              onUserPressed: () => _nextStep(),
              onDriverPressed: () {
                Navigator.of(context).push(
                  PageRouteBuilder(
                    pageBuilder: (context, animation, secondaryAnimation) =>
                        const DriverInteractiveMenuWidget(),
                    transitionsBuilder:
                        (context, animation, secondaryAnimation, child) {
                          return RouteSlideTransition(
                            animation: animation,
                            direction: SlideDirection.fromRight,
                            child: child,
                          );
                        },
                    transitionDuration: const Duration(milliseconds: 600),
                  ),
                );
              },
            ),
          ],
        );

      case 2:
        return Column(
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            Text(
              stepContent.title,
              style: TextStyle(
                color: AppColors.buttonWithoutBackGround,
                fontWeight: FontWeight.w800,
                fontSize: 18,
              ),
            ),
            const SizedBox(height: 8),
            Text(
              stepContent.subtitle,
              style: TextStyle(
                color: AppColors.buttonWithoutBackGround.withValues(
                  alpha: 0.75,
                ),
              ),
              textAlign: TextAlign.center,
            ),
            const SizedBox(height: 16),
            ButtonsWidget.laterAndActionButtons(
              onLaterPressed: () {
                _nextStepImmediate();
              },
              onActionPressed: () {
                _nextStepImmediate();
              },
              actionText: stepContent.buttonTitles[1],
              fontSize: 14,
              padding: const EdgeInsets.symmetric(vertical: 16),
            ),
          ],
        );

      case 3:
        final radioOptions =
            stepContent.additionalContent?['radioOptions'] ??
            ['Plus tard', 'Activer'];
        return Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              stepContent.title,
              style: TextStyle(
                fontSize: 20,
                fontWeight: FontWeight.w800,
                color: AppColors.buttonWithoutBackGround,
              ),
            ),
            const SizedBox(height: 8),
            Text(
              stepContent.subtitle,
              style: TextStyle(
                color: AppColors.buttonWithoutBackGround.withValues(
                  alpha: 0.75,
                ),
              ),
            ),
            const SizedBox(height: 16),
            Row(
              children: [
                Expanded(
                  child: ButtonsWidget.customRadio<bool>(
                    title: radioOptions[0],
                    value: false,
                    groupValue: _appState.gpsEnabled,
                    onChanged: (value) => _updateGps(value!),
                  ),
                ),
                Expanded(
                  child: ButtonsWidget.customRadio<bool>(
                    title: radioOptions[1],
                    value: true,
                    groupValue: _appState.gpsEnabled,
                    onChanged: (value) async {
                      if (value!) {
                        final granted = await ButtonsWidget.handleGpsPermission(
                          context,
                        );
                        if (!mounted) return;
                        _updateGps(granted);
                        if (granted) {
                          ScaffoldMessenger.of(context).showSnackBar(
                            const SnackBar(
                              content: Text(
                                'Géolocalisation activée avec succès !',
                              ),
                              backgroundColor: AppColors.snackbarSuccess,
                              duration: Duration(seconds: 2),
                            ),
                          );
                        }
                      } else {
                        _updateGps(false);
                      }
                    },
                  ),
                ),
              ],
            ),
            const SizedBox(height: 8),
            ButtonsWidget.nextButton(
              onPressed: () {
                _nextStepImmediate();
              },
              fontSize: 14,
              padding: const EdgeInsets.symmetric(vertical: 12, horizontal: 24),
            ),
          ],
        );

      case 4:
        final radioOptions =
            stepContent.additionalContent?['radioOptions'] ??
            [
              StepUserDataText.buttonTexts['later']!,
              StepUserDataText.buttonTexts['activate']!,
            ];
        return Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              stepContent.title,
              style: TextStyle(
                fontSize: 20,
                fontWeight: FontWeight.w800,
                color: AppColors.buttonWithoutBackGround,
              ),
            ),
            const SizedBox(height: 8),
            Text(
              stepContent.subtitle,
              style: TextStyle(
                color: AppColors.buttonWithoutBackGround.withValues(
                  alpha: 0.75,
                ),
              ),
            ),
            const SizedBox(height: 16),
            Row(
              children: [
                Expanded(
                  child: ButtonsWidget.customRadio<bool>(
                    title: radioOptions[0],
                    value: false,
                    groupValue: _appState.notifEnabled,
                    onChanged: (value) => _updateNotifications(value!),
                  ),
                ),
                Expanded(
                  child: ButtonsWidget.customRadio<bool>(
                    title: radioOptions[1],
                    value: true,
                    groupValue: _appState.notifEnabled,
                    onChanged: (value) => _updateNotifications(value!),
                  ),
                ),
              ],
            ),
            const SizedBox(height: 8),
            ButtonsWidget.nextButton(
              onPressed: () {
                _nextStepImmediate();
              },
              fontSize: 14,
              padding: const EdgeInsets.symmetric(vertical: 12, horizontal: 24),
            ),
          ],
        );

      case 5:
        final themeLabel = stepContent.additionalContent?['themeLabel'];
        final themeOptions = stepContent.additionalContent?['themeOptions'];
        final transportLabel = stepContent.additionalContent?['transportLabel'];
        return Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              stepContent.title,
              style: TextStyle(
                fontSize: 20,
                fontWeight: FontWeight.w800,
                color: AppColors.buttonWithoutBackGround,
              ),
            ),
            const SizedBox(height: 8),
            Text(
              stepContent.subtitle,
              style: TextStyle(
                color: AppColors.buttonWithoutBackGround.withValues(
                  alpha: 0.75,
                ),
              ),
            ),
            const SizedBox(height: 16),
            Text(
              themeLabel,
              style: TextStyle(color: AppColors.buttonWithoutBackGround),
            ),
            Row(
              children: [
                ButtonsWidget.customChoiceChip(
                  label: themeOptions[0],
                  selected: _appState.selectedTheme == themeOptions[0],
                  onSelected: (_) => _updateTheme(themeOptions[0]),
                ),
                const SizedBox(width: 8),
                ButtonsWidget.customChoiceChip(
                  label: themeOptions[1],
                  selected: _appState.selectedTheme == themeOptions[1],
                  onSelected: (_) => _updateTheme(themeOptions[1]),
                ),
              ],
            ),
            const SizedBox(height: 16),
            Text(
              transportLabel,
              style: TextStyle(color: AppColors.buttonWithoutBackGround),
            ),
            const SizedBox(height: 8),
            Container(
              decoration: BoxDecoration(
                border: Border.all(
                  color: AppColors.fillButtonBackground.withValues(alpha: 0.3),
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
                    selectedColor: AppColors.fillButtonBackground,
                    checkmarkColor: AppColors.light,
                  );
                }).toList(),
              ),
            ),
            const SizedBox(height: 24),
            ButtonsWidget.laterAndActionButtons(
              onLaterPressed: () {
                // "Plus tard" - garder les paramètres par défaut et continuer
                _nextStepImmediate();
              },
              onActionPressed: () {
                // "Valider" - sauvegarder les préférences et continuer
                if (_appState.selectedTransports.isEmpty) {
                  // Optionnel: Afficher un message ou forcer la sélection d'au moins un transport
                  ScaffoldMessenger.of(context).showSnackBar(
                    const SnackBar(
                      content: Text(
                        'Veuillez sélectionner au moins un mode de transport',
                      ),
                      duration: Duration(seconds: 2),
                    ),
                  );
                  return;
                }
                _nextStepImmediate();
              },
              actionText: stepContent.buttonTitles[1],
              fontSize: 14,
              padding: const EdgeInsets.symmetric(vertical: 16),
            ),
          ],
        );

      case 6:
        final summaryLabels = stepContent.additionalContent?['summaryLabels'];
        return Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              stepContent.title,
              style: TextStyle(
                fontSize: 20,
                fontWeight: FontWeight.w800,
                color: AppColors.buttonWithoutBackGround,
              ),
            ),
            const SizedBox(height: 8),
            Text(
              stepContent.subtitle,
              style: TextStyle(
                color: AppColors.buttonWithoutBackGround.withValues(
                  alpha: 0.75,
                ),
              ),
            ),
            const SizedBox(height: 16),
            Row(
              children: [
                ButtonsWidget.customSwitch(
                  value: _appState.gpsEnabled,
                  onChanged: _updateGps,
                ),
                const SizedBox(width: 8),
                Text(
                  summaryLabels['gps'],
                  style: const TextStyle(
                    color: AppColors.buttonWithoutBackGround,
                  ),
                ),
              ],
            ),
            Row(
              children: [
                ButtonsWidget.customSwitch(
                  value: _appState.notifEnabled,
                  onChanged: _updateNotifications,
                ),
                const SizedBox(width: 8),
                Text(
                  summaryLabels['notifications'],
                  style: const TextStyle(
                    color: AppColors.buttonWithoutBackGround,
                  ),
                ),
              ],
            ),
            const SizedBox(height: 16),
            Text(
              '${summaryLabels['theme']} : ${_appState.selectedTheme}',
              style: TextStyle(color: AppColors.buttonWithoutBackGround),
            ),
            const SizedBox(height: 8),
            Text(
              '${summaryLabels['transport']} :',
              style: TextStyle(color: AppColors.buttonWithoutBackGround),
            ),
            const SizedBox(height: 8),
            Container(
              decoration: BoxDecoration(
                border: Border.all(
                  color: AppColors.fillButtonBackground.withValues(alpha: 0.3),
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
                            color: AppColors.fillButtonBackground.withValues(
                              alpha: 0.5,
                            ),
                            width: 1,
                          ),
                        );
                      }).toList(),
                    )
                  else
                    Text(
                      summaryLabels['noTransport'],
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
              '${summaryLabels['language']} :',
              style: TextStyle(color: AppColors.buttonWithoutBackGround),
            ),
            const SizedBox(height: 8),
            ButtonsWidget.languageButtonContainer(
              selectedLanguage: _appState.selectedLanguage,
              onLanguageChanged: _updateLanguage,
            ),
            const SizedBox(height: 24),
            ButtonsWidget.laterAndActionButtons(
              onLaterPressed: () {
                // "Annuler" - retourner au début
                _goToStep(1);
              },
              onActionPressed: () {
                // "Commencer" - finaliser la configuration et naviguer vers l'écran principal
                _completeOnboarding();
              },
              laterText: stepContent.buttonTitles[0],
              actionText: stepContent.buttonTitles[1],
              fontSize: 14,
              padding: const EdgeInsets.symmetric(vertical: 16),
            ),
          ],
        );

      default:
        return const SizedBox.shrink();
    }
  }
}
