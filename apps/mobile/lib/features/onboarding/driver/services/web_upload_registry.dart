import 'dart:typed_data';

class WebUploadRegistry {
  static final Map<String, Uint8List> _bytesByPath = <String, Uint8List>{};
  static final Map<String, String> _contentTypeByPath = <String, String>{};

  static void register(String path, List<int> bytes, {String? contentType}) {
    _bytesByPath[path] = Uint8List.fromList(bytes);
    if (contentType != null && contentType.isNotEmpty) {
      _contentTypeByPath[path] = contentType;
    }
  }

  static Uint8List? getBytes(String path) => _bytesByPath[path];

  static String? getContentType(String path) => _contentTypeByPath[path];

  static void unregister(String path) {
    _bytesByPath.remove(path);
    _contentTypeByPath.remove(path);
  }

  static void clear() {
    _bytesByPath.clear();
    _contentTypeByPath.clear();
  }
}

