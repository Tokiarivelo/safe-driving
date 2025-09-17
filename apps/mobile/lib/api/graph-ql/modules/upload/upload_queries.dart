const String listObjectsQuery = r'''
  query ListObjects($bucket: String!) {
    listObjects(bucket: $bucket)
  }
''';

const String listObjectsFixedBucketQuery = r'''
  query listObjects{
    listObjects(bucket: "safe-driving")
  }
''';
