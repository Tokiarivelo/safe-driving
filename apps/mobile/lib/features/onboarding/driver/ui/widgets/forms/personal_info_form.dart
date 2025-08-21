import 'package:flutter/material.dart';
import '../base/base_form_widget.dart';
import 'package:safe_driving/core/utils/form/form_utils.dart';

class PersonalInfoForm extends BaseFormWidget {
  const PersonalInfoForm({
    super.key,
    required super.onDataChanged,
    super.initialData,
  });

  @override
  List<FormFieldConfig> get fieldConfigs => [
    TextFormFieldConfig(
      key: 'firstName',
      label: 'Prénom',
      validator: (value) {
        if (value == null || value.isEmpty) {
          return 'Veuillez entrer votre prénom';
        }
        final message = RegexFormatter.getNameValidationMessage(value);
        return message.isEmpty ? null : message;
      },
    ),
    TextFormFieldConfig(
      key: 'lastName',
      label: 'Nom',
      validator: (value) {
        if (value == null || value.isEmpty) {
          return 'Veuillez entrer votre nom';
        }
        final message = RegexFormatter.getNameValidationMessage(value);
        return message.isEmpty ? null : message;
      },
    ),
    TextFormFieldConfig(
      key: 'email',
      label: 'Email',
      keyboardType: TextInputType.emailAddress,
      validator: (value) {
        if (value == null || value.isEmpty) {
          return 'Veuillez entrer votre email';
        }
        final message = RegexFormatter.getEmailValidationMessage(value);
        return message.isEmpty ? null : message;
      },
    ),
    TextFormFieldConfig(
      key: 'phone',
      label: 'Téléphone',
      keyboardType: TextInputType.phone,
      validator: (value) {
        if (value == null || value.isEmpty) {
          return 'Veuillez entrer votre numéro de téléphone';
        }
        final message = RegexFormatter.getMalagasyPhoneValidationMessage(value);
        return message.isEmpty ? null : message;
      },
    ),
    TextFormFieldConfig(
      key: 'address',
      label: 'Adresse',
      maxLines: 2,
      validator: (value) {
        if (value == null || value.isEmpty) {
          return 'Veuillez entrer votre adresse';
        }
        return null;
      },
    ),
  ];

  @override
  BaseFormWidgetState createState() => _PersonalInfoFormState();
}

class _PersonalInfoFormState extends BaseFormWidgetState<PersonalInfoForm> {
  bool get isValid => validate();
}
