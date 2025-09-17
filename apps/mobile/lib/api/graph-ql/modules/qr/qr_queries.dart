const String getUserQrQuery = r'''
  query GetUserQr($type: String) {
    getUserQr(type: $type)
  }
''';

const String getUserQrFixedQuery = r'''
  query getUserQr{
    getUserQr(type: "png")
  }
''';
