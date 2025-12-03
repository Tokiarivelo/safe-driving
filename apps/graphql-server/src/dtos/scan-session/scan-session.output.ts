import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ScanSessionResult {
  @Field()
  sessionId: string;

  @Field()
  qrBase64: string;
}

@ObjectType()
export class ScanSessionStatus {
  @Field()
  sessionId: string;

  @Field()
  status: string;

  @Field({ nullable: true })
  scannedValue?: string;
}
