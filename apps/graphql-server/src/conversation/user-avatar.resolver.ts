import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { ConfigService } from '@nestjs/config';
import { UserPartialAvatar } from '../dtos/conversation/conversation.output';

@Resolver(() => UserPartialAvatar)
export class UserAvatarResolver {
  constructor(private readonly configService: ConfigService) {}

  @ResolveField(() => String, { nullable: true })
  url(@Parent() file: UserPartialAvatar): string | null {
    if (!file.key) {
      return null;
    }
    const awsUrl = this.configService.get<string>('AWS_ENDPOINT_URL');
    const bucket = this.configService.get<string>('S3_BUCKET_NAME');
    return `${awsUrl}/${bucket}/${file.key}`;
  }
}
