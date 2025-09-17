const String s3ListQuery = r'''
  query S3List($bucket: String!) {
    listObjects(bucket: $bucket)
  }
''';

const String s3EnsureBucketQuery = r'''
  query S3EnsureBucket($bucket: String!) {
    listObjects(bucket: $bucket)
  }
''';

const String s3HeadObjectExistsQuery = r'''
  query S3HeadObjectExists($bucket: String!) {
    listObjects(bucket: $bucket)
  }
''';
