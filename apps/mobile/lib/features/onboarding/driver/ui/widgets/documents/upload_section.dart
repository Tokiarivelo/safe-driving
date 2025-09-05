import 'package:flutter/material.dart';

/// Upload section widget for document management
class UploadSection extends StatefulWidget {
  final String title;
  final String description;
  final List<String> requiredDocuments;
  final Function(List<String>) onDocumentsChanged;
  final List<String>? initialDocuments;
  final bool allowMultiple;

  const UploadSection({
    super.key,
    required this.title,
    required this.description,
    required this.requiredDocuments,
    required this.onDocumentsChanged,
    this.initialDocuments,
    this.allowMultiple = true,
  });

  @override
  State<UploadSection> createState() => _UploadSectionState();
}

class _UploadSectionState extends State<UploadSection> {
  List<String> _uploadedDocuments = [];
  bool _isUploading = false;
  bool _hasShownUploadSnack = false;

  @override
  void initState() {
    super.initState();
    _uploadedDocuments = widget.initialDocuments ?? [];
  }

  void _addDocument(String documentPath) {
    setState(() {
      if (widget.allowMultiple) {
        _uploadedDocuments.add(documentPath);
      } else {
        _uploadedDocuments = [documentPath];
      }
    });
    widget.onDocumentsChanged(_uploadedDocuments);
  }

  void _removeDocument(int index) {
    setState(() {
      _uploadedDocuments.removeAt(index);
    });
    widget.onDocumentsChanged(_uploadedDocuments);
  }

  Future<void> _simulateUpload() async {
    setState(() {
      _isUploading = true;
    });

    // Simulate upload delay
    await Future.delayed(const Duration(seconds: 2));

    setState(() {
      _isUploading = false;
    });

    final mockPath = 'upload_${DateTime.now().millisecondsSinceEpoch}.jpg';
    _addDocument(mockPath);

    if (mounted && !_hasShownUploadSnack) {
      // Show success only once after the first successful upload
      ScaffoldMessenger.of(context).clearSnackBars();
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Document téléchargé avec succès')),
      );
      _hasShownUploadSnack = true;
    }
  }

  @override
  Widget build(BuildContext context) {
    return Card(
      elevation: 2,
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(widget.title, style: Theme.of(context).textTheme.titleLarge),
            const SizedBox(height: 8),
            Text(
              widget.description,
              style: Theme.of(context).textTheme.bodyMedium,
            ),
            const SizedBox(height: 16),
            _buildRequiredDocuments(),
            const SizedBox(height: 16),
            if (_uploadedDocuments.isNotEmpty) ...[
              _buildUploadedDocuments(),
              const SizedBox(height: 16),
            ],
            _buildUploadButton(),
            if (_isUploading) ...[
              const SizedBox(height: 16),
              const LinearProgressIndicator(),
              const SizedBox(height: 8),
              const Text(
                'Téléchargement en cours...',
                style: TextStyle(fontStyle: FontStyle.italic),
              ),
            ],
          ],
        ),
      ),
    );
  }

  Widget _buildRequiredDocuments() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Documents requis :',
          style: Theme.of(context).textTheme.titleSmall,
        ),
        const SizedBox(height: 8),
        ...widget.requiredDocuments.map(
          (doc) => Padding(
            padding: const EdgeInsets.symmetric(vertical: 2),
            child: Row(
              children: [
                Icon(
                  Icons.check_circle_outline,
                  size: 16,
                  color: _isDocumentUploaded(doc) ? Colors.green : Colors.grey,
                ),
                const SizedBox(width: 8),
                Expanded(child: Text(doc)),
              ],
            ),
          ),
        ),
      ],
    );
  }

  Widget _buildUploadedDocuments() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          children: [
            Icon(Icons.check_circle, color: Colors.green, size: 20),
            const SizedBox(width: 8),
            Text(
              'Documents téléchargés (${_uploadedDocuments.length})',
              style: Theme.of(context).textTheme.titleSmall,
            ),
          ],
        ),
        const SizedBox(height: 8),
        ListView.builder(
          shrinkWrap: true,
          physics: const NeverScrollableScrollPhysics(),
          itemCount: _uploadedDocuments.length,
          itemBuilder: (context, index) {
            final document = _uploadedDocuments[index];
            return Container(
              margin: const EdgeInsets.symmetric(vertical: 2),
              padding: const EdgeInsets.all(8),
              decoration: BoxDecoration(
                border: Border.all(color: Colors.grey.shade300),
                borderRadius: BorderRadius.circular(8),
              ),
              child: Row(
                children: [
                  const Icon(Icons.description, size: 20),
                  const SizedBox(width: 8),
                  Expanded(
                    child: Text(
                      document.split('/').last,
                      style: const TextStyle(fontSize: 14),
                    ),
                  ),
                  IconButton(
                    icon: const Icon(Icons.delete, color: Colors.red, size: 20),
                    onPressed: () => _removeDocument(index),
                    constraints: const BoxConstraints(
                      minWidth: 32,
                      minHeight: 32,
                    ),
                  ),
                ],
              ),
            );
          },
        ),
      ],
    );
  }

  Widget _buildUploadButton() {
    final canUpload = widget.allowMultiple || _uploadedDocuments.isEmpty;

    return SizedBox(
      width: double.infinity,
      child: ElevatedButton.icon(
        onPressed: canUpload && !_isUploading ? _showUploadOptions : null,
        icon: _isUploading
            ? const SizedBox(
                width: 16,
                height: 16,
                child: CircularProgressIndicator(strokeWidth: 2),
              )
            : const Icon(Icons.cloud_upload),
        label: Text(
          _isUploading ? 'Téléchargement...' : 'Télécharger un document',
        ),
        style: ElevatedButton.styleFrom(
          padding: const EdgeInsets.symmetric(vertical: 12),
        ),
      ),
    );
  }

  void _showUploadOptions() {
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
                _simulateUpload();
              },
            ),
            ListTile(
              leading: const Icon(Icons.photo_library),
              title: const Text('Choisir depuis la galerie'),
              onTap: () {
                Navigator.pop(context);
                _simulateUpload();
              },
            ),
            ListTile(
              leading: const Icon(Icons.folder),
              title: const Text('Parcourir les fichiers'),
              onTap: () {
                Navigator.pop(context);
                _simulateUpload();
              },
            ),
          ],
        ),
      ),
    );
  }

  bool _isDocumentUploaded(String requiredDoc) {
    // Simple check - in a real implementation, this would be more sophisticated
    return _uploadedDocuments.isNotEmpty;
  }

  bool get isComplete =>
      _uploadedDocuments.length >= widget.requiredDocuments.length;
  double get progress => widget.requiredDocuments.isEmpty
      ? 1.0
      : (_uploadedDocuments.length / widget.requiredDocuments.length).clamp(
          0.0,
          1.0,
        );
}
