// S3 fragments
const String presignedUrlFragment = r'''
  fragment PresignedUrlFragment on PresignedUrl {
    key
    url
    fileName
  }
''';

const String completeUploadOutputFragment = r'''
  fragment CompleteUploadOutputFragment on CompleteUploadOutput {
    key
    url
    success
    error
  }
''';
