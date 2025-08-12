// s3.resolver.ts
import { Resolver, Query, Args } from '@nestjs/graphql';
import { S3Service } from './s3.service';

@Resolver()
export class S3Resolver {
  constructor(private readonly s3: S3Service) {}

  @Query(() => [String])
  async s3List(@Args('bucket') bucket: string) {
    const objs = await this.s3.list(bucket);
    return objs.map((o) => o.Key);
  }

  @Query(() => String)
  async s3EnsureBucket(@Args('bucket') bucket: string) {
    await this.s3.ensureBucket(bucket);
    return `Bucket ${bucket} ensured`;
  }
}
