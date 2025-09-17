const String createUserQrMutation = r'''
  mutation CreateUserQr($type: String) {
    createUserQr(type: $type)
  }
''';

const String createUserQrSimpleMutation = r'''
  mutation createUserQr{
    createUserQr
  }
''';
