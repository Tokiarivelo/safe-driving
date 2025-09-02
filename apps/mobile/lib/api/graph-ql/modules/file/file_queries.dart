const String filesQuery = r'''
query Files($where: FileWhereInput, $take: Int, $skip: Int) {
  files(where: $where, take: $take, skip: $skip) {
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

const String fileQuery = r'''
query File($id: String!) {
  file(id: $id) {
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

