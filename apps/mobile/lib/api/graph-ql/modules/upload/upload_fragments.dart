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
    expiresIn
  }
''';

const String completeUploadFragment = r'''
  fragment CompleteUploadFields on CompleteUploadOutput {
    key
    contentType
    etag
    size
  }
''';
