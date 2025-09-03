import 'package:flutter/material.dart';
import 'package:safe_driving/features/onboarding/driver/models/driver_onboarding_step_model.dart';
import 'package:safe_driving/features/onboarding/driver/viewmodels/driver_onboarding_coordinator.dart';
import 'form_builder.dart';
import 'document_builder.dart';
import 'camera_builder.dart';
import 'preferences_builder.dart';
import 'summary_builder.dart';
import 'button_builder.dart';

class ContentBuilder {
  static Widget buildAdditionalContent(
    Map<String, dynamic> content,
    DriverOnboardingStepModel step,
    DriverOnboardingCoordinator coordinator,
    Function(int) navigateToStep,
    BuildContext context,
  ) {
    // Form content
    if (content.containsKey('form')) {
      return FormBuilder.buildForm(
        content['form'] as Map<String, String>,
        coordinator,
      );
    }

    // Identity documents
    if (content.containsKey('carteIdentité')) {
      final carteIdentiteData =
          content['carteIdentité'] as Map<String, dynamic>;
      return DocumentBuilder.buildIdentityDocuments(
        carteIdentiteData,
        coordinator,
        context,
      );
    }

    // Vehicle documents
    if (content.containsKey('documents')) {
      final documentsData = content['documents'] as Map<String, dynamic>;
      return DocumentBuilder.buildVehicleDocuments(
        documentsData,
        coordinator,
        context,
      );
    }

    // Selfie camera
    if (content.containsKey('selfie')) {
      final selfieData = content['selfie'] as Map<String, dynamic>;
      return CameraBuilder.buildSelfieCamera(selfieData, coordinator, context);
    }

    // Notifications checkboxes
    if (content.containsKey('checkboxOptions')) {
      final checkboxOptions = content['checkboxOptions'] as List<String>;
      if (step.title == "Restez informé") {
        return PreferencesBuilder.buildNotificationsCheckboxes(
          checkboxOptions,
          coordinator,
        );
      }
      if (step.title == "Un dernier point avant de démarrer") {
        return ButtonBuilder.buildLegalCheckboxes(
          checkboxOptions,
          coordinator,
          context,
        );
      }
    }

    // Theme and language preferences
    if (content.containsKey('theme')) {
      return PreferencesBuilder.buildPreferences(content, coordinator);
    }

    // Summary
    if (content.containsKey('resume')) {
      final resumeData = content['resume'] as List;
      return SummaryBuilder.buildSummary(
        resumeData,
        coordinator,
        navigateToStep,
        context,
      );
    }

    // Completion QR code
    if (content.containsKey('subsubtitle') ||
        content.containsKey('instructions') ||
        content.containsKey('messageConfiance')) {
      return SummaryBuilder.buildCompletionContent(content);
    }

    // Legal content (CGU/Privacy Policy)
    if (content.containsKey('content')) {
      return const SizedBox.shrink(); // Content will be shown in modal
    }

    return const SizedBox.shrink();
  }
}
