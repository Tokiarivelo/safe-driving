// QR mutations
const String createUserQrMutation = r'''
  mutation CreateUserQr($type: String) {
    createUserQr(type: $type)
  }
''';
