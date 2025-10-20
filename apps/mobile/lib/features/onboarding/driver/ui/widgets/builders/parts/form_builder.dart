import 'package:flutter/material.dart';
import 'package:safe_driving/core/constants/colors/colors.dart';
import 'package:safe_driving/features/onboarding/driver/viewmodels/driver_onboarding_coordinator.dart';
import 'package:safe_driving/shared/widgets/customs/inputs/inputs_widget.dart';
import 'package:safe_driving/core/utils/form/form_utils.dart';
import 'package:safe_driving/l10n/l10n.dart';
import 'package:provider/provider.dart';
import 'package:safe_driving/features/authentication/viewmodels/auth_view_model.dart';
import 'package:safe_driving/shared/state_management/service_locator.dart';
import 'package:safe_driving/features/authentication/services/session_service.dart';

class FormBuilder {
  static Widget buildForm(
    Map<String, String> formData,
    DriverOnboardingCoordinator coordinator,
  ) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        // Personal info form
        if (formData.containsKey('labelTextName'))
          ...buildPersonalInfoForm(formData, coordinator),

        // Vehicle info form
        if (formData.containsKey('labelMarque'))
          ...buildVehicleInfoForm(formData, coordinator),
      ],
    );
  }

  static List<Widget> buildPersonalInfoForm(
    Map<String, String> formData,
    DriverOnboardingCoordinator coordinator,
  ) {
    return [
      Builder(
        builder: (context) {
          _prefillPersonalInfo(context, coordinator);
          return CustomInputField(
            label: context.l10n.driverDetailsFullName,
            hint: context.l10n.driverDetailsFullNamePlaceholder,
            icon: Icons.person,
            showLabel: true,
            backgroundColor: AppColors.inputTextBackground,
            controller: coordinator.personalInfoViewModel.getController('name'),
            readOnly: true,
            enabled: false,
            validator: (value) =>
                RegexFormatter.getNameValidationMessage(value!),
          );
        },
      ),
      const SizedBox(height: 16),
      Builder(
        builder: (context) {
          _prefillPersonalInfo(context, coordinator);
          return CustomInputField(
            label: context.l10n.driverDetailsEmail,
            hint: context.l10n.driverDetailsEmailPlaceholder,
            icon: Icons.email,
            keyboardType: TextInputType.emailAddress,
            controller: coordinator.personalInfoViewModel.getController(
              'email',
            ),
            showLabel: true,
            backgroundColor: AppColors.inputTextBackground,
            readOnly: true,
            enabled: false,
          );
        },
      ),
      const SizedBox(height: 16),
      Builder(
        builder: (context) => CustomInputField(
          label: context.l10n.driverDetailsPhone,
          hint: context.l10n.driverDetailsPhonePlaceholder,
          icon: Icons.phone,
          keyboardType: TextInputType.phone,
          showLabel: true,
          controller: coordinator.personalInfoViewModel.getController('phone'),
          validator: (value) => value?.isEmpty == true
              ? null
              : (RegexFormatter.isValidMalagasyPhone(value!)
                    ? null
                    : RegexFormatter.getMalagasyPhoneValidationMessage(value)),
        ),
      ),
    ];
  }

  static void _prefillPersonalInfo(
    BuildContext context,
    DriverOnboardingCoordinator coordinator,
  ) {
    try {
      final nameCtrl = coordinator.personalInfoViewModel.getController('name');
      final emailCtrl = coordinator.personalInfoViewModel.getController(
        'email',
      );
      if (nameCtrl.text.trim().isNotEmpty && emailCtrl.text.trim().isNotEmpty) {
        return;
      }

      String? firstNameAuth;
      String? lastNameAuth;
      String? emailAuth;
      try {
        final auth = Provider.of<AuthViewModel>(context, listen: false);
        final user = auth.currentUser;
        if (user != null) {
          firstNameAuth = (user.firstName ?? '').trim();
          lastNameAuth = (user.lastName ?? '').trim();
          emailAuth = (user.email).trim();
        }
      } catch (_) {}

      // Gather from Session (signup cache)
      String? firstNameSess;
      String? lastNameSess;
      String? emailSess;
      try {
        final session = ServiceLocator.instance.get<SessionService>();
        firstNameSess = (session.lastSignupFirstName ?? '').trim();
        lastNameSess = (session.lastSignupLastName ?? '').trim();
        emailSess = (session.lastSignupEmail ?? '').trim();
      } catch (_) {}

      // Merge with preference: Auth values first, else Session
      final firstName = (firstNameAuth != null && firstNameAuth.isNotEmpty)
          ? firstNameAuth
          : (firstNameSess ?? '');
      final lastNameRaw = (lastNameAuth != null && lastNameAuth.isNotEmpty)
          ? lastNameAuth
          : (lastNameSess ?? '');
      // Treat various "Non spécifié" forms as empty
      final lastName =
          (lastNameRaw.toLowerCase().replaceAll('é', 'e') == 'non specifie')
          ? (lastNameSess ?? '')
          : lastNameRaw;
      final email = (emailAuth != null && emailAuth.isNotEmpty)
          ? emailAuth
          : (emailSess ?? '');

      final composedName = () {
        final f = (firstName).trim();
        final l = (lastName).trim();
        if (f.isNotEmpty && l.isNotEmpty) return '$f $l';
        if (f.isNotEmpty) return f;
        return (email).trim();
      }();

      if (nameCtrl.text.trim().isEmpty && composedName.isNotEmpty) {
        // Set controller text only; avoid notifying during build
        nameCtrl.text = composedName;
      }
      if (emailCtrl.text.trim().isEmpty && email.isNotEmpty) {
        // Set controller text only; avoid notifying during build
        emailCtrl.text = email;
      }
    } catch (_) {}
  }

  static List<Widget> buildVehicleInfoForm(
    Map<String, String> formData,
    DriverOnboardingCoordinator coordinator,
  ) {
    return [
      Builder(
        builder: (context) => CustomInputField(
          label: context.l10n.driverVehicleBrand,
          hint: context.l10n.driverVehicleBrandPlaceholder,
          icon: Icons.car_rental,
          showLabel: true,
          controller: coordinator.vehicleInfoViewModel.getController('marque'),
          validator: (value) =>
              RegexFormatter.getVehicleNameValidationMessage(value!),
        ),
      ),
      const SizedBox(height: 16),
      Builder(
        builder: (context) => CustomInputField(
          label: context.l10n.driverVehicleModel,
          hint: context.l10n.driverVehicleModelPlaceholder,
          icon: Icons.directions_car,
          showLabel: true,
          controller: coordinator.vehicleInfoViewModel.getController('modele'),
          validator: (value) =>
              RegexFormatter.getVehicleNameValidationMessage(value!),
        ),
      ),
      const SizedBox(height: 16),
      Builder(
        builder: (context) => CustomInputField(
          label: context.l10n.driverVehicleRegistration,
          hint: context.l10n.driverVehicleRegistrationPlaceholder,
          icon: Icons.confirmation_number,
          showLabel: true,
          controller: coordinator.vehicleInfoViewModel.getController(
            'immatriculation',
          ),
          validator: (value) =>
              RegexFormatter.getLicensePlateValidationMessage(value!),
        ),
      ),
      const SizedBox(height: 16),
      Builder(
        builder: (context) => CustomInputField(
          label: context.l10n.driverVehicleSeats,
          hint: context.l10n.driverVehicleSeatsPlaceholder,
          icon: Icons.airline_seat_recline_normal,
          keyboardType: TextInputType.number,
          showLabel: true,
          controller: coordinator.vehicleInfoViewModel.getController('places'),
          validator: (value) =>
              RegexFormatter.getSeatCountValidationMessage(value!),
        ),
      ),
      const SizedBox(height: 16),
      Builder(
        builder: (context) {
          final options = <String>['Voiture', 'Moto', 'TukTuk'];
          return Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                context.l10n.driverVehicleType,
                style: TextStyle(
                  fontSize: 14,
                  fontWeight: FontWeight.w600,
                  color: Theme.of(context).colorScheme.onSurface,
                ),
              ),
              const SizedBox(height: 6),
              InputDecorator(
                decoration: InputDecoration(
                  isDense: true,
                  contentPadding: const EdgeInsets.symmetric(
                    horizontal: 12,
                    vertical: 8,
                  ),
                  filled: true,
                  fillColor: AppColors.inputTextBackground.adapt(context),
                  border: OutlineInputBorder(
                    borderSide: BorderSide(
                      color: Theme.of(context).brightness == Brightness.dark
                          ? AppColors.light.withValues(alpha: 0.2)
                          : AppColors.borderInputField,
                      width: 1,
                    ),
                    borderRadius: BorderRadius.circular(5),
                  ),
                  enabledBorder: OutlineInputBorder(
                    borderSide: BorderSide(
                      color: Theme.of(context).brightness == Brightness.dark
                          ? AppColors.light.withValues(alpha: 0.2)
                          : AppColors.borderInputField,
                      width: 1,
                    ),
                    borderRadius: BorderRadius.circular(5),
                  ),
                  focusedBorder: OutlineInputBorder(
                    borderSide: BorderSide(
                      color: Theme.of(context).brightness == Brightness.dark
                          ? AppColors.light.withValues(alpha: 0.4)
                          : AppColors.borderInputField,
                      width: 2,
                    ),
                    borderRadius: BorderRadius.circular(5),
                  ),
                ),
                child: DropdownButtonHideUnderline(
                  child: DropdownButton<String>(
                    isExpanded: true,
                    hint: Text(context.l10n.driverVehicleTypePlaceholder),
                    value: () {
                      final v = coordinator.vehicleInfoViewModel
                          .getController('typeVehicule')
                          .text
                          .trim();
                      return v.isEmpty ? null : v;
                    }(),
                    items: options
                        .map(
                          (e) => DropdownMenuItem<String>(
                            value: e,
                            child: Text(e),
                          ),
                        )
                        .toList(),
                    onChanged: (val) {
                      final text = val ?? '';
                      final ctrl = coordinator.vehicleInfoViewModel
                          .getController('typeVehicule');
                      if (ctrl.text != text) {
                        ctrl.text = text;
                        coordinator.vehicleInfoViewModel.updateFormField(
                          'typeVehicule',
                          text,
                        );
                      }
                    },
                  ),
                ),
              ),
            ],
          );
        },
      ),
    ];
  }
}
