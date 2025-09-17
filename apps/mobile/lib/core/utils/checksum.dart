import 'dart:convert';
import 'dart:typed_data';

class ChecksumUtil {
  ChecksumUtil._();

  static List<int>? _crc32Table;

  static List<int> _initCrc32Table() {
    final table = List<int>.filled(256, 0);
    const polynomial = 0xEDB88320;
    for (int i = 0; i < 256; i++) {
      int c = i;
      for (int j = 0; j < 8; j++) {
        if ((c & 1) != 0) {
          c = polynomial ^ (c >>> 1);
        } else {
          c = c >>> 1;
        }
      }
      table[i] = c >>> 0;
    }
    return table;
  }

  static int _crc32(Uint8List data) {
    _crc32Table ??= _initCrc32Table();
    int crc = 0xFFFFFFFF;
    for (int i = 0; i < data.length; i++) {
      final index = (crc ^ data[i]) & 0xFF;
      crc = (_crc32Table![index] ^ (crc >>> 8)) >>> 0;
    }
    return (~crc) >>> 0;
  }

  static String crc32Base64(Uint8List data) {
    final crc = _crc32(data);
    final bytes = Uint8List(4)
      ..[0] = (crc >> 24) & 0xFF
      ..[1] = (crc >> 16) & 0xFF
      ..[2] = (crc >> 8) & 0xFF
      ..[3] = (crc) & 0xFF;
    return base64Encode(bytes);
  }
}
