const String createScanSessionMutation = r'''
  mutation CreateScanSession {
    createScanSession {
      sessionId
      qrBase64
    }
  }
''';

const String sendScanResultMutation = r'''
  mutation SendScanResult($input: SendScanResultInput!) {
    sendScanResult(input: $input)
  }
''';
