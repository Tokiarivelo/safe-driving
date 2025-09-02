import 'package:flutter/material.dart';
import '../base/base_form_widget.dart';
import 'package:safe_driving/core/utils/form/form_utils.dart';

class VehicleInfoForm extends BaseFormWidget {
  const VehicleInfoForm({
    super.key,
    required super.onDataChanged,
    super.initialData,
  });

  @override
  List<FormFieldConfig> get fieldConfigs => [
    DropdownFormFieldConfig<String>(
      key: 'vehicleType',
      label: 'Type de véhicule',
      options: const ['Voiture', 'Moto', 'Camion', 'Van', 'SUV', 'Autre'],
      displayText: (type) => type,
      validator: (value) {
        if (value == null || value.isEmpty) {
          return 'Veuillez sélectionner un type de véhicule';
        }
        return null;
      },
    ),
    TextFormFieldConfig(
      key: 'brand',
      label: 'Marque',
      validator: (value) {
        if (value == null || value.isEmpty) {
          return 'Veuillez entrer la marque du véhicule';
        }
        final message = RegexFormatter.getVehicleNameValidationMessage(value);
        return message.isEmpty ? null : message;
      },
    ),
    TextFormFieldConfig(
      key: 'model',
      label: 'Modèle',
      validator: (value) {
        if (value == null || value.isEmpty) {
          return 'Veuillez entrer le modèle du véhicule';
        }
        final message = RegexFormatter.getVehicleNameValidationMessage(value);
        return message.isEmpty ? null : message;
      },
    ),
    TextFormFieldConfig(
      key: 'year',
      label: 'Année',
      keyboardType: TextInputType.number,
      validator: (value) {
        if (value == null || value.isEmpty) {
          return 'Veuillez entrer l\'année du véhicule';
        }
        final year = int.tryParse(value);
        if (year == null || year < 1900 || year > DateTime.now().year + 1) {
          return 'Veuillez entrer une année valide';
        }
        return null;
      },
    ),
    TextFormFieldConfig(
      key: 'plateNumber',
      label: 'Numéro d\'immatriculation',
      validator: (value) {
        if (value == null || value.isEmpty) {
          return 'Veuillez entrer le numéro d\'immatriculation';
        }
        final message = RegexFormatter.getLicensePlateValidationMessage(value);
        return message.isEmpty ? null : message;
      },
    ),
    TextFormFieldConfig(
      key: 'color',
      label: 'Couleur',
      validator: (value) {
        if (value == null || value.isEmpty) {
          return 'Veuillez entrer la couleur du véhicule';
        }
        return null;
      },
    ),
  ];

  @override
  BaseFormWidgetState createState() => _VehicleInfoFormState();
}

class _VehicleInfoFormState extends BaseFormWidgetState<VehicleInfoForm> {
  bool get isValid => validate();
}
