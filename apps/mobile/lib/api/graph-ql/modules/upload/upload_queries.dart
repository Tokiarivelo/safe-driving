// Upload queries
const String listObjectsQuery = r'''
  query ListObjects($bucket: String!) {
    listObjects(bucket: $bucket)
  }
''';
