import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UploadedFileRefInput {
  @Field() uniqueId: string;
  @Field() url: string;
  @Field() type: string; // 'image' | 'document'
  @Field({ nullable: true }) name?: string;
}
