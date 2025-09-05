// S3 queries
const String s3ListQuery = r'''
  query S3List($bucket: String!) {
    s3List(bucket: $bucket)
  }
''';

const String s3EnsureBucketQuery = r'''
  query S3EnsureBucket($bucket: String!) {
    s3EnsureBucket(bucket: $bucket)
  }
''';

const String s3HeadObjectExistsQuery = r'''
  query S3HeadObjectExists($key: String!) {
    s3HeadObjectExists(key: $key)
  }
''';
