import 'package:flutter/material.dart';
import 'package:safe_driving/shared/widgets/customs/snackbar/snackbar_helper.dart';

abstract class BaseDocumentWidget extends StatefulWidget {
  final Function(List<String>) onDocumentsChanged;
  final List<String>? initialDocuments;

  const BaseDocumentWidget({
    super.key,
    required this.onDocumentsChanged,
    this.initialDocuments,
  });

  String get documentType;
  String get title;
  List<String> get requiredDocuments;
  int get minimumRequiredCount;

  @override
  BaseDocumentWidgetState createState();
}

abstract class BaseDocumentWidgetState<T extends BaseDocumentWidget>
    extends State<T> {
  List<String> _documents = [];
  bool _hasShownUploadSnack = false;

  @override
  void initState() {
    super.initState();
    _documents = widget.initialDocuments ?? [];
  }

  void addDocument(String documentPath) {
    setState(() {
      _documents.add(documentPath);
    });
    widget.onDocumentsChanged(_documents);
  }

  void removeDocument(int index) {
    setState(() {
      _documents.removeAt(index);
    });
    widget.onDocumentsChanged(_documents);
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(widget.title, style: Theme.of(context).textTheme.headlineSmall),
        const SizedBox(height: 16),
        Text(
          'Veuillez télécharger les documents suivants :',
          style: Theme.of(context).textTheme.bodyMedium,
        ),
        const SizedBox(height: 8),
        ...widget.requiredDocuments.map(
          (doc) => _buildDocumentRequirement(doc),
        ),
        const SizedBox(height: 24),
        if (_documents.isNotEmpty) ...[
          Text(
            'Documents téléchargés :',
            style: Theme.of(context).textTheme.titleMedium,
          ),
          const SizedBox(height: 8),
          _buildDocumentsList(),
          const SizedBox(height: 16),
        ],
        ElevatedButton.icon(
          onPressed: _showDocumentPickerDialog,
          icon: const Icon(Icons.add_photo_alternate),
          label: const Text('Ajouter un document'),
          style: ElevatedButton.styleFrom(
            minimumSize: const Size(double.infinity, 48),
          ),
        ),
      ],
    );
  }

  Widget _buildDocumentRequirement(String documentName) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 4),
      child: Row(
        children: [
          const Icon(Icons.check_circle_outline, size: 16, color: Colors.grey),
          const SizedBox(width: 8),
          Expanded(child: Text(documentName)),
        ],
      ),
    );
  }

  Widget _buildDocumentsList() {
    return ListView.builder(
      shrinkWrap: true,
      physics: const NeverScrollableScrollPhysics(),
      itemCount: _documents.length,
      itemBuilder: (context, index) {
        final document = _documents[index];
        return Card(
          margin: const EdgeInsets.symmetric(vertical: 4),
          child: ListTile(
            leading: const Icon(Icons.description),
            title: Text('${widget.documentType} ${index + 1}'),
            subtitle: Text(document.split('/').last),
            trailing: IconButton(
              icon: const Icon(Icons.delete, color: Colors.red),
              onPressed: () => removeDocument(index),
            ),
          ),
        );
      },
    );
  }

  void _showDocumentPickerDialog() {
    showModalBottomSheet(
      context: context,
      builder: (context) => SafeArea(
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            ListTile(
              leading: const Icon(Icons.camera_alt),
              title: const Text('Prendre une photo'),
              onTap: () {
                Navigator.pop(context);
                _takePhoto();
              },
            ),
            ListTile(
              leading: const Icon(Icons.photo_library),
              title: const Text('Choisir depuis la galerie'),
              onTap: () {
                Navigator.pop(context);
                _pickFromGallery();
              },
            ),
          ],
        ),
      ),
    );
  }

  void _takePhoto() {
    final mockPath =
        '${widget.documentType.toLowerCase()}_camera_${DateTime.now().millisecondsSinceEpoch}.jpg';
    addDocument(mockPath);

    if (!_hasShownUploadSnack && mounted) {
      SnackbarHelper.showSuccess(context, 'Photo prise avec succès');
      _hasShownUploadSnack = true;
    }
  }

  void _pickFromGallery() {
    final mockPath =
        '${widget.documentType.toLowerCase()}_gallery_${DateTime.now().millisecondsSinceEpoch}.jpg';
    addDocument(mockPath);

    if (!_hasShownUploadSnack && mounted) {
      SnackbarHelper.showSuccess(context, 'Document sélectionné depuis la galerie');
      _hasShownUploadSnack = true;
    }
  }

  bool get hasAllRequiredDocuments =>
      _documents.length >= widget.minimumRequiredCount;
}
