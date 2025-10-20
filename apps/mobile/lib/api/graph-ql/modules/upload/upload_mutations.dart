const String uploadFileMutation = r'''
  mutation UploadFile($file: Upload!) {
    uploadFile(file: $file) {
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
  mutation GetPresignedUrl($key: String!, $contentType: String!, $expiresIn: Float) {
  mutation GetPresignedUrl($key: String!, $contentType: String!, $expiresIn: Float) {
    getPresignedUrl(key: $key, contentType: $contentType, expiresIn: $expiresIn)
  }
''';

const String createBatchPresignedUrlsMutation = r'''
  mutation CreateBatchPresignedUrls($type: FileType!, $files: [FileMetaInput!]!) {
  mutation CreateBatchPresignedUrls($type: FileType!, $files: [FileMetaInput!]!) {
    createBatchPresignedUrls(type: $type, files: $files) {
      key
      url
      expiresIn
      expiresIn
    }
  }
''';

const String completeUploadBulkMutation = r'''
  mutation CompleteUploadBulk($keys: [String!]!, $type: FileType!) {
  mutation CompleteUploadBulk($keys: [String!]!, $type: FileType!) {
    completeUploadBulk(keys: $keys, type: $type) {
      key
      contentType
      etag
      size
    }
  }
''';

const String uploadUserImagesMutation = r'''
  mutation uploadUserImages($keys: [String!]!) {
    uploadUserImages(keys: $keys) {
      id
      UserImage {
        createdAt
        file {
          id
          key
          url
        }
        id
        updatedAt
        userId
      }
    }
  }
''';

const String uploadUserDocumentMutation = r'''
  mutation uploadUserDocument($input: [UploadUserDocumentsInput!]!) {
    uploadUserDocument(input: $input) {
      id
      UserDocument {
        id
        name
        documentType
        file {
          id
          key
          url
        }
      }
    }
  }
''';

const String uploadAvatarMutation = r'''
  mutation uploadAvatar($key: String!) {
    uploadAvatar(key: $key) {
      id
      avatar {
        id
        key
        url
      }
    }
  }
''';

const String uploadCoverMutation = r'''
  mutation uploadCover($key: String!) {
    uploadCover(key: $key) {
      id
      UserCover {
        id
        updatedAt
        createdAt
        file {
          id
          key
          url
        }
      }
    }
  }
''';
