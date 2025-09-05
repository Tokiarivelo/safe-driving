// S3 mutations
const String s3CreatePresignedUrlMutation = r'''
  mutation S3CreatePresignedUrl($key: String!, $contentType: String!, $expiresIn: Int) {
    s3CreatePresignedUrl(key: $key, contentType: $contentType, expiresIn: $expiresIn)
  }
''';

const String s3CreateBatchPresignedUrlsMutation = r'''
  mutation S3CreateBatchPresignedUrls($type: ImageType!, $files: [FileMetaInput!]!) {
    s3CreateBatchPresignedUrls(type: $type, files: $files) {
      key
      url
      fileName
    }
  }
''';

const String s3CompleteUploadBulkMutation = r'''
  mutation S3CompleteUploadBulk($keys: [String!]!, $type: ImageType!) {
    completeUploadBulk(keys: $keys, type: $type) {
      key
      url
      success
      error
    }
  }
''';

const String s3DeleteObjectMutation = r'''
  mutation S3DeleteObject($key: String!) {
    s3DeleteObject(key: $key)
  }
''';
