import 'package:flutter/material.dart';
import '../models/user_onboarding_step_model.dart';

class UserOnboardingData {
  static const int totalSteps = 6;
  
  static List<UserOnboardingStepModel> getUserSteps() {
    return [
      // Step 1: Role Selection
      UserOnboardingStepModel(
        stepNumber: 1,
        title: 'Vous êtes… ?',
        subtitle: '',
        stepType: UserStepType.role,
        buttonTitles: ['Utilisateur', 'Chauffeur'],
      ),
      
      // Step 2: Welcome
      UserOnboardingStepModel(
        stepNumber: 2,
        title: 'Bienvenue chez Safe Driving !',
        subtitle: 'Merci d\'avoir rejoint notre communauté ! Laissez-nous vous guider pour personnaliser votre expérience.',
        stepType: UserStepType.welcome,
        buttonTitles: ['Plus tard', 'Démarrer'],
      ),
      
      // Step 3: Location/GPS
      UserOnboardingStepModel(
        stepNumber: 3,
        title: 'Où êtes-vous ?',
        subtitle: 'Pour vous proposer les véhicules les plus proches, autorisez l\'accès à votre position. C\'est rapide et sécurisé.',
        stepType: UserStepType.location,
        buttonTitles: ['Plus tard', 'Activer'],
        additionalContent: {
          'radioOptions': ['Plus tard', 'Activer'],
        },
      ),
      
      // Step 4: Notifications
      UserOnboardingStepModel(
        stepNumber: 4,
        title: 'Restez informé',
        subtitle: 'Choisissez de recevoir des alertes en temps réel sur l\'arrivée de votre chauffeur et l\'état de votre trajet.',
        stepType: UserStepType.notifications,
        buttonTitles: ['Plus tard', 'Activer'],
        additionalContent: {
          'radioOptions': ['Plus tard', 'Activer'],
        },
      ),
      
      // Step 5: Preferences
      UserOnboardingStepModel(
        stepNumber: 5,
        title: 'Faites-le à votre façon',
        subtitle: 'Sélectionnez vos modes de transport favoris et activez le thème sombre si vous préférez une expérience plus douce pour les yeux.',
        stepType: UserStepType.preferences,
        buttonTitles: ['Plus tard', 'Valider'],
        additionalContent: {
          'themeLabel': 'Thème',
          'themeOptions': ['Clair', 'Sombre'],
          'transportLabel': 'Type de transport',
          'transportModes': ['Voiture', 'Moto', 'TukTuk', 'Vélo'],
        },
      ),
      
      // Step 6: Summary
      UserOnboardingStepModel(
        stepNumber: 6,
        title: 'Tout est prêt !',
        subtitle: 'Voilà un résumé de vos choix. Vous pouvez toujours les modifier plus tard dans les paramètres. Prêt·e à démarrer ?',
        stepType: UserStepType.summary,
        buttonTitles: ['Annuler', 'Commencer'],
        additionalContent: {
          'summaryLabels': {
            'gps': 'GPS',
            'notifications': 'Notifications',
            'theme': 'Thème',
            'transport': 'Transport(s)',
            'language': 'Langue',
            'noTransport': 'Aucun transport sélectionné',
          },
        },
      ),
    ];
  }
  
  static const List<StepInfo> steps = [
    StepInfo(title: 'Bienvenue', emoji: '👋'),
    StepInfo(title: 'GPS', icon: Icons.location_on),
    StepInfo(title: 'Notifications', icon: Icons.notifications),
    StepInfo(title: 'Préférence', icon: Icons.settings),
    StepInfo(title: 'Récapitulatif', icon: Icons.recent_actors),
  ];
  
  static const Map<int, String> stepTitles = {
    1: 'Rôle',
    2: 'Bienvenue',
    3: 'GPS',
    4: 'Notifications',
    5: 'Préférences',
    6: 'Récapitulatif',
  };
  
  static const List<String> transportModes = [
    'Voiture',
    'Moto',
    'TukTuk',
    'Vélo',
  ];
  
  static const Map<String, IconData> transportIcons = {
    'Voiture': Icons.directions_car,
    'Moto': Icons.motorcycle,
    'TukTuk': Icons.electric_rickshaw,
    'Vélo': Icons.pedal_bike,
  };
  
  static const Map<String, String> buttonTexts = {
    'later': 'Plus tard',
    'activate': 'Activer',
    'start': 'Démarrer',
    'validate': 'Valider',
    'next': 'Suivant',
    'cancel': 'Annuler',
    'begin': 'Commencer',
  };
  
  static String getStepTitle(int step) {
    return stepTitles[step] ?? 'Étape $step';
  }
  
  static UserOnboardingStepModel getStep(int index) {
    final steps = getUserSteps();
    if (index >= 0 && index < steps.length) {
      return steps[index];
    }
    return steps[0];
  }
  
  static int getStepIndexByType(UserStepType type) {
    final steps = getUserSteps();
    for (int i = 0; i < steps.length; i++) {
      if (steps[i].stepType == type) {
        return i;
      }
    }
    return 0;
  }
  
  static bool isValidStep(int step) {
    return step >= 1 && step <= totalSteps;
  }
  
  static bool isLastStep(int currentStep) {
    return currentStep >= totalSteps - 1;
  }
  
  static double getProgress(int currentStep) {
    return (currentStep + 1) / totalSteps;
  }
  
  static UserOnboardingStepModel getStepContent(int index) {
    final steps = getUserSteps();
    if (index >= 0 && index < steps.length) {
      return steps[index];
    }
    return steps[0];
  }
}
