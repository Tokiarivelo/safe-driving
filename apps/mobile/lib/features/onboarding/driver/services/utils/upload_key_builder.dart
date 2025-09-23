class UploadKeyBuilder {
  static String buildS3Key(
    String userId,
    String documentType,
    String fileName,
  ) {
    final ts = DateTime.now().millisecondsSinceEpoch;
    return 'uploads/users/$userId/driver/$documentType/${ts}_$fileName';
  }
}
