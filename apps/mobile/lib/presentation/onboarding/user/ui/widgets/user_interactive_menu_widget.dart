import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:safe_driving/core/constants/colors/colors.dart';
import '../../models/user_onboarding_step_model.dart';
import '../../models/user_onboarding_data.dart';
import 'package:safe_driving/shared/widgets/customs/animations/animation_widget.dart';
import 'package:safe_driving/shared/widgets/customs/buttons/buttons_widget.dart';
import 'package:safe_driving/shared/widgets/customs/snackbar/snackbar_helper.dart';

class UserInteractiveMenuWidget extends StatefulWidget {
  const UserInteractiveMenuWidget({super.key});

  @override
  UserInteractiveMenuWidgetState createState() =>
      UserInteractiveMenuWidgetState();
}

class UserInteractiveMenuWidgetState extends State<UserInteractiveMenuWidget> {
  static const int _totalSteps = 4;

  int _currentStep = 0;
  AppState _appState = const AppState();
  final Map<int, bool> _expandedTiles = {};

  // Configuration des étapes
  static const List<StepInfo> _steps = UserOnboardingData.steps;
  static const List<String> _transportModes = UserOnboardingData.transportModes;
  static const Map<String, IconData> _transportIcons =
      UserOnboardingData.transportIcons;

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
      if (newStep > 1) {
        _expandedTiles[newStep] = true;
      }
    });
  }

  String _getStepTitle(int step) {
    return UserOnboardingData.stepTitles[step] ?? 'Étape $step';
  }

  void _updateGps(bool value, {bool shouldSave = true}) {
    setState(() {
      _appState = _appState.copyWith(gpsEnabled: value);
    });
    if (shouldSave && value) {}
  }

  void _updateNotifications(bool value, {bool shouldSave = true}) {
    setState(() {
      _appState = _appState.copyWith(notifEnabled: value);
    });
    if (shouldSave && value) {}
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

  void _completeOnboarding() {
    Navigator.pushReplacementNamed(context, '/home');

    SnackbarHelper.showSuccess(
      context,
      'Configuration terminée avec succès !',
      duration: const Duration(seconds: 2),
    );
  }

  @override
  Widget build(BuildContext context) {
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
                  style: const TextStyle(color: AppColors.light, fontSize: 16),
                ),
              ),
            ],
          ),
        ),

        Expanded(
          child: _currentStep == 1
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
            side: const BorderSide(color: AppColors.light, width: 1.0),
          ),
          collapsedShape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(12),
            side: const BorderSide(color: AppColors.light, width: 1.0),
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
                style: const TextStyle(
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
                child: _buildStepContent(step),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildStepContent(int step) {
    final stepContent = UserOnboardingData.getStepContent(step - 1);

    switch (step) {
      case 1:
        return Column(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Text(
              stepContent.title,
              style: const TextStyle(
                color: AppColors.buttonWithoutBackGround,
                fontSize: 20,
                fontWeight: FontWeight.w400,
              ),
            ),
            const SizedBox(height: 20),
            ButtonsWidget.roleChoiceButtons(
              onUserPressed: () => _nextStep(),
              onDriverPressed: () {
                Navigator.pushNamed(context, '/driver_onboarding');
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
              style: const TextStyle(
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
              style: const TextStyle(
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
                    onChanged: (value) => _updateGps(value!, shouldSave: false),
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
                        if (granted) {
                          SnackbarHelper.showSuccess(
                            context,
                            'Géolocalisation activée avec succès !',
                            duration: const Duration(seconds: 2),
                          );
                        }
                      } else {
                        _updateGps(false, shouldSave: false);
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
              UserOnboardingData.buttonTexts['later']!,
              UserOnboardingData.buttonTexts['activate']!,
            ];
        return Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              stepContent.title,
              style: const TextStyle(
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
                    onChanged: (value) =>
                        _updateNotifications(value!, shouldSave: false),
                  ),
                ),
                Expanded(
                  child: ButtonsWidget.customRadio<bool>(
                    title: radioOptions[1],
                    value: true,
                    groupValue: _appState.notifEnabled,
                    onChanged: (value) =>
                        _updateNotifications(value!, shouldSave: true),
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
              style: const TextStyle(
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
              style: const TextStyle(color: AppColors.buttonWithoutBackGround),
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
              style: const TextStyle(color: AppColors.buttonWithoutBackGround),
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
                _nextStepImmediate();
              },
              onActionPressed: () {
                if (_appState.selectedTransports.isEmpty) {
                  SnackbarHelper.showWarning(
                    context,
                    'Veuillez sélectionner au moins un mode de transport',
                    duration: const Duration(seconds: 2),
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
              style: const TextStyle(
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
              style: const TextStyle(color: AppColors.buttonWithoutBackGround),
            ),
            const SizedBox(height: 8),
            Text(
              '${summaryLabels['transport']} :',
              style: const TextStyle(color: AppColors.buttonWithoutBackGround),
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
                            style: const TextStyle(
                              color: AppColors.buttonWithoutBackGround,
                              fontSize: 12,
                            ),
                          ),
                          deleteIcon: const Icon(
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
              style: const TextStyle(color: AppColors.buttonWithoutBackGround),
            ),
            const SizedBox(height: 8),
            ButtonsWidget.languageButtonContainer(
              selectedLanguage: _appState.selectedLanguage,
              onLanguageChanged: _updateLanguage,
            ),
            const SizedBox(height: 24),
            ButtonsWidget.laterAndActionButtons(
              onLaterPressed: () {
                _goToStep(1);
              },
              onActionPressed: () {
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
