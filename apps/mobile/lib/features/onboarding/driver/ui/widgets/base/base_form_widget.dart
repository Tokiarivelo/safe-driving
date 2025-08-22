import 'package:flutter/material.dart';

abstract class FormFieldConfig {
  final String key;
  final String label;
  final String? Function(String?)? validator;
  final TextInputType? keyboardType;
  final int? maxLines;
  final String? initialValue;

  const FormFieldConfig({
    required this.key,
    required this.label,
    this.validator,
    this.keyboardType,
    this.maxLines = 1,
    this.initialValue,
  });
}

class TextFormFieldConfig extends FormFieldConfig {
  const TextFormFieldConfig({
    required super.key,
    required super.label,
    super.validator,
    super.keyboardType,
    super.maxLines = 1,
    super.initialValue,
  });
}

class DropdownFormFieldConfig<T> extends FormFieldConfig {
  final List<T> options;
  final String Function(T) displayText;
  final T? initialOption;

  const DropdownFormFieldConfig({
    required super.key,
    required super.label,
    required this.options,
    required this.displayText,
    super.validator,
    this.initialOption,
  }) : super(keyboardType: null, maxLines: null, initialValue: null);
}

abstract class BaseFormWidget extends StatefulWidget {
  final Function(Map<String, dynamic>) onDataChanged;
  final Map<String, dynamic>? initialData;

  const BaseFormWidget({
    super.key,
    required this.onDataChanged,
    this.initialData,
  });

  List<FormFieldConfig> get fieldConfigs;

  @override
  BaseFormWidgetState createState();
}

abstract class BaseFormWidgetState<T extends BaseFormWidget> extends State<T> {
  final _formKey = GlobalKey<FormState>();
  final _controllers = <String, TextEditingController>{};
  final _dropdownValues = <String, dynamic>{};

  @override
  void initState() {
    super.initState();
    _initializeControllers();
  }

  void _initializeControllers() {
    final initialData = widget.initialData ?? {};
    
    for (final config in widget.fieldConfigs) {
      if (config is TextFormFieldConfig) {
        _controllers[config.key] = TextEditingController(
          text: initialData[config.key]?.toString() ?? config.initialValue ?? '',
        );
      } else if (config is DropdownFormFieldConfig) {
        _dropdownValues[config.key] = initialData[config.key] ?? config.initialOption;
      }
    }
  }

  @override
  void dispose() {
    for (final controller in _controllers.values) {
      controller.dispose();
    }
    super.dispose();
  }

  void _onFieldChanged() {
    final data = <String, dynamic>{};
    
    for (final config in widget.fieldConfigs) {
      if (config is TextFormFieldConfig) {
        final value = _controllers[config.key]?.text ?? '';
        if (config.keyboardType == TextInputType.number) {
          data[config.key] = int.tryParse(value);
        } else {
          data[config.key] = value;
        }
      } else if (config is DropdownFormFieldConfig) {
        data[config.key] = _dropdownValues[config.key];
      }
    }
    
    widget.onDataChanged(data);
  }

  @override
  Widget build(BuildContext context) {
    return Form(
      key: _formKey,
      child: Column(
        children: [
          ...widget.fieldConfigs.map(_buildField),
        ],
      ),
    );
  }

  Widget _buildField(FormFieldConfig config) {
    Widget field;
    
    if (config is TextFormFieldConfig) {
      field = _buildTextFormField(config);
    } else if (config is DropdownFormFieldConfig) {
      field = _buildDropdownField(config);
    } else {
      field = const SizedBox.shrink();
    }

    return Padding(
      padding: const EdgeInsets.only(bottom: 16),
      child: field,
    );
  }

  Widget _buildTextFormField(TextFormFieldConfig config) {
    return TextFormField(
      controller: _controllers[config.key],
      decoration: InputDecoration(
        labelText: config.label,
        border: const OutlineInputBorder(),
      ),
      validator: config.validator,
      keyboardType: config.keyboardType,
      maxLines: config.maxLines,
      onChanged: (_) => _onFieldChanged(),
    );
  }

  Widget _buildDropdownField(DropdownFormFieldConfig config) {
    return DropdownButtonFormField(
      value: _dropdownValues[config.key],
      decoration: InputDecoration(
        labelText: config.label,
        border: const OutlineInputBorder(),
      ),
      items: config.options.map((option) {
        return DropdownMenuItem(
          value: option,
          child: Text(config.displayText(option)),
        );
      }).toList(),
      validator: (value) => config.validator?.call(value?.toString()),
      onChanged: (value) {
        setState(() {
          _dropdownValues[config.key] = value;
        });
        _onFieldChanged();
      },
    );
  }

  bool validate() {
    return _formKey.currentState?.validate() ?? false;
  }

  Map<String, dynamic> get formData {
    final data = <String, dynamic>{};
    
    for (final config in widget.fieldConfigs) {
      if (config is TextFormFieldConfig) {
        final value = _controllers[config.key]?.text ?? '';
        if (config.keyboardType == TextInputType.number) {
          data[config.key] = int.tryParse(value);
        } else {
          data[config.key] = value;
        }
      } else if (config is DropdownFormFieldConfig) {
        data[config.key] = _dropdownValues[config.key];
      }
    }
    
    return data;
  }
}
