import '../base/base_document_widget.dart';

class VehicleDocuments extends BaseDocumentWidget {
  const VehicleDocuments({
    super.key,
    required super.onDocumentsChanged,
    super.initialDocuments,
  });

  @override
  String get documentType => 'Document véhicule';

  @override
  String get title => 'Documents du véhicule';

  @override
  List<String> get requiredDocuments => [
    'Carte grise (recto)',
    'Carte grise (verso)',
    'Assurance du véhicule',
    'Contrôle technique (si applicable)',
  ];

  @override
  int get minimumRequiredCount => 3;

  @override
  BaseDocumentWidgetState createState() => _VehicleDocumentsState();
}

class _VehicleDocumentsState
    extends BaseDocumentWidgetState<VehicleDocuments> {}
