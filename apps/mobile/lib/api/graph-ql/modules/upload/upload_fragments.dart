// Upload fragments
const String fileUploadResultFragment = r'''
  fragment FileUploadResultFields on FileUploadResult {
    url
  }
''';

const String presignedUrlFragment = r'''
  fragment PresignedUrlFields on PresignedUrl {
    key
    url
    fileName
  }
''';

const String completeUploadFragment = r'''
  fragment CompleteUploadFields on CompleteUploadOutput {
    key
    url
    success
    error
  }
''';
