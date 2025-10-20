import 'package:path/path.dart' as p;

class ContentTypeUtil {
  static String infer(String path) {
    final lower = p.extension(path).toLowerCase();
    if (lower == '.png') return 'image/png';
    if (lower == '.jpg' || lower == '.jpeg') return 'image/jpeg';
    if (lower == '.heic') return 'image/heic';
    return 'image/jpeg';
  }
}
