import 'dart:io';
import 'dart:convert';
import 'package:safe_driving/core/utils/checksum.dart';

class UploadClient {
  Future<String?> putFile(
    String adjustedUrl,
    File file, {
    required String contentType,
  }) async {
    final client = HttpClient();
    try {
      final parsed = Uri.parse(adjustedUrl);
      final hasChecksumParam =
          parsed.queryParameters.containsKey('x-amz-checksum-crc32') ||
          parsed.queryParameters.containsKey('X-Amz-Checksum-Crc32');

      final req = await client.putUrl(parsed);
      req.headers.set(HttpHeaders.contentTypeHeader, contentType);
      final bytes = await file.readAsBytes();

      try {
        if (!hasChecksumParam) {
          final checksum = ChecksumUtil.crc32Base64(bytes);
          req.headers.set('x-amz-checksum-crc32', checksum);
        }
      } catch (_) {}

      req.add(bytes);
      final resp = await req.close();
      if (resp.statusCode < 200 || resp.statusCode >= 300) {
        final body = await resp.transform(utf8.decoder).join();
        throw HttpException('S3 upload failed: ${resp.statusCode} - $body');
      }
      return resp.headers.value('etag');
    } finally {
      client.close(force: true);
    }
  }
}
