// Upload mutations
const String uploadFileMutation = r'''
  mutation UploadFile($file: Upload!, $path: String) {
    uploadFile(file: $file, path: $path) {
      url
    }
  }
''';

const String deleteObjectMutation = r'''
  mutation DeleteObject($key: String!) {
    deleteObject(key: $key)
  }
''';

const String getPresignedUrlMutation = r'''
  mutation GetPresignedUrl($key: String!, $contentType: String!, $expiresIn: Int) {
    getPresignedUrl(key: $key, contentType: $contentType, expiresIn: $expiresIn)
  }
''';

const String createBatchPresignedUrlsMutation = r'''
  mutation CreateBatchPresignedUrls($type: ImageType!, $files: [FileMetaInput!]!) {
    createBatchPresignedUrls(type: $type, files: $files) {
      key
      url
      fileName
    }
  }
''';

const String completeUploadBulkMutation = r'''
  mutation CompleteUploadBulk($keys: [String!]!, $type: ImageType!) {
    completeUploadBulk(keys: $keys, type: $type) {
      key
      url
      success
      error
    }
  }
''';
