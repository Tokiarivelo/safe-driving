import '../base/base_document_widget.dart';

class IdentityDocuments extends BaseDocumentWidget {
  const IdentityDocuments({
    super.key,
    required super.onDocumentsChanged,
    super.initialDocuments,
  });

  @override
  String get documentType => 'Document identité';

  @override
  String get title => 'Documents d\'identité';

  @override
  List<String> get requiredDocuments => [
    'Carte d\'identité (recto)',
    'Carte d\'identité (verso)',
    'Permis de conduire (recto)',
    'Permis de conduire (verso)',
  ];

  @override
  int get minimumRequiredCount => 4;

  @override
  BaseDocumentWidgetState createState() => _IdentityDocumentsState();
}

class _IdentityDocumentsState
    extends BaseDocumentWidgetState<IdentityDocuments> {}
