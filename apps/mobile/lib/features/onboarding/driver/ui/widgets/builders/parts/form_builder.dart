import 'package:flutter/material.dart';
import 'package:safe_driving/core/constants/colors/colors.dart';
import 'package:safe_driving/features/onboarding/driver/viewmodels/driver_onboarding_coordinator.dart';
import 'package:safe_driving/shared/widgets/customs/inputs/inputs_widget.dart';
import 'package:safe_driving/core/utils/form/form_utils.dart';

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
      CustomInputField(
        label: formData['labelTextName'],
        hint: formData['placeholderName']!,
        icon: Icons.person,
        showLabel: true,
        backgroundColor: AppColors.inputTextBackground,
        controller: coordinator.personalInfoViewModel.getController('name'),
        readOnly: true,
        enabled: false,
        validator: (value) => RegexFormatter.getNameValidationMessage(value!),
      ),
      const SizedBox(height: 16),
      CustomInputField(
        label: formData['labelTextEmail'],
        hint: formData['placeholderEmail']!,
        icon: Icons.email,
        keyboardType: TextInputType.emailAddress,
        controller: coordinator.personalInfoViewModel.getController('email'),
        showLabel: true,
        backgroundColor: AppColors.inputTextBackground,
        readOnly: true,
        enabled: false,
      ),
      const SizedBox(height: 16),
      CustomInputField(
        label: formData['labelTextPhone'],
        hint: formData['placeholderPhone']!,
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
    ];
  }

  static List<Widget> buildVehicleInfoForm(
    Map<String, String> formData,
    DriverOnboardingCoordinator coordinator,
  ) {
    return [
      CustomInputField(
        label: formData['labelMarque'],
        hint: formData['placeholderMarque']!,
        icon: Icons.car_rental,
        showLabel: true,
        controller: coordinator.vehicleInfoViewModel.getController('marque'),
        validator: (value) =>
            RegexFormatter.getVehicleNameValidationMessage(value!),
      ),
      const SizedBox(height: 16),
      CustomInputField(
        label: formData['labelModele'],
        hint: formData['placeholderModele']!,
        icon: Icons.directions_car,
        showLabel: true,
        controller: coordinator.vehicleInfoViewModel.getController('modele'),
        validator: (value) =>
            RegexFormatter.getVehicleNameValidationMessage(value!),
      ),
      const SizedBox(height: 16),
      CustomInputField(
        label: formData['labelImmatriculation'],
        hint: formData['placeholderImmatriculation']!,
        icon: Icons.confirmation_number,
        showLabel: true,
        controller: coordinator.vehicleInfoViewModel.getController(
          'immatriculation',
        ),
        validator: (value) =>
            RegexFormatter.getLicensePlateValidationMessage(value!),
      ),
      const SizedBox(height: 16),
      CustomInputField(
        label: formData['labelPlaces'],
        hint: formData['placeholderPlaces']!,
        icon: Icons.airline_seat_recline_normal,
        keyboardType: TextInputType.number,
        showLabel: true,
        controller: coordinator.vehicleInfoViewModel.getController('places'),
        validator: (value) =>
            RegexFormatter.getSeatCountValidationMessage(value!),
      ),
      const SizedBox(height: 16),
      CustomInputField(
        label: formData['labelTypeVehicule'],
        hint: formData['placeholderTypeVehicule']!,
        icon: Icons.local_taxi,
        showLabel: true,
        controller: coordinator.vehicleInfoViewModel.getController(
          'typeVehicule',
        ),
      ),
    ];
  }
}
