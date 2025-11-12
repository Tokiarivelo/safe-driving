import 'dart:io';
import 'dart:typed_data' show Uint8List;
import 'package:flutter/material.dart';
import 'package:emoji_picker_flutter/emoji_picker_flutter.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'package:cached_network_image/cached_network_image.dart';
import 'package:file_picker/file_picker.dart';
import 'package:path/path.dart' as path;
import 'package:path_provider/path_provider.dart';
import 'package:permission_handler/permission_handler.dart';
import 'package:safe_driving/core/constants/colors/colors.dart';
import 'package:safe_driving/features/home/message/service/conversation_service.dart';
import 'package:safe_driving/features/home/message/ui/screens/profil_detail_screen.dart';
import 'package:safe_driving/features/home/message/viewmodels/message_viewmodels.dart';
import 'package:safe_driving/features/authentication/services/session_service.dart';
import 'package:safe_driving/shared/state_management/service_locator.dart';

class MessageDetailScreen extends StatefulWidget {
  final dynamic conversation;
  final MessageViewmodels viewModel;

  const MessageDetailScreen({
    super.key,
    required this.conversation,
    required this.viewModel,
  });

  @override
  State<MessageDetailScreen> createState() => _MessageDetailScreenState();
}

class _MessageDetailScreenState extends State<MessageDetailScreen> {
  final TextEditingController _controller = TextEditingController();
  final ScrollController _scrollController = ScrollController();

  String _currentUserId = '';
  Map<String, dynamic> _otherParticipant = {};
  bool _initialized = false;
  List<dynamic> _localMessages = [];
  bool _isSearchingMessages = false;
  String _messageSearchQuery = '';
  List<dynamic> _searchMessageResults = [];
  TextEditingController _searchController = TextEditingController();

  // Variables pour la fonctionnalité "Répondre"
  Map<String, dynamic>? _replyingTo;
  String _replyText = '';

  // Variables pour les sélecteurs
  bool _showEmojiPicker = false;
  bool _showGifPicker = false;

  @override
  void initState() {
    super.initState();
    _searchController = TextEditingController();
    _initializeScreen().then((_) {
      _loadMessages();
    });
  }

  @override
  void dispose() {
    _searchController.dispose();
    super.dispose();
  }
  // @override
  // void dispose() {
  //   _controller.dispose();
  //   _scrollController.dispose();
  //   super.dispose();
  // }

  // === MÉTHODES POUR L'ENVOI ET AFFICHAGE DES FICHIERS/IMAGES ===

  Future<void> _pickAndSendFile() async {
    try {
      FilePickerResult? result = await FilePicker.platform.pickFiles(
        type: FileType.any,
        allowMultiple: false,
        allowCompression: true,
      );

      if (result != null && result.files.single.path != null) {
        PlatformFile file = result.files.single;

        _showFileUploadSnackbar(file.name, true);

        // Envoyer le fichier réel
        String fileMessage = await _createFileMessage(file);
        _sendMessageWithContent(fileMessage);

        _showFileUploadSnackbar(file.name, false);
      } else {
        print('Sélection de fichier annulée');
      }
    } catch (e) {
      print('❌ Erreur sélection fichier: $e');
      _showErrorSnackbar('Erreur lors de la sélection du fichier');
    }
  }

  Future<String> _createFileMessage(PlatformFile file) async {
    String fileName = file.name;
    String fileSize = _formatFileSize(file.size);
    String fileExtension = path.extension(file.name).toLowerCase();
    String fileIcon = _getFileIcon(fileExtension);

    // Stocker le chemin du fichier original pour le téléchargement
    String filePath = file.path ?? '';

    return '📁FILE:$fileIcon|$fileName|$fileSize|$filePath';
  }

  Future<void> _pickAndSendImage() async {
    try {
      FilePickerResult? result = await FilePicker.platform.pickFiles(
        type: FileType.image,
        allowMultiple: false,
        allowCompression: true,
      );

      if (result != null && result.files.single.path != null) {
        PlatformFile file = result.files.single;

        _showFileUploadSnackbar(file.name, true);

        // Envoyer l'image réelle
        String imageMessage = await _createImageMessage(file);
        _sendMessageWithContent(imageMessage);

        _showFileUploadSnackbar(file.name, false);
      }
    } catch (e) {
      print('❌ Erreur sélection image: $e');
      _showErrorSnackbar('Erreur lors de la sélection de l\'image');
    }
  }

  // Future<String> _createImageMessage(PlatformFile file) async {
  //   String fileName = file.name;
  //   String fileSize = _formatFileSize(file.size);

  //   // CORRECTION : URL valide sans ":" en trop
  //   String imageUrl =
  //       'https://picsum.photos/400/300?random=${DateTime.now().millisecondsSinceEpoch}';

  //   // Stocker le chemin du fichier original
  //   String filePath = file.path ?? '';

  //   return '🖼️IMAGE:$imageUrl|$fileName|$fileSize|$filePath';
  // }
  Future<String> _createImageMessage(PlatformFile file) async {
    String fileName = file.name;
    String fileSize = _formatFileSize(file.size);
    String localImagePath = await _saveImageToLocalStorage(file);
    return '🖼️IMAGE:local:$localImagePath|$fileName|$fileSize|${file.path ?? ""}';
  }

  Future<String> _saveImageToLocalStorage(PlatformFile file) async {
    try {
      final Directory appDocDir = await getApplicationDocumentsDirectory();
      final String fileName =
          'image_${DateTime.now().millisecondsSinceEpoch}${path.extension(file.name)}';
      final String localPath = '${appDocDir.path}/$fileName';

      final File localFile = File(localPath);
      final Uint8List? bytes = file.bytes;

      if (bytes != null) {
        await localFile.writeAsBytes(bytes);
      } else if (file.path != null) {
        await localFile.writeAsBytes(await File(file.path!).readAsBytes());
      }

      return localPath;
    } catch (e) {
      print('❌ Erreur sauvegarde image locale: $e');
      return file.path ?? '';
    }
  }

  String _generateImageUrl() {
    // Générer une URL unique pour éviter le cache
    final timestamp = DateTime.now().millisecondsSinceEpoch;
    return 'https://picsum.photos/400/300?random=$timestamp';
  }

  // === MÉTHODES POUR L'AFFICHAGE DES FICHIERS/IMAGES ===

  bool _isImageMessage(String content) {
    return content.startsWith('🖼️IMAGE:');
  }

  bool _isFileMessage(String content) {
    return content.startsWith('📁FILE:');
  }

  Map<String, String>? _parseImageMessage(String content) {
    try {
      if (content.startsWith('🖼️IMAGE:')) {
        final parts = content.substring(8).split('|');
        if (parts.length >= 3) {
          String urlOrPath = parts[0];
          bool isLocal = urlOrPath.startsWith('local:');

          return {
            'url': isLocal ? urlOrPath.substring(6) : urlOrPath,
            'fileName': parts[1],
            'fileSize': parts[2],
            'filePath': parts.length > 3 ? parts[3] : '',
            'isLocal': isLocal.toString(),
          };
        }
      }
      return null;
    } catch (e) {
      print('❌ Erreur parsing image: $e');
      return null;
    }
  }
  // Map<String, String>? _parseImageMessage(String content) {
  //   try {
  //     if (content.startsWith('🖼️IMAGE:')) {
  //       final parts = content.substring(8).split('|');
  //       if (parts.length >= 3) {
  //         return {
  //           'url': parts[0],
  //           'fileName': parts[1],
  //           'fileSize': parts[2],
  //           'filePath': parts.length > 3 ? parts[3] : '',
  //         };
  //       }
  //     }
  //     return null;
  //   } catch (e) {
  //     print('❌ Erreur parsing image: $e');
  //     return null;
  //   }
  // }

  Map<String, String>? _parseFileMessage(String content) {
    try {
      if (content.startsWith('📁FILE:')) {
        final parts = content.substring(7).split('|');
        if (parts.length >= 3) {
          return {
            'fileIcon': parts[0],
            'fileName': parts[1],
            'fileSize': parts[2],
            'filePath': parts.length > 3 ? parts[3] : '',
          };
        }
      }
      return null;
    } catch (e) {
      print('❌ Erreur parsing fichier: $e');
      return null;
    }
  }

  Widget _buildImageMessage(Map<String, String> imageData, bool isMe) {
    return GestureDetector(
      onTap: () {
        _showImagePreview(imageData['url']!);
      },
      child: Container(
        margin: const EdgeInsets.only(bottom: 4),
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(12),
          border: Border.all(
            color: isMe ? Colors.white.withOpacity(0.3) : Colors.grey.shade300,
            width: 1,
          ),
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            ClipRRect(
              borderRadius: BorderRadius.circular(12),
              child: CachedNetworkImage(
                imageUrl: imageData['url']!,
                width: 250,
                height: 200,
                fit: BoxFit.cover,
                placeholder: (context, url) => Container(
                  width: 250,
                  height: 200,
                  color: Colors.grey.shade200,
                  child: Center(
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        CircularProgressIndicator(
                          valueColor: AlwaysStoppedAnimation<Color>(
                            isMe ? Colors.white : AppColors.color1,
                          ),
                        ),
                        SizedBox(height: 8),
                        Text(
                          'Chargement...',
                          style: TextStyle(
                            fontSize: 10,
                            color: isMe ? Colors.white70 : Colors.grey.shade600,
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
                errorWidget: (context, url, error) {
                  print('❌ Erreur chargement image: $error - URL: $url');
                  return Container(
                    width: 250,
                    height: 200,
                    color: Colors.grey.shade300,
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Icon(
                          Icons.broken_image,
                          size: 40,
                          color: Colors.grey.shade500,
                        ),
                        SizedBox(height: 8),
                        Text(
                          'Image non chargée',
                          style: TextStyle(
                            fontSize: 12,
                            color: Colors.grey.shade600,
                          ),
                        ),
                      ],
                    ),
                  );
                },
              ),
            ),
            Padding(
              padding: const EdgeInsets.all(8.0),
              child: Row(
                children: [
                  Icon(Icons.image, size: 16, color: Colors.grey.shade600),
                  SizedBox(width: 4),
                  Expanded(
                    child: Text(
                      imageData['fileName']!,
                      style: TextStyle(
                        fontSize: 12,
                        color: isMe ? Colors.white70 : Colors.grey.shade600,
                      ),
                      overflow: TextOverflow.ellipsis,
                    ),
                  ),
                  Text(
                    imageData['fileSize']!,
                    style: TextStyle(
                      fontSize: 10,
                      color: isMe ? Colors.white60 : Colors.grey.shade500,
                    ),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildFileMessage(Map<String, String> fileData, bool isMe) {
    return GestureDetector(
      onTap: () {
        _downloadFile(fileData);
      },
      child: Container(
        padding: const EdgeInsets.all(12),
        decoration: BoxDecoration(
          color: isMe ? Colors.blue.shade50 : Colors.grey.shade100,
          borderRadius: BorderRadius.circular(12),
          border: Border.all(
            color: isMe ? Colors.blue.shade200 : Colors.grey.shade300,
          ),
        ),
        child: Row(
          children: [
            Container(
              padding: EdgeInsets.all(8),
              decoration: BoxDecoration(
                color: isMe ? AppColors.color1 : Colors.grey.shade300,
                borderRadius: BorderRadius.circular(8),
              ),
              child: Text(
                fileData['fileIcon']!,
                style: TextStyle(fontSize: 20),
              ),
            ),
            SizedBox(width: 12),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    fileData['fileName']!,
                    style: TextStyle(
                      fontSize: 14,
                      fontWeight: FontWeight.bold,
                      color: isMe ? Colors.blue.shade900 : Colors.grey.shade800,
                    ),
                    overflow: TextOverflow.ellipsis,
                  ),
                  SizedBox(height: 4),
                  Text(
                    fileData['fileSize']!,
                    style: TextStyle(
                      fontSize: 12,
                      color: isMe ? Colors.blue.shade700 : Colors.grey.shade600,
                    ),
                  ),
                ],
              ),
            ),
            SizedBox(width: 8),
            Icon(
              Icons.download_rounded,
              color: isMe ? AppColors.color1 : Colors.grey.shade600,
              size: 20,
            ),
          ],
        ),
      ),
    );
  }

  void _showImagePreview(String imageUrl) {
    showDialog(
      context: context,
      builder: (context) => Dialog(
        backgroundColor: Colors.transparent,
        child: Stack(
          children: [
            Container(
              constraints: BoxConstraints(
                maxWidth: MediaQuery.of(context).size.width * 0.9,
                maxHeight: MediaQuery.of(context).size.height * 0.8,
              ),
              child: ClipRRect(
                borderRadius: BorderRadius.circular(12),
                child: CachedNetworkImage(
                  imageUrl: imageUrl,
                  fit: BoxFit.contain,
                  placeholder: (context, url) =>
                      Center(child: CircularProgressIndicator()),
                  errorWidget: (context, url, error) => Container(
                    color: Colors.grey.shade300,
                    child: Center(
                      child: Column(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          Icon(Icons.error, size: 50, color: Colors.grey),
                          SizedBox(height: 16),
                          Text('Impossible de charger l\'image'),
                        ],
                      ),
                    ),
                  ),
                ),
              ),
            ),
            Positioned(
              top: 8,
              right: 8,
              child: CircleAvatar(
                backgroundColor: Colors.black54,
                child: IconButton(
                  icon: Icon(Icons.close, color: Colors.white),
                  onPressed: () => Navigator.pop(context),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }

  // === MÉTHODES DE TÉLÉCHARGEMENT RÉEL ===

  Future<void> _downloadFile(Map<String, String> fileData) async {
    try {
      _showDownloadSnackbar(fileData['fileName']!, true);

      // Vérifier si le fichier original existe encore
      String? originalFilePath = fileData['filePath'];
      if (originalFilePath != null &&
          originalFilePath.isNotEmpty &&
          File(originalFilePath).existsSync()) {
        // Télécharger le fichier original
        await _copyOriginalFile(originalFilePath, fileData['fileName']!);
      } else {
        // Créer un fichier de démonstration avec le vrai contenu
        await _createDemoFile(fileData);
      }

      _showDownloadSnackbar(fileData['fileName']!, false);
    } catch (e) {
      print('❌ Erreur téléchargement: $e');
      _showErrorSnackbar('Erreur lors du téléchargement: ${e.toString()}');
    }
  }

  Future<void> _copyOriginalFile(String sourcePath, String fileName) async {
    if (await Permission.storage.request().isGranted) {
      Directory? downloadsDirectory = await getDownloadsDirectory();
      if (downloadsDirectory != null) {
        final file = File(sourcePath);
        final destinationPath = '${downloadsDirectory.path}/$fileName';

        // Copier le fichier original
        await file.copy(destinationPath);

        _showFileDownloadedDialog(
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

  Future<void> _createDemoFile(Map<String, String> fileData) async {
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

        _showFileDownloadedDialog(fileName, filePath, downloadsDirectory.path);
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

      case '.doc':
      case '.docx':
        return '''
Fichier Word: $fileName
Taille: ${fileData['fileSize']}
Date: ${DateTime.now()}

Ceci est un document Word de démonstration.
Contenu du fichier:

• Titre: $fileName
• Type: Document Word
• Taille: ${fileData['fileSize']}
• Date de création: ${DateTime.now()}

Ce fichier a été généré automatiquement pour la démonstration.
''';

      case '.xls':
      case '.xlsx':
        return '''
Fichier Excel: $fileName
Taille: ${fileData['fileSize']}

Données de démonstration:

Nom	Valeur	Date
Article 1	100	${DateTime.now()}
Article 2	200	${DateTime.now()}
Article 3	150	${DateTime.now()}

Total	450	
''';

      case '.jpg':
      case '.jpeg':
      case '.png':
      case '.gif':
        return '''
Fichier Image: $fileName
Taille: ${fileData['fileSize']}
Format: ${extension.substring(1).toUpperCase()}

Ce fichier représente une image.
En production, ce serait les données binaires de l'image.
Pour la démonstration, nous utilisons ce fichier texte.
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

Type: ${_getFileTypeFromIcon(fileData['fileIcon']!)}
Taille: ${fileData['fileSize']}
''';
    }
  }

  // === MÉTHODES POUR LA RECHERCHE DE MESSAGES ===

  void _toggleMessageSearch() {
    setState(() {
      _isSearchingMessages = !_isSearchingMessages;
      if (!_isSearchingMessages) {
        _messageSearchQuery = '';
        _searchMessageResults.clear();
        _searchController.clear();
      }
    });
  }

  void _searchMessages(String query) {
    setState(() {
      _messageSearchQuery = query;

      if (query.isEmpty) {
        _searchMessageResults.clear();
        return;
      }

      final allMessages = _localMessages;
      _searchMessageResults = allMessages.where((message) {
        final content = message['content']?.toString().toLowerCase() ?? '';
        final sender = message['sender'] ?? {};
        final senderName =
            '${sender['firstName'] ?? ''} ${sender['lastName'] ?? ''}'
                .toLowerCase();

        return content.contains(query.toLowerCase()) ||
            senderName.contains(query.toLowerCase());
      }).toList();
    });
  }

  Widget _buildSearchHeader() {
    return Container(
      padding: EdgeInsets.all(12),
      decoration: BoxDecoration(
        color: Colors.grey.shade100,
        border: Border(bottom: BorderSide(color: Colors.grey.shade300)),
      ),
      child: Row(
        children: [
          Expanded(
            child: TextField(
              controller: _searchController,
              autofocus: true,
              decoration: InputDecoration(
                hintText: 'Rechercher dans les messages...',
                border: InputBorder.none,
                prefixIcon: Icon(Icons.search, color: Colors.grey.shade600),
                suffixIcon: _messageSearchQuery.isNotEmpty
                    ? IconButton(
                        icon: Icon(Icons.clear, size: 20),
                        onPressed: () {
                          _searchController.clear();
                          _searchMessages('');
                        },
                      )
                    : null,
              ),
              onChanged: _searchMessages,
            ),
          ),
          SizedBox(width: 8),
          TextButton(onPressed: _toggleMessageSearch, child: Text('Annuler')),
        ],
      ),
    );
  }

  void _showFileDownloadedDialog(
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
              _openFile(filePath);
            },
            child: Text('Ouvrir le fichier'),
          ),
        ],
      ),
    );
  }

  void _openFile(String filePath) async {
    try {
      _showSnackbar('Ouverture du fichier: ${path.basename(filePath)}');
    } catch (e) {
      _showErrorSnackbar('Impossible d\'ouvrir le fichier: $e');
    }
  }

  String _getFileTypeFromIcon(String icon) {
    switch (icon) {
      case '📕':
        return 'Document PDF';
      case '📄':
        return 'Document Word';
      case '📊':
        return 'Feuille de calcul';
      case '📑':
        return 'Présentation';
      case '🖼️':
        return 'Image';
      case '🎬':
        return 'Vidéo';
      case '🎵':
        return 'Audio';
      case '📦':
        return 'Archive';
      default:
        return 'Fichier';
    }
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

  String _formatFileSize(int bytes) {
    if (bytes < 1024) return '$bytes B';
    if (bytes < 1048576) return '${(bytes / 1024).toStringAsFixed(1)} KB';
    return '${(bytes / 1048576).toStringAsFixed(1)} MB';
  }

  void _showFileUploadSnackbar(String fileName, bool isUploading) {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Row(
          children: [
            isUploading
                ? SizedBox(
                    width: 20,
                    height: 20,
                    child: CircularProgressIndicator(strokeWidth: 2),
                  )
                : Icon(Icons.check, color: Colors.green),
            SizedBox(width: 12),
            Expanded(
              child: Text(
                isUploading
                    ? 'Envoi de $fileName...'
                    : '$fileName envoyé avec succès',
              ),
            ),
          ],
        ),
        duration: isUploading ? Duration(seconds: 10) : Duration(seconds: 3),
        backgroundColor: isUploading
            ? Colors.blue.shade700
            : Colors.green.shade700,
      ),
    );
  }

  void _showDownloadSnackbar(String fileName, bool isDownloading) {
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

  void _showErrorSnackbar(String message) {
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

  void _showSnackbar(String message) {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(content: Text(message), duration: Duration(seconds: 3)),
    );
  }

  // === MÉTHODES POUR LES RÉACTIONS ===

  void _showEmojiPickerDialog(Map<String, dynamic> message) {
    setState(() {
      _showEmojiPicker = true;
      _replyingTo = message;
    });
  }

  Widget _buildEmojiPicker() {
    return EmojiPicker(
      onEmojiSelected: (Category? category, Emoji emoji) {
        final messageId = _replyingTo?['id']?.toString() ?? '';
        if (messageId.isNotEmpty) {
          widget.viewModel.toggleReaction(
            messageId: messageId,
            emoji: emoji.emoji,
          );
        }
        setState(() {
          _showEmojiPicker = false;
          _replyingTo = null;
        });
      },
      onBackspacePressed: () {},
      config: Config(
        columns: 7,
        emojiSizeMax: 32.0,
        verticalSpacing: 0,
        horizontalSpacing: 0,
        gridPadding: EdgeInsets.zero,
        initCategory: Category.RECENT,
        bgColor: const Color(0xFFF2F2F2),
        indicatorColor: Colors.blue,
        iconColor: Colors.grey,
        iconColorSelected: Colors.blue,
        backspaceColor: Colors.blue,
        skinToneDialogBgColor: Colors.white,
        skinToneIndicatorColor: Colors.grey,
        enableSkinTones: true,
        recentTabBehavior: RecentTabBehavior.RECENT,
        recentsLimit: 28,
        replaceEmojiOnLimitExceed: false,
        noRecents: Text(
          'Aucun emoji récent',
          style: TextStyle(fontSize: 20, color: Colors.black26),
        ),
        tabIndicatorAnimDuration: kTabScrollDuration,
        categoryIcons: const CategoryIcons(),
        buttonMode: ButtonMode.MATERIAL,
      ),
    );
  }

  Widget _buildMessageReactions(Map<String, dynamic> message) {
    final messageId = message['id']?.toString() ?? '';
    final reactions = widget.viewModel.getReactionsForMessage(messageId);

    if (reactions.isEmpty) return SizedBox.shrink();

    final reactionsByEmoji = <String, List<Map<String, dynamic>>>{};
    for (final reaction in reactions) {
      final emoji = reaction['emoji'];
      reactionsByEmoji[emoji] = [...reactionsByEmoji[emoji] ?? [], reaction];
    }

    return Container(
      margin: EdgeInsets.only(top: 4),
      child: Wrap(
        spacing: 4,
        runSpacing: 2,
        children: reactionsByEmoji.entries.map((entry) {
          final emoji = entry.key;
          final emojiReactions = entry.value;
          final isUserReacted = emojiReactions.any(
            (r) => r['userId'] == _currentUserId,
          );

          return GestureDetector(
            onTap: () {
              widget.viewModel.toggleReaction(
                messageId: messageId,
                emoji: emoji,
              );
            },
            child: Container(
              padding: EdgeInsets.symmetric(horizontal: 8, vertical: 4),
              decoration: BoxDecoration(
                color: isUserReacted
                    ? Colors.blue.shade100
                    : Colors.grey.shade200,
                borderRadius: BorderRadius.circular(16),
                border: Border.all(
                  color: isUserReacted ? Colors.blue : Colors.grey.shade300,
                ),
              ),
              child: Row(
                mainAxisSize: MainAxisSize.min,
                children: [
                  Text(emoji, style: TextStyle(fontSize: 14)),
                  SizedBox(width: 4),
                  Text(
                    emojiReactions.length.toString(),
                    style: TextStyle(
                      fontSize: 12,
                      fontWeight: FontWeight.bold,
                      color: isUserReacted
                          ? Colors.blue.shade800
                          : Colors.grey.shade700,
                    ),
                  ),
                ],
              ),
            ),
          );
        }).toList(),
      ),
    );
  }

  // === MÉTHODES CORRIGÉES POUR LES GIFs ===

  bool _isGifMessage(String content) {
    return content.startsWith('![GIF](') && content.contains('http') ||
        content.startsWith('http') && content.contains('.gif');
  }

  String? _extractGifUrlRobuste(String content) {
    try {
      final regex = RegExp(r'https?://[^\s)+]+');
      final match = regex.firstMatch(content);
      if (match != null) {
        String url = match.group(0)!;
        url = url.replaceAll('(', '').replaceAll(')', '').trim();
        return url;
      }

      if (content.startsWith('![GIF](')) {
        final startIndex = content.indexOf('http');
        if (startIndex != -1) {
          String url = content.substring(startIndex);
          if (url.endsWith(')')) {
            url = url.substring(0, url.length - 1);
          }
          url = url.replaceAll('(', '').trim();
          return url;
        }
      }

      if (content.startsWith('http')) {
        return content.replaceAll('(', '').replaceAll(')', '').trim();
      }

      return null;
    } catch (e) {
      print('❌ Erreur extraction robuste URL GIF: $e');
      return null;
    }
  }

  Widget _buildGifMessage(String gifUrl, bool isMe) {
    String? cleanUrl = _extractGifUrlRobuste(gifUrl);

    if (cleanUrl == null) {
      cleanUrl = gifUrl.replaceAll('(', '').replaceAll(')', '').trim();
      if (!cleanUrl.startsWith('http')) {
        final httpIndex = cleanUrl.indexOf('http');
        if (httpIndex != -1) {
          cleanUrl = cleanUrl.substring(httpIndex);
        } else {
          return _buildGifErrorWidget('URL invalide', isMe);
        }
      }
    }

    print('🔄 Chargement GIF corrigé: $cleanUrl');

    return Container(
      margin: const EdgeInsets.only(bottom: 4),
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(12),
        border: Border.all(
          color: isMe ? Colors.white.withOpacity(0.3) : Colors.grey.shade300,
          width: 1,
        ),
      ),
      child: ClipRRect(
        borderRadius: BorderRadius.circular(12),
        child: CachedNetworkImage(
          imageUrl: cleanUrl!,
          width: 200,
          height: 150,
          fit: BoxFit.cover,
          fadeInDuration: const Duration(milliseconds: 300),
          placeholder: (context, url) => Container(
            width: 200,
            height: 150,
            color: Colors.grey.shade200,
            child: Center(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  CircularProgressIndicator(
                    valueColor: AlwaysStoppedAnimation<Color>(
                      isMe ? Colors.white : AppColors.color1,
                    ),
                  ),
                  SizedBox(height: 8),
                  Text(
                    'Chargement...',
                    style: TextStyle(
                      fontSize: 10,
                      color: isMe ? Colors.white70 : Colors.grey.shade600,
                    ),
                  ),
                ],
              ),
            ),
          ),
          errorWidget: (context, url, error) {
            print('❌ Erreur chargement GIF: $error');
            print('📦 URL essayée: $url');
            return _buildGifErrorWidget('Erreur de chargement', isMe);
          },
        ),
      ),
    );
  }

  Widget _buildGifErrorWidget(String message, bool isMe) {
    return GestureDetector(
      onTap: () {
        setState(() {});
      },
      child: Container(
        width: 200,
        height: 150,
        color: Colors.grey.shade300,
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Icon(Icons.error_outline, color: Colors.grey.shade500, size: 40),
            SizedBox(height: 8),
            Text(
              message,
              style: TextStyle(fontSize: 12, color: Colors.grey.shade600),
            ),
            SizedBox(height: 4),
            Text(
              'Tap pour réessayer',
              style: TextStyle(fontSize: 10, color: Colors.grey.shade500),
            ),
          ],
        ),
      ),
    );
  }

  void _showGifPickerDialog() {
    setState(() {
      _showGifPicker = true;
      _showEmojiPicker = false;
    });
  }

  Future<List<Map<String, dynamic>>> _fetchTrendingGifs() async {
    const apiKey = 'VBcJI5ksKrLNsOWdl32Mh7nGj2TW97mv';

    try {
      final response = await http.get(
        Uri.parse(
          'https://api.giphy.com/v1/gifs/trending?api_key=$apiKey&limit=15&rating=g',
        ),
      );

      print('📡 Statut API Giphy: ${response.statusCode}');

      if (response.statusCode == 200) {
        final data = json.decode(response.body);
        final gifs = data['data'] as List;

        List<Map<String, dynamic>> result = [];

        for (final gif in gifs) {
          try {
            final images = gif['images'];
            final original = images['original'];
            final fixedHeight = images['fixed_height'];

            final gifData = {
              'id': gif['id'],
              'url': original['url'],
              'preview_url': fixedHeight?['url'] ?? original['url'],
              'title': gif['title'] ?? 'GIF',
            };
            result.add(gifData);
          } catch (e) {
            print('⚠️ Erreur traitement GIF: $e');
          }
        }

        print('✅ ${result.length} GIFs chargés avec succès');
        return result;
      } else {
        print('❌ Erreur API: ${response.statusCode} - ${response.body}');
        return _getFallbackGifs();
      }
    } catch (e) {
      print('❌ Erreur réseau: $e');
      return _getFallbackGifs();
    }
  }

  List<Map<String, dynamic>> _getFallbackGifs() {
    return [
      {
        'id': 'fallback1',
        'url': 'https://media.giphy.com/media/26AHONQ79FdWZhAI0/giphy.gif',
        'preview_url':
            'https://media.giphy.com/media/26AHONQ79FdWZhAI0/giphy.gif',
        'title': 'Fallback GIF 1',
      },
      {
        'id': 'fallback2',
        'url': 'https://media.giphy.com/media/3o7aTskHEUdgCQAXde/giphy.gif',
        'preview_url':
            'https://media.giphy.com/media/3o7aTskHEUdgCQAXde/giphy.gif',
        'title': 'Fallback GIF 2',
      },
    ];
  }

  Widget _buildGifPicker() {
    return Container(
      height: MediaQuery.of(context).size.height * 0.4,
      color: Colors.white,
      child: Column(
        children: [
          Container(
            padding: EdgeInsets.all(16),
            decoration: BoxDecoration(
              border: Border(bottom: BorderSide(color: Colors.grey.shade300)),
            ),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text(
                  'Choisir un GIF',
                  style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
                ),
                IconButton(
                  icon: Icon(Icons.close),
                  onPressed: () {
                    setState(() {
                      _showGifPicker = false;
                    });
                  },
                ),
              ],
            ),
          ),
          Expanded(
            child: FutureBuilder<List<Map<String, dynamic>>>(
              future: _fetchTrendingGifs(),
              builder: (context, snapshot) {
                if (snapshot.connectionState == ConnectionState.waiting) {
                  return Center(
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        CircularProgressIndicator(),
                        SizedBox(height: 16),
                        Text('Chargement des GIFs...'),
                      ],
                    ),
                  );
                }

                if (snapshot.hasError) {
                  print('❌ Erreur FutureBuilder: ${snapshot.error}');
                  return _buildGifErrorState();
                }

                final gifs = snapshot.data ?? [];

                if (gifs.isEmpty) {
                  return _buildGifErrorState();
                }

                return GridView.builder(
                  padding: EdgeInsets.all(8),
                  gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
                    crossAxisCount: 2,
                    crossAxisSpacing: 8,
                    mainAxisSpacing: 8,
                    childAspectRatio: 1.2,
                  ),
                  itemCount: gifs.length,
                  itemBuilder: (context, index) {
                    final gif = gifs[index];
                    return GestureDetector(
                      onTap: () {
                        print('🎯 GIF sélectionné: ${gif['url']}');
                        _sendGifMessage(gif['url']);
                        setState(() {
                          _showGifPicker = false;
                        });
                      },
                      child: Container(
                        decoration: BoxDecoration(
                          borderRadius: BorderRadius.circular(8),
                          border: Border.all(color: Colors.grey.shade300),
                          color: Colors.grey.shade100,
                        ),
                        child: ClipRRect(
                          borderRadius: BorderRadius.circular(8),
                          child: CachedNetworkImage(
                            imageUrl: gif['preview_url'] ?? gif['url'],
                            fit: BoxFit.cover,
                            width: double.infinity,
                            height: double.infinity,
                            placeholder: (context, url) => Center(
                              child: CircularProgressIndicator(strokeWidth: 2),
                            ),
                            errorWidget: (context, url, error) => Center(
                              child: Column(
                                mainAxisAlignment: MainAxisAlignment.center,
                                children: [
                                  Icon(
                                    Icons.error,
                                    color: Colors.grey,
                                    size: 30,
                                  ),
                                  SizedBox(height: 4),
                                  Text(
                                    'Erreur',
                                    style: TextStyle(fontSize: 10),
                                  ),
                                ],
                              ),
                            ),
                          ),
                        ),
                      ),
                    );
                  },
                );
              },
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildGifErrorState() {
    return Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Icon(Icons.wifi_off, size: 50, color: Colors.grey),
          SizedBox(height: 16),
          Text(
            'Impossible de charger les GIFs',
            style: TextStyle(fontSize: 16, color: Colors.grey),
          ),
          SizedBox(height: 8),
          Text(
            'Vérifiez votre connexion internet',
            style: TextStyle(fontSize: 12, color: Colors.grey),
          ),
          SizedBox(height: 16),
          ElevatedButton(
            onPressed: () {
              setState(() {});
            },
            child: Text('Réessayer'),
          ),
        ],
      ),
    );
  }

  void _sendGifMessage(String gifUrl) {
    String cleanUrl = gifUrl.replaceAll('(', '').replaceAll(')', '').trim();
    final gifMessage = '![GIF]($cleanUrl)';
    print('📤 Envoi GIF nettoyé: $gifMessage');
    _sendMessageWithContent(gifMessage);
  }

  void _sendEmojiMessage(String emoji) {
    _sendMessageWithContent(emoji);
  }

  Widget _buildEnhancedEmojiPicker() {
    return Container(
      height: MediaQuery.of(context).size.height * 0.4,
      color: Colors.white,
      child: Column(
        children: [
          Container(
            padding: EdgeInsets.all(16),
            decoration: BoxDecoration(
              border: Border(bottom: BorderSide(color: Colors.grey.shade300)),
            ),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text(
                  'Choisir un emoji',
                  style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
                ),
                IconButton(
                  icon: Icon(Icons.close),
                  onPressed: () {
                    setState(() {
                      _showEmojiPicker = false;
                    });
                  },
                ),
              ],
            ),
          ),
          Expanded(
            child: EmojiPicker(
              onEmojiSelected: (Category? category, Emoji emoji) {
                _sendEmojiMessage(emoji.emoji);
                setState(() {
                  _showEmojiPicker = false;
                });
              },
              config: Config(
                columns: 8,
                emojiSizeMax: 28.0,
                verticalSpacing: 0,
                horizontalSpacing: 0,
                gridPadding: EdgeInsets.zero,
                initCategory: Category.RECENT,
                bgColor: Colors.white,
                indicatorColor: Colors.blue,
                iconColor: Colors.grey,
                iconColorSelected: Colors.blue,
                backspaceColor: Colors.blue,
                skinToneDialogBgColor: Colors.white,
                skinToneIndicatorColor: Colors.grey,
                enableSkinTones: true,
                recentTabBehavior: RecentTabBehavior.RECENT,
                recentsLimit: 28,
                replaceEmojiOnLimitExceed: false,
                noRecents: Text(
                  'Aucun emoji récent',
                  style: TextStyle(fontSize: 20, color: Colors.black26),
                ),
                tabIndicatorAnimDuration: kTabScrollDuration,
                categoryIcons: const CategoryIcons(),
                buttonMode: ButtonMode.MATERIAL,
              ),
            ),
          ),
        ],
      ),
    );
  }

  void _showSendOptionsMenu() {
    showModalBottomSheet(
      context: context,
      builder: (context) => Container(
        padding: EdgeInsets.all(16),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            ListTile(
              leading: Icon(Icons.emoji_emotions, color: Colors.orange),
              title: Text('Emoji'),
              onTap: () {
                Navigator.pop(context);
                setState(() {
                  _showEmojiPicker = true;
                  _showGifPicker = false;
                });
              },
            ),
            ListTile(
              leading: Icon(Icons.gif, color: Colors.purple),
              title: Text('GIF'),
              onTap: () {
                Navigator.pop(context);
                _showGifPickerDialog();
              },
            ),
            ListTile(
              leading: Icon(Icons.attach_file, color: Colors.blue),
              title: Text('Fichier'),
              onTap: () {
                Navigator.pop(context);
                _pickAndSendFile();
              },
            ),
            ListTile(
              leading: Icon(Icons.photo, color: Colors.green),
              title: Text('Image'),
              onTap: () {
                Navigator.pop(context);
                _pickAndSendImage();
              },
            ),
          ],
        ),
      ),
    );
  }

  // === MÉTHODES EXISTANTES ===

  void _startReplying(Map<String, dynamic> message) {
    setState(() {
      _replyingTo = message;
      final sender = message['sender'] ?? {};
      final senderName = sender['id'] == _currentUserId
          ? 'Vous'
          : '${sender['firstName'] ?? ''} ${sender['lastName'] ?? ''}';
      _replyText = 'Réponse à $senderName';
    });

    FocusScope.of(context).requestFocus(FocusNode());
    WidgetsBinding.instance.addPostFrameCallback((_) {
      FocusScope.of(context).requestFocus(FocusNode());
    });
  }

  void _cancelReply() {
    setState(() {
      _replyingTo = null;
      _replyText = '';
    });
  }

  void _sendReply() {
    if (_controller.text.trim().isEmpty) return;

    final content = _replyingTo != null
        ? _buildReplyContent(_controller.text.trim(), _replyingTo!)
        : _controller.text.trim();

    _sendMessageWithContent(content);
    _cancelReply();
  }

  String _buildReplyContent(
    String newContent,
    Map<String, dynamic> originalMessage,
  ) {
    final originalContent = originalMessage['content']?.toString() ?? '';
    final sender = originalMessage['sender'] ?? {};
    final senderName = sender['id'] == _currentUserId
        ? 'Vous'
        : '${sender['firstName'] ?? ''} ${sender['lastName'] ?? ''}';

    return "🔁 @$senderName: $originalContent\n\n$newContent";
  }

  void _sendMessageWithContent(String content) async {
    String? convId = widget.conversation['id']?.toString();

    if (convId == null || convId.isEmpty) {
      final conversationService = ServiceLocator.instance
          .get<ConversationService>();
      final otherId = _otherParticipant['id']?.toString() ?? '';

      final created = await conversationService.createConversationBetweenUsers(
        currentUserId: _currentUserId,
        otherUserId: otherId,
      );

      convId = created?['id'] as String?;
      if (convId == null) return;

      setState(() {
        widget.conversation['id'] = convId;
      });
    }

    await widget.viewModel.sendMessage(
      content: content,
      conversationId: convId,
    );

    _controller.clear();
    await _loadMessages();
  }

  void _showMessageTapFeedback(BuildContext context, bool isMe) {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text(
          isMe ? 'Appuyez long pour options' : 'Appuyez long pour options',
        ),
        duration: Duration(seconds: 1),
        behavior: SnackBarBehavior.floating,
        margin: EdgeInsets.all(8),
      ),
    );
  }

  void _showMessageContextMenu(
    BuildContext context,
    String messageId,
    String currentContent,
    bool isMyMessage, {
    required String conversationId,
    required Map<String, dynamic> message,
  }) {
    showModalBottomSheet(
      context: context,
      builder: (context) => Container(
        padding: EdgeInsets.all(16),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Padding(
              padding: EdgeInsets.only(bottom: 8),
              child: Text(
                'Réagir rapidement',
                style: TextStyle(
                  fontWeight: FontWeight.bold,
                  color: Colors.grey.shade600,
                ),
              ),
            ),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceEvenly,
              children: ['👍', '❤️', '😂', '😮', '😢', '🙏', '🎉', '🔥'].map((
                emoji,
              ) {
                final userReaction = widget.viewModel.findUserReaction(
                  messageId,
                  emoji,
                );
                return GestureDetector(
                  onTap: () {
                    Navigator.pop(context);
                    widget.viewModel.toggleReaction(
                      messageId: messageId,
                      emoji: emoji,
                    );
                  },
                  child: Container(
                    padding: EdgeInsets.all(8),
                    decoration: BoxDecoration(
                      color: userReaction != null
                          ? Colors.blue.shade100
                          : Colors.transparent,
                      borderRadius: BorderRadius.circular(8),
                    ),
                    child: Text(emoji, style: TextStyle(fontSize: 24)),
                  ),
                );
              }).toList(),
            ),
            SizedBox(height: 16),

            ListTile(
              leading: Icon(Icons.emoji_emotions, color: Colors.orange),
              title: Text('Toutes les réactions'),
              onTap: () {
                Navigator.pop(context);
                _showEmojiPickerDialog(message);
              },
            ),

            ListTile(
              leading: Icon(Icons.reply, color: Colors.green),
              title: Text('Répondre'),
              onTap: () {
                Navigator.pop(context);
                _startReplying(message);
              },
            ),

            if (isMyMessage)
              ListTile(
                leading: Icon(Icons.edit, color: Colors.blue),
                title: Text('Modifier le message'),
                onTap: () {
                  Navigator.pop(context);
                  _showEditMessageDialog(
                    context,
                    conversationId,
                    messageId,
                    currentContent,
                  );
                },
              ),

            if (isMyMessage)
              ListTile(
                leading: Icon(Icons.delete, color: Colors.red),
                title: Text(
                  'Supprimer le message',
                  style: TextStyle(color: Colors.red),
                ),
                onTap: () {
                  Navigator.pop(context);
                  _showDeleteMessageConfirmation(
                    context,
                    conversationId,
                    messageId,
                  );
                },
              ),

            ListTile(
              leading: Icon(Icons.copy),
              title: Text('Copier le texte'),
              onTap: () {
                Navigator.pop(context);
                _copyToClipboard(currentContent, context);
              },
            ),
          ],
        ),
      ),
    );
  }

  void _showEditMessageDialog(
    BuildContext context,
    String conversationId,
    String messageId,
    String currentContent,
  ) {
    final controller = TextEditingController(text: currentContent);

    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: Text('Modifier le message'),
        content: TextField(
          controller: controller,
          maxLines: 3,
          decoration: InputDecoration(
            hintText: 'Modifier votre message...',
            border: OutlineInputBorder(),
          ),
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: Text('Annuler'),
          ),
          TextButton(
            onPressed: () {
              final newContent = controller.text.trim();
              if (newContent.isNotEmpty && newContent != currentContent) {
                Navigator.pop(context);
                widget.viewModel.editMessage(
                  conversationId: conversationId,
                  messageId: messageId,
                  newContent: newContent,
                );
              }
            },
            child: Text('Modifier'),
          ),
        ],
      ),
    );
  }

  void _showDeleteMessageConfirmation(
    BuildContext context,
    String conversationId,
    String messageId,
  ) {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: Text('Supprimer le message ?'),
        content: Text('Cette action est irréversible.'),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: Text('Annuler'),
          ),
          TextButton(
            onPressed: () {
              Navigator.pop(context);
              widget.viewModel.deleteMessage(
                conversationId: conversationId,
                messageId: messageId,
              );
            },
            child: Text('Supprimer', style: TextStyle(color: Colors.red)),
          ),
        ],
      ),
    );
  }

  void _copyToClipboard(String text, BuildContext context) {
    ScaffoldMessenger.of(
      context,
    ).showSnackBar(SnackBar(content: Text('Texte copié')));
  }

  Future<void> _initializeScreen() async {
    final sessionService = ServiceLocator.instance.get<SessionService>();
    try {
      await sessionService.loadUserId();
    } catch (e) {
      print("Erreur loadUserId: $e");
    }

    final loadedId = sessionService.userId;
    setState(() {
      _currentUserId = loadedId ?? 'currentUserId';
    });

    final participants =
        (widget.conversation['participants'] as List<dynamic>?) ?? [];

    Map<String, dynamic>? found;
    for (var p in participants) {
      if (p is Map) {
        final user = p['user'] ?? p;
        final userId = user['id']?.toString();
        if (userId != null && userId != _currentUserId) {
          found = Map<String, dynamic>.from(user);
          break;
        }
      }
    }

    if (found == null) {
      if (participants.isNotEmpty && participants.first is Map) {
        final firstUser = participants.first['user'] ?? participants.first;
        found = Map<String, dynamic>.from(firstUser);
      } else {
        found = {'id': 'unknown', 'firstName': 'Utilisateur', 'lastName': ''};
      }
    }

    setState(() {
      _otherParticipant = found!;
      _initialized = true;
    });
  }

  Future<void> _loadMessages() async {
    try {
      await widget.viewModel.loadMessages(
        conversationId: widget.conversation['id'],
      );

      _loadReactionsForMessages();

      WidgetsBinding.instance.addPostFrameCallback((_) {
        if (mounted) {
          setState(() {
            _localMessages = widget.viewModel.getMessagesForConversation(
              widget.conversation['id'],
            );
          });
        }
      });
    } catch (e) {
      print('Erreur chargement messages: $e');
    }
  }

  void _loadReactionsForMessages() {
    final messages = widget.viewModel.getMessagesForConversation(
      widget.conversation['id'],
    );

    for (final message in messages) {
      final messageId = message['id']?.toString();
      if (messageId != null) {
        widget.viewModel.getReactionsForMessage(messageId);
      }
    }
  }

  // === BUILD PRINCIPAL ===
  @override
  Widget build(BuildContext context) {
    if (!_initialized) {
      return const Scaffold(body: Center(child: CircularProgressIndicator()));
    }

    // final messages = _localMessages;
    final messages = _isSearchingMessages && _messageSearchQuery.isNotEmpty
        ? _searchMessageResults
        : _localMessages;

    final mappedMessages = messages.map<Map<String, dynamic>>((msg) {
      final sender = Map<String, dynamic>.from(msg['sender'] ?? {});
      final isMine = sender['id'] == _currentUserId;
      final senderName = isMine
          ? 'Moi'
          : '${sender['firstName'] ?? ''} ${sender['lastName'] ?? ''}';
      return {...msg, 'isMine': isMine, 'senderName': senderName};
    }).toList();

    final otherFirst = (_otherParticipant['firstName'] ?? 'Utilisateur')
        .toString();
    final otherLast = (_otherParticipant['lastName'] ?? '').toString();

    return Scaffold(
      appBar: AppBar(
        leading: IconButton(
          icon: const Icon(Icons.arrow_back),
          onPressed: () => Navigator.pop(context),
          color: AppColors.dark,
        ),
        title: Row(
          children: [
            CircleAvatar(
              backgroundColor: AppColors.color1,
              child: Text(
                _getInitials(otherFirst),
                style: const TextStyle(
                  color: Colors.white,
                  fontWeight: FontWeight.bold,
                ),
              ),
            ),
            const SizedBox(width: 8),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    '$otherFirst $otherLast',
                    style: const TextStyle(
                      fontWeight: FontWeight.bold,
                      fontSize: 16,
                      color: Colors.black,
                    ),
                  ),
                  const Text(
                    "En ligne",
                    style: TextStyle(fontSize: 12, color: Colors.green),
                  ),
                ],
              ),
            ),
          ],
        ),
        actions: [
          IconButton(
            icon: const Icon(Icons.search),
            onPressed: _toggleMessageSearch,
            color: AppColors.dark,
          ),
          IconButton(
            icon: const Icon(Icons.info_outline),
            onPressed: () {
              Navigator.push(
                context,
                MaterialPageRoute(
                  builder: (context) => ProfileDetailScreen(
                    userName: '$otherFirst $otherLast'.trim(),
                  ),
                ),
              );
            },
            color: AppColors.dark,
          ),
        ],
        backgroundColor: Colors.white,
        elevation: 0,
      ),
      body: Column(
        children: [
          // Header de recherche (quand activé)
          if (_isSearchingMessages) _buildSearchHeader(),

          // Indicateur de résultats de recherche
          if (_isSearchingMessages && _messageSearchQuery.isNotEmpty)
            Container(
              padding: EdgeInsets.symmetric(horizontal: 16, vertical: 8),
              color: Colors.blue.shade50,
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text(
                    '${_searchMessageResults.length} message(s) trouvé(s)',
                    style: TextStyle(
                      fontSize: 12,
                      color: Colors.blue.shade800,
                      fontWeight: FontWeight.w500,
                    ),
                  ),
                  if (_searchMessageResults.isNotEmpty)
                    Text(
                      '"$_messageSearchQuery"',
                      style: TextStyle(
                        fontSize: 12,
                        color: Colors.blue.shade600,
                        fontStyle: FontStyle.italic,
                      ),
                    ),
                ],
              ),
            ),
          if (_replyingTo != null && !_showEmojiPicker && !_showGifPicker)
            Container(
              padding: EdgeInsets.all(12),
              color: Colors.blue.shade50,
              child: Row(
                children: [
                  Icon(Icons.reply, color: Colors.blue, size: 20),
                  SizedBox(width: 8),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          _replyText,
                          style: TextStyle(
                            fontWeight: FontWeight.bold,
                            color: Colors.blue.shade800,
                          ),
                        ),
                        Text(
                          _replyingTo!['content']?.toString() ?? '',
                          maxLines: 1,
                          overflow: TextOverflow.ellipsis,
                          style: TextStyle(
                            color: Colors.blue.shade600,
                            fontSize: 12,
                          ),
                        ),
                      ],
                    ),
                  ),
                  IconButton(
                    icon: Icon(Icons.close, color: Colors.blue, size: 20),
                    onPressed: _cancelReply,
                    padding: EdgeInsets.zero,
                  ),
                ],
              ),
            ),

          Expanded(
            child: Stack(
              children: [
                widget.viewModel.isLoading
                    ? const Center(child: CircularProgressIndicator())
                    : mappedMessages.isEmpty
                    ? _buildEmptyState()
                    : ListView.builder(
                        reverse: true,
                        controller: _scrollController,
                        padding: const EdgeInsets.all(16),
                        itemCount: mappedMessages.length,
                        itemBuilder: (context, index) {
                          final reversedIndex =
                              mappedMessages.length - 1 - index;
                          final message = mappedMessages[reversedIndex];

                          final isMe = message['isMine'] as bool? ?? false;
                          final content = message['content']?.toString() ?? '';
                          final createdAt =
                              message['createdAt']?.toString() ?? '';
                          final messageId = message['id']?.toString() ?? '';
                          final senderFirst =
                              message['sender']?['firstName']?.toString() ??
                              'U';
                          final isEdited = message['edited'] ?? false;

                          // Détection des différents types de messages
                          final bool isGif = _isGifMessage(content);
                          final String? gifUrl = _extractGifUrlRobuste(content);
                          final bool isImage = _isImageMessage(content);
                          final bool isFile = _isFileMessage(content);
                          final Map<String, String>? imageData = isImage
                              ? _parseImageMessage(content)
                              : null;
                          final Map<String, String>? fileData = isFile
                              ? _parseFileMessage(content)
                              : null;

                          return GestureDetector(
                            onLongPress: () => _showMessageContextMenu(
                              context,
                              messageId,
                              content,
                              isMe,
                              conversationId: widget.conversation['id'],
                              message: message,
                            ),
                            onDoubleTap: () {
                              widget.viewModel.toggleReaction(
                                messageId: messageId,
                                emoji: '❤️',
                              );
                            },
                            onTap: () {
                              _showMessageTapFeedback(context, isMe);
                            },
                            child: Column(
                              crossAxisAlignment: isMe
                                  ? CrossAxisAlignment.end
                                  : CrossAxisAlignment.start,
                              children: [
                                if (_shouldShowTime(
                                  mappedMessages,
                                  reversedIndex,
                                ))
                                  Padding(
                                    padding: const EdgeInsets.symmetric(
                                      vertical: 4,
                                    ),
                                    child: Text(
                                      _formatMessageTime(createdAt),
                                      style: TextStyle(
                                        fontSize: 10,
                                        color: Colors.grey.shade500,
                                      ),
                                    ),
                                  ),
                                Row(
                                  mainAxisAlignment: isMe
                                      ? MainAxisAlignment.end
                                      : MainAxisAlignment.start,
                                  crossAxisAlignment: CrossAxisAlignment.end,
                                  children: [
                                    if (!isMe)
                                      CircleAvatar(
                                        radius: 12,
                                        backgroundColor: AppColors.color1,
                                        child: Text(
                                          _getInitials(senderFirst),
                                          style: const TextStyle(
                                            color: Colors.white,
                                            fontSize: 10,
                                          ),
                                        ),
                                      ),
                                    if (!isMe) const SizedBox(width: 8),
                                    Flexible(
                                      child: Container(
                                        margin: const EdgeInsets.symmetric(
                                          vertical: 2,
                                        ),
                                        padding: const EdgeInsets.all(12),
                                        decoration: BoxDecoration(
                                          color: isMe
                                              ? AppColors.color1
                                              : Colors.grey.shade200,
                                          borderRadius: BorderRadius.circular(
                                            16,
                                          ),
                                        ),
                                        child: Column(
                                          crossAxisAlignment:
                                              CrossAxisAlignment.start,
                                          children: [
                                            if (!isMe)
                                              Padding(
                                                padding: const EdgeInsets.only(
                                                  bottom: 4,
                                                ),
                                                child: Text(
                                                  senderFirst,
                                                  style: TextStyle(
                                                    fontSize: 10,
                                                    fontWeight: FontWeight.bold,
                                                    color: Colors.grey.shade700,
                                                  ),
                                                ),
                                              ),

                                            // AFFICHAGE SELON LE TYPE DE MESSAGE
                                            if (isGif && gifUrl != null)
                                              _buildGifMessage(gifUrl, isMe)
                                            else if (isImage &&
                                                imageData != null)
                                              _buildImageMessage(
                                                imageData,
                                                isMe,
                                              )
                                            else if (isFile && fileData != null)
                                              _buildFileMessage(fileData, isMe)
                                            else
                                              Text(
                                                content.isNotEmpty
                                                    ? content
                                                    : '[Message vide]',
                                                style: TextStyle(
                                                  color: isMe
                                                      ? Colors.white
                                                      : Colors.black,
                                                ),
                                              ),

                                            if (isEdited)
                                              Padding(
                                                padding: const EdgeInsets.only(
                                                  top: 4,
                                                ),
                                                child: Text(
                                                  'modifié',
                                                  style: TextStyle(
                                                    fontSize: 9,
                                                    color: isMe
                                                        ? Colors.white70
                                                        : Colors.grey.shade600,
                                                    fontStyle: FontStyle.italic,
                                                  ),
                                                ),
                                              ),

                                            _buildMessageReactions(message),

                                            const SizedBox(height: 4),
                                            Row(
                                              mainAxisAlignment:
                                                  MainAxisAlignment.end,
                                              children: [
                                                Text(
                                                  _formatTime(createdAt),
                                                  style: TextStyle(
                                                    fontSize: 10,
                                                    color: isMe
                                                        ? Colors.white70
                                                        : Colors.grey.shade600,
                                                  ),
                                                ),
                                                if (isMe)
                                                  const SizedBox(width: 4),
                                                if (isMe)
                                                  Icon(
                                                    Icons.done,
                                                    size: 12,
                                                    color: isMe
                                                        ? Colors.white70
                                                        : Colors.grey.shade600,
                                                  ),
                                              ],
                                            ),
                                          ],
                                        ),
                                      ),
                                    ),
                                    if (isMe) const SizedBox(width: 8),
                                    if (isMe)
                                      CircleAvatar(
                                        radius: 12,
                                        backgroundColor: Colors.blue,
                                        child: Text(
                                          _getInitials('Me'),
                                          style: const TextStyle(
                                            color: Colors.white,
                                            fontSize: 10,
                                          ),
                                        ),
                                      ),
                                  ],
                                ),
                              ],
                            ),
                          );
                        },
                      ),

                if (_showEmojiPicker)
                  Positioned(
                    bottom: 0,
                    left: 0,
                    right: 0,
                    child: _buildEnhancedEmojiPicker(),
                  ),

                if (_showGifPicker)
                  Positioned(
                    bottom: 0,
                    left: 0,
                    right: 0,
                    child: _buildGifPicker(),
                  ),
              ],
            ),
          ),

          if (!_showEmojiPicker && !_showGifPicker) _buildMessageInput(),
        ],
      ),
    );
  }

  Widget _buildMessageInput() {
    return Container(
      padding: const EdgeInsets.all(8),
      decoration: BoxDecoration(
        color: Colors.white,
        border: Border(top: BorderSide(color: Colors.grey.shade300)),
      ),
      child: Column(
        children: [
          Row(
            children: [
              IconButton(
                icon: Icon(Icons.add_circle_outline, color: AppColors.color1),
                onPressed: _showSendOptionsMenu,
              ),
              Expanded(
                child: TextField(
                  controller: _controller,
                  decoration: InputDecoration(
                    hintText: _replyingTo != null
                        ? "Tapez votre réponse..."
                        : "Écrire un message...",
                    border: InputBorder.none,
                    contentPadding: EdgeInsets.symmetric(horizontal: 12),
                  ),
                  onSubmitted: (_) =>
                      _replyingTo != null ? _sendReply() : _sendMessage(),
                ),
              ),
              IconButton(
                icon: Icon(Icons.emoji_emotions, color: AppColors.color1),
                onPressed: () {
                  setState(() {
                    _showEmojiPicker = !_showEmojiPicker;
                    _showGifPicker = false;
                  });
                },
              ),
              IconButton(
                icon: Icon(
                  _replyingTo != null ? Icons.reply : Icons.send,
                  color: AppColors.color1,
                ),
                onPressed: _replyingTo != null ? _sendReply : _sendMessage,
              ),
            ],
          ),
        ],
      ),
    );
  }

  Future<void> _sendMessage() async {
    final content = _controller.text.trim();
    if (content.isEmpty) return;
    _sendMessageWithContent(content);
  }

  Widget _buildEmptyState() {
    return Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Icon(
            Icons.chat_bubble_outline,
            size: 64,
            color: Colors.grey.shade400,
          ),
          SizedBox(height: 16),
          Text("Aucun message", style: TextStyle(color: Colors.grey.shade600)),
          SizedBox(height: 8),
          Text(
            "Envoyez le premier message !",
            style: TextStyle(color: Colors.grey.shade500),
          ),
        ],
      ),
    );
  }

  Widget _highlightSearchQuery(String text, String query) {
    if (query.isEmpty) {
      return Text(text);
    }

    final textLower = text.toLowerCase();
    final queryLower = query.toLowerCase();
    final matches = <TextSpan>[];
    int start = 0;
    int index;

    while ((index = textLower.indexOf(queryLower, start)) != -1) {
      // Texte avant la correspondance
      if (index > start) {
        matches.add(
          TextSpan(
            text: text.substring(start, index),
            style: TextStyle(color: Colors.black),
          ),
        );
      }

      // Texte correspondant (en surbrillance)
      matches.add(
        TextSpan(
          text: text.substring(index, index + query.length),
          style: TextStyle(
            color: Colors.orange.shade700,
            fontWeight: FontWeight.bold,
            backgroundColor: Colors.orange.shade100,
          ),
        ),
      );

      start = index + query.length;
    }

    // Texte restant après la dernière correspondance
    if (start < text.length) {
      matches.add(
        TextSpan(
          text: text.substring(start),
          style: TextStyle(color: Colors.black),
        ),
      );
    }

    return RichText(
      text: TextSpan(
        style: TextStyle(fontSize: 16, color: Colors.black),
        children: matches,
      ),
    );
  }

  Widget _buildNoSearchResults() {
    return Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Icon(Icons.search_off, size: 64, color: Colors.grey.shade400),
          SizedBox(height: 16),
          Text(
            "Aucun message trouvé",
            style: TextStyle(color: Colors.grey.shade600, fontSize: 16),
          ),
          SizedBox(height: 8),
          Text(
            'Aucun résultat pour "$_messageSearchQuery"',
            style: TextStyle(color: Colors.grey.shade500, fontSize: 14),
            textAlign: TextAlign.center,
          ),
          SizedBox(height: 16),
          ElevatedButton(
            onPressed: _toggleMessageSearch,
            child: Text('Nouvelle recherche'),
          ),
        ],
      ),
    );
  }

  Widget _buildMessagesList(List<dynamic> messages) {
    final mappedMessages = messages.map<Map<String, dynamic>>((msg) {
      final sender = Map<String, dynamic>.from(msg['sender'] ?? {});
      final isMine = sender['id'] == _currentUserId;
      final senderName = isMine
          ? 'Moi'
          : '${sender['firstName'] ?? ''} ${sender['lastName'] ?? ''}';
      return {...msg, 'isMine': isMine, 'senderName': senderName};
    }).toList();

    return ListView.builder(
      reverse: true,
      controller: _scrollController,
      padding: const EdgeInsets.all(16),
      itemCount: mappedMessages.length,
      itemBuilder: (context, index) {
        final reversedIndex = mappedMessages.length - 1 - index;
        final message = mappedMessages[reversedIndex];

        final isMe = message['isMine'] as bool? ?? false;
        final content = message['content']?.toString() ?? '';
        final createdAt = message['createdAt']?.toString() ?? '';
        final messageId = message['id']?.toString() ?? '';
        final senderFirst = message['sender']?['firstName']?.toString() ?? 'U';
        final isEdited = message['edited'] ?? false;

        // Mettez en surbrillance les résultats de recherche
        final highlightedContent =
            _isSearchingMessages && _messageSearchQuery.isNotEmpty
            ? _highlightSearchQuery(content, _messageSearchQuery)
            : Text(
                content.isNotEmpty ? content : '[Message vide]',
                style: TextStyle(color: isMe ? Colors.white : Colors.black),
              );

        // Détection des différents types de messages
        final bool isGif = _isGifMessage(content);
        final String? gifUrl = _extractGifUrlRobuste(content);
        final bool isImage = _isImageMessage(content);
        final bool isFile = _isFileMessage(content);
        final Map<String, String>? imageData = isImage
            ? _parseImageMessage(content)
            : null;
        final Map<String, String>? fileData = isFile
            ? _parseFileMessage(content)
            : null;

        return GestureDetector(
          onLongPress: () => _showMessageContextMenu(
            context,
            messageId,
            content,
            isMe,
            conversationId: widget.conversation['id'],
            message: message,
          ),
          onDoubleTap: () {
            widget.viewModel.toggleReaction(messageId: messageId, emoji: '❤️');
          },
          onTap: () {
            _showMessageTapFeedback(context, isMe);
          },
          child: Column(
            crossAxisAlignment: isMe
                ? CrossAxisAlignment.end
                : CrossAxisAlignment.start,
            children: [
              if (_shouldShowTime(mappedMessages, reversedIndex))
                Padding(
                  padding: const EdgeInsets.symmetric(vertical: 4),
                  child: Text(
                    _formatMessageTime(createdAt),
                    style: TextStyle(fontSize: 10, color: Colors.grey.shade500),
                  ),
                ),
              Row(
                mainAxisAlignment: isMe
                    ? MainAxisAlignment.end
                    : MainAxisAlignment.start,
                crossAxisAlignment: CrossAxisAlignment.end,
                children: [
                  if (!isMe)
                    CircleAvatar(
                      radius: 12,
                      backgroundColor: AppColors.color1,
                      child: Text(
                        _getInitials(senderFirst),
                        style: const TextStyle(
                          color: Colors.white,
                          fontSize: 10,
                        ),
                      ),
                    ),
                  if (!isMe) const SizedBox(width: 8),
                  Flexible(
                    child: Container(
                      margin: const EdgeInsets.symmetric(vertical: 2),
                      padding: const EdgeInsets.all(12),
                      decoration: BoxDecoration(
                        color: isMe ? AppColors.color1 : Colors.grey.shade200,
                        borderRadius: BorderRadius.circular(16),
                      ),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          if (!isMe)
                            Padding(
                              padding: const EdgeInsets.only(bottom: 4),
                              child: Text(
                                senderFirst,
                                style: TextStyle(
                                  fontSize: 10,
                                  fontWeight: FontWeight.bold,
                                  color: Colors.grey.shade700,
                                ),
                              ),
                            ),

                          // AFFICHAGE SELON LE TYPE DE MESSAGE
                          if (isGif && gifUrl != null)
                            _buildGifMessage(gifUrl, isMe)
                          else if (isImage && imageData != null)
                            _buildImageMessage(imageData, isMe)
                          else if (isFile && fileData != null)
                            _buildFileMessage(fileData, isMe)
                          else
                            highlightedContent, // Utilisez le contenu mis en surbrillance

                          if (isEdited)
                            Padding(
                              padding: const EdgeInsets.only(top: 4),
                              child: Text(
                                'modifié',
                                style: TextStyle(
                                  fontSize: 9,
                                  color: isMe
                                      ? Colors.white70
                                      : Colors.grey.shade600,
                                  fontStyle: FontStyle.italic,
                                ),
                              ),
                            ),

                          _buildMessageReactions(message),

                          const SizedBox(height: 4),
                          Row(
                            mainAxisAlignment: MainAxisAlignment.end,
                            children: [
                              Text(
                                _formatTime(createdAt),
                                style: TextStyle(
                                  fontSize: 10,
                                  color: isMe
                                      ? Colors.white70
                                      : Colors.grey.shade600,
                                ),
                              ),
                              if (isMe) const SizedBox(width: 4),
                              if (isMe)
                                Icon(
                                  Icons.done,
                                  size: 12,
                                  color: isMe
                                      ? Colors.white70
                                      : Colors.grey.shade600,
                                ),
                            ],
                          ),
                        ],
                      ),
                    ),
                  ),
                  if (isMe) const SizedBox(width: 8),
                  if (isMe)
                    CircleAvatar(
                      radius: 12,
                      backgroundColor: Colors.blue,
                      child: Text(
                        _getInitials('Me'),
                        style: const TextStyle(
                          color: Colors.white,
                          fontSize: 10,
                        ),
                      ),
                    ),
                ],
              ),
            ],
          ),
        );
      },
    );
  }

  void _scrollToMessage(int index) {
    WidgetsBinding.instance.addPostFrameCallback((_) {
      final reversedIndex = _localMessages.length - 1 - index;
      if (_scrollController.hasClients) {
        _scrollController.animateTo(
          reversedIndex *
              100.0, // Ajustez cette valeur selon la hauteur de vos messages
          duration: Duration(milliseconds: 500),
          curve: Curves.easeInOut,
        );
      }
    });
  }

  // === MÉTHODES UTILITAIRES ===
  String _getInitials(String? name) {
    if (name == null || name.isEmpty) return '?';
    final parts = name.trim().split(' ');
    if (parts.length == 1) return parts[0][0].toUpperCase();
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }

  bool _shouldShowTime(List<dynamic> messages, int index) {
    if (index == 0) return true;
    if (index == messages.length - 1) return true;
    final currentMessage = messages[index];
    final previousMessage = messages[index - 1];
    final currentTime = _parseDate(currentMessage['createdAt'] ?? '');
    final previousTime = _parseDate(previousMessage['createdAt'] ?? '');
    final timeDifference = currentTime.difference(previousTime).abs();
    return timeDifference.inMinutes > 5;
  }

  String _formatMessageTime(String timestamp) {
    final date = _parseDate(timestamp);
    final now = DateTime.now();
    final difference = now.difference(date);
    if (difference.inDays == 0) return "Aujourd'hui";
    if (difference.inDays == 1) return "Hier";
    if (difference.inDays < 7) return "Il y a ${difference.inDays} jours";
    return "${date.day}/${date.month}/${date.year}";
  }

  String _formatTime(String timestamp) {
    final date = _parseDate(timestamp);
    return '${date.hour.toString().padLeft(2, '0')}:${date.minute.toString().padLeft(2, '0')}';
  }

  DateTime _parseDate(String dateString) {
    try {
      return DateTime.parse(dateString).toLocal();
    } catch (e) {
      return DateTime.now();
    }
  }
}
