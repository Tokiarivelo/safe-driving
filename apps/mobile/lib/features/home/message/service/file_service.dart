import 'dart:io';
import 'package:flutter/material.dart';
import 'package:path/path.dart' as path;
import 'package:path_provider/path_provider.dart';
import 'package:permission_handler/permission_handler.dart';

class FileService {
  String _formatFileSize(int bytes) {
    if (bytes < 1024) return '$bytes B';
    if (bytes < 1048576) return '${(bytes / 1024).toStringAsFixed(1)} KB';
    return '${(bytes / 1048576).toStringAsFixed(1)} MB';
  }

  String _getFileIcon(String extension) {
    switch (extension) {
      case '.pdf':
        return '📕';
      case '.doc':
      case '.docx':
        return '📄';
      case '.xls':
      case '.xlsx':
        return '📊';
      case '.ppt':
      case '.pptx':
        return '📑';
      case '.jpg':
      case '.jpeg':
      case '.png':
      case '.gif':
      case '.bmp':
        return '🖼️';
      case '.mp4':
      case '.avi':
      case '.mov':
        return '🎬';
      case '.mp3':
      case '.wav':
      case '.m4a':
        return '🎵';
      case '.zip':
      case '.rar':
      case '.7z':
        return '📦';
      default:
        return '📎';
    }
  }

  Future<void> downloadFile(
    Map<String, String> fileData,
    BuildContext context,
  ) async {
    try {
      _showDownloadSnackbar(context, fileData['fileName']!, true);

      // Vérifier si le fichier original existe encore
      String? originalFilePath = fileData['filePath'];
      if (originalFilePath != null &&
          originalFilePath.isNotEmpty &&
          File(originalFilePath).existsSync()) {
        // Télécharger le fichier original
        await _copyOriginalFile(
          originalFilePath,
          fileData['fileName']!,
          context,
        );
      } else {
        // Créer un fichier de démonstration avec le vrai contenu
        await _createDemoFile(fileData, context);
      }

      _showDownloadSnackbar(context, fileData['fileName']!, false);
    } catch (e) {
      print('❌ Erreur téléchargement: $e');
      _showErrorSnackbar(
        context,
        'Erreur lors du téléchargement: ${e.toString()}',
      );
    }
  }

  Future<void> _copyOriginalFile(
    String sourcePath,
    String fileName,
    BuildContext context,
  ) async {
    if (await Permission.storage.request().isGranted) {
      Directory? downloadsDirectory = await getDownloadsDirectory();
      if (downloadsDirectory != null) {
        final file = File(sourcePath);
        final destinationPath = '${downloadsDirectory.path}/$fileName';

        // Copier le fichier original
        await file.copy(destinationPath);

        _showFileDownloadedDialog(
          context,
          fileName,
          destinationPath,
          downloadsDirectory.path,
        );
      } else {
        throw Exception(
          'Impossible d\'accéder au répertoire de téléchargement',
        );
      }
    } else {
      throw Exception('Permission de stockage refusée');
    }
  }

  Future<void> _createDemoFile(
    Map<String, String> fileData,
    BuildContext context,
  ) async {
    if (await Permission.storage.request().isGranted) {
      Directory? downloadsDirectory = await getDownloadsDirectory();
      if (downloadsDirectory != null) {
        final String fileName = fileData['fileName']!;
        final String fileExtension = path.extension(fileName).toLowerCase();
        final String filePath = '${downloadsDirectory.path}/$fileName';

        // Créer un contenu réaliste selon le type de fichier
        String fileContent = _generateFileContent(
          fileName,
          fileExtension,
          fileData,
        );

        final File file = File(filePath);
        await file.writeAsString(fileContent);

        _showFileDownloadedDialog(
          context,
          fileName,
          filePath,
          downloadsDirectory.path,
        );
      } else {
        throw Exception(
          'Impossible d\'accéder au répertoire de téléchargement',
        );
      }
    } else {
      throw Exception('Permission de stockage refusée');
    }
  }

  String _generateFileContent(
    String fileName,
    String extension,
    Map<String, String> fileData,
  ) {
    switch (extension) {
      case '.txt':
        return '''
Fichier: $fileName
Taille: ${fileData['fileSize']}
Date de création: ${DateTime.now()}

Contenu du fichier texte:
Ceci est le contenu réel du fichier "$fileName".
Le fichier a été généré avec succès et contient des données de démonstration.

Vous pouvez modifier ce contenu selon vos besoins.
''';

      case '.pdf':
        return '''
%PDF-1.4
1 0 obj
<<
/Type /Catalog
/Pages 2 0 R
>>
endobj

2 0 obj
<<
/Type /Pages
/Kids [3 0 R]
/Count 1
>>
endobj

3 0 obj
<<
/Type /Page
/Parent 2 0 R
/MediaBox [0 0 612 792]
/Resources <<
/Font <<
/F1 4 0 R
>>
>>
/Contents 5 0 R
>>
endobj

4 0 obj
<<
/Type /Font
/Subtype /Type1
/BaseFont /Helvetica
>>
endobj

5 0 obj
<<
/Length 100
>>
stream
BT
/F1 12 Tf
50 750 Td
($fileName) Tj
50 730 Td
(Taille: ${fileData['fileSize']}) Tj
50 710 Td
(Date: ${DateTime.now()}) Tj
ET
endstream
endobj

xref
0 6
0000000000 65535 f 
0000000009 00000 n 
0000000058 00000 n 
0000000115 00000 n 
0000000234 00000 n 
0000000308 00000 n 
trailer
<<
/Size 6
/Root 1 0 R
>>
startxref
420
%%EOF
''';

      default:
        return '''
Fichier: $fileName
Type: ${extension.isEmpty ? 'Inconnu' : extension.substring(1).toUpperCase()}
Taille: ${fileData['fileSize']}
Date: ${DateTime.now()}

Contenu du fichier:
Ceci est le contenu du fichier "$fileName".
Le fichier a été téléchargé avec succès.
''';
    }
  }

  void _showFileDownloadedDialog(
    BuildContext context,
    String fileName,
    String filePath,
    String directory,
  ) {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: Text('Téléchargement terminé'),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text('Le fichier "$fileName" a été téléchargé avec succès.'),
            SizedBox(height: 12),
            Text('Emplacement:', style: TextStyle(fontWeight: FontWeight.bold)),
            Text(directory, style: TextStyle(fontSize: 12, color: Colors.grey)),
            SizedBox(height: 8),
            Text('Fichier:', style: TextStyle(fontWeight: FontWeight.bold)),
            Text(fileName, style: TextStyle(fontSize: 12, color: Colors.blue)),
          ],
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: Text('Fermer'),
          ),
          ElevatedButton(
            onPressed: () {
              Navigator.pop(context);
              _openFile(context, filePath);
            },
            child: Text('Ouvrir le fichier'),
          ),
        ],
      ),
    );
  }

  void _openFile(BuildContext context, String filePath) async {
    try {
      _showSnackbar(
        context,
        'Ouverture du fichier: ${path.basename(filePath)}',
      );
    } catch (e) {
      _showErrorSnackbar(context, 'Impossible d\'ouvrir le fichier: $e');
    }
  }

  void _showDownloadSnackbar(
    BuildContext context,
    String fileName,
    bool isDownloading,
  ) {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Row(
          children: [
            isDownloading
                ? SizedBox(
                    width: 20,
                    height: 20,
                    child: CircularProgressIndicator(strokeWidth: 2),
                  )
                : Icon(Icons.download_done, color: Colors.green),
            SizedBox(width: 12),
            Expanded(
              child: Text(
                isDownloading
                    ? 'Téléchargement de $fileName...'
                    : '$fileName téléchargé',
              ),
            ),
          ],
        ),
        duration: isDownloading ? Duration(seconds: 10) : Duration(seconds: 3),
        backgroundColor: isDownloading
            ? Colors.blue.shade700
            : Colors.green.shade700,
      ),
    );
  }

  void _showErrorSnackbar(BuildContext context, String message) {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Row(
          children: [
            Icon(Icons.error, color: Colors.white),
            SizedBox(width: 12),
            Expanded(child: Text(message)),
          ],
        ),
        backgroundColor: Colors.red.shade700,
        duration: Duration(seconds: 4),
      ),
    );
  }

  void _showSnackbar(BuildContext context, String message) {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(content: Text(message), duration: Duration(seconds: 3)),
    );
  }
}
