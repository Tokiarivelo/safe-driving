// QR queries
const String getUserQrQuery = r'''
  query GetUserQr($type: String) {
    getUserQr(type: $type)
  }
''';
