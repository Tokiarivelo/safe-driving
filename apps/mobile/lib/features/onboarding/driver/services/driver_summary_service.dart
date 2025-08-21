import 'package:flutter/material.dart';

class DriverSummaryService {
  static List<Map<String, dynamic>> getResumeData() {
    return [
      {
        'titre': 'Informations personnelles',
        'elements': ['Nom', 'E-mail', 'Téléphone', 'Photos uploadées'],
      },
      {
        'titre': 'Véhicule',
        'elements': [
          'Type',
          'Marque',
          'Modèle',
          'Immatriculation',
          'Nombre de places',
        ],
      },
      {
        'titre': 'GPS & Notifications',
        'elements': ['GPS', 'Notifications'],
      },
      {
        'titre': 'Préférences',
        'elements': ['Thème', 'Langue'],
      },
    ];
  }

  static IconData getFieldIcon(String fieldName) {
    switch (fieldName) {
      case 'Nom':
        return Icons.person;
      case 'E-mail':
        return Icons.email;
      case 'Téléphone':
        return Icons.phone;
      case 'Photos uploadées':
        return Icons.photo_library;
      case 'Type':
        return Icons.local_taxi;
      case 'Marque':
        return Icons.car_rental;
      case 'Modèle':
        return Icons.directions_car;
      case 'Immatriculation':
        return Icons.confirmation_number;
      case 'Nombre de places':
        return Icons.airline_seat_recline_normal;
      case 'GPS':
        return Icons.location_on;
      case 'Notifications':
        return Icons.notifications;
      case 'Thème':
        return Icons.palette;
      case 'Langue':
        return Icons.language;
      default:
        return Icons.info;
    }
  }

  static IconData getSectionIcon(String sectionTitle) {
    switch (sectionTitle) {
      case 'Informations personnelles':
        return Icons.person;
      case 'Véhicule':
        return Icons.directions_car;
      case 'GPS & Notifications':
        return Icons.settings;
      case 'Préférences':
        return Icons.tune;
      default:
        return Icons.info;
    }
  }

  static int getStepIndexForField(String fieldName) {
    switch (fieldName) {
      case 'Nom':
      case 'E-mail':
      case 'Téléphone':
        return 1;
      case 'Type':
      case 'Marque':
      case 'Modèle':
      case 'Immatriculation':
      case 'Nombre de places':
        return 3;
      case 'GPS':
        return 6;
      case 'Notifications':
        return 7;
      case 'Thème':
      case 'Langue':
        return 8;
      default:
        return 0;
    }
  }

  static bool isFieldEditable(String fieldName) {
    return fieldName != 'Photos uploadées';
  }

  static List<SectionMetadata> getSectionMetadata() {
    return [
      SectionMetadata(
        title: 'Informations personnelles',
        icon: Icons.person,
        fields: [
          FieldMetadata('Nom', Icons.person, 1, true),
          FieldMetadata('E-mail', Icons.email, 1, true),
          FieldMetadata('Téléphone', Icons.phone, 1, true),
          FieldMetadata('Photos uploadées', Icons.photo_library, 0, false),
        ],
      ),
      SectionMetadata(
        title: 'Véhicule',
        icon: Icons.directions_car,
        fields: [
          FieldMetadata('Type', Icons.local_taxi, 3, true),
          FieldMetadata('Marque', Icons.car_rental, 3, true),
          FieldMetadata('Modèle', Icons.directions_car, 3, true),
          FieldMetadata('Immatriculation', Icons.confirmation_number, 3, true),
          FieldMetadata(
            'Nombre de places',
            Icons.airline_seat_recline_normal,
            3,
            true,
          ),
        ],
      ),
      SectionMetadata(
        title: 'GPS & Notifications',
        icon: Icons.settings,
        fields: [
          FieldMetadata('GPS', Icons.location_on, 6, true),
          FieldMetadata('Notifications', Icons.notifications, 7, true),
        ],
      ),
      SectionMetadata(
        title: 'Préférences',
        icon: Icons.tune,
        fields: [
          FieldMetadata('Thème', Icons.palette, 8, true),
          FieldMetadata('Langue', Icons.language, 8, true),
        ],
      ),
    ];
  }
}

class SectionMetadata {
  final String title;
  final IconData icon;
  final List<FieldMetadata> fields;

  const SectionMetadata({
    required this.title,
    required this.icon,
    required this.fields,
  });
}

class FieldMetadata {
  final String name;
  final IconData icon;
  final int stepIndex;
  final bool isEditable;

  const FieldMetadata(this.name, this.icon, this.stepIndex, this.isEditable);
}
