const String s3CreatePresignedUrlMutation = r'''
  mutation S3CreatePresignedUrl($key: String!, $contentType: String!, $expiresIn: Float) {
    getPresignedUrl(key: $key, contentType: $contentType, expiresIn: $expiresIn)
  }
''';

const String s3CreateBatchPresignedUrlsMutation = r'''
  mutation S3CreateBatchPresignedUrls($type: FileType!, $files: [FileMetaInput!]!) {
    createBatchPresignedUrls(type: $type, files: $files) {
      key
      url
      expiresIn
    }
  }
''';

const String s3CompleteUploadBulkMutation = r'''
  mutation S3CompleteUploadBulk($keys: [String!]!, $type: FileType!) {
    completeUploadBulk(keys: $keys, type: $type) {
      key
      contentType
      etag
      size
    }
  }
''';

const String s3DeleteObjectMutation = r'''
  mutation S3DeleteObject($key: String!) {
    deleteObject(key: $key)
  }
''';
