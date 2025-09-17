// S3 fragments
const String presignedUrlFragment = r'''
  fragment PresignedUrlFragment on PresignedUrl {
    key
    url
    expiresIn
  }
''';

const String completeUploadOutputFragment = r'''
  fragment CompleteUploadOutputFragment on CompleteUploadOutput {
    key
    contentType
    etag
    size
  }
''';
