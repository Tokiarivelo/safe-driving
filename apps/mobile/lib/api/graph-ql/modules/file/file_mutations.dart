import 'file_queries.dart';

const String createFileMutation =
    filesQuery +
    r'''
mutation CreateFile($input: FileCreateInput!) {
  createFile(input: $input) {
    id
    key
    url
    originalName
    contentType
    size
    status
    type
    userId
    driverVehicleId
    etag
    name
    meta
  }
}
''';

const String updateFileMutation = r'''
mutation UpdateFile($id: String!, $input: CustomFileUpdateInput!) {
  updateFile(id: $id, input: $input) {
    id
    key
    url
    originalName
    contentType
    size
    status
    type
    userId
    driverVehicleId
    etag
    name
    meta
  }
}
''';

const String deleteFilesByUserIdMutation = r'''
mutation DeleteFilesByUserId {
  deleteFilesByUserId {
    id
    key
  }
}
''';
