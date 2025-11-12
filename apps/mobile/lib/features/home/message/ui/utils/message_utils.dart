class MessageUtils {
  bool isImageMessage(String content) {
    return content.startsWith('🖼️IMAGE:');
  }

  bool isFileMessage(String content) {
    return content.startsWith('📁FILE:');
  }

  bool isGifMessage(String content) {
    return content.startsWith('![GIF](') && content.contains('http') ||
        content.startsWith('http') && content.contains('.gif');
  }

  String? extractGifUrlRobuste(String content) {
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

  Map<String, String>? parseImageMessage(String content) {
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

  Map<String, String>? parseFileMessage(String content) {
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

  String formatFileSize(int bytes) {
    if (bytes < 1024) return '$bytes B';
    if (bytes < 1048576) return '${(bytes / 1024).toStringAsFixed(1)} KB';
    return '${(bytes / 1048576).toStringAsFixed(1)} MB';
  }

  String getFileIcon(String extension) {
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
}
