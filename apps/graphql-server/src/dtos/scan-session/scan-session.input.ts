import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class SendScanResultInput {
  @Field()
  @IsNotEmpty()
  @IsString()
  sessionId: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  scannedValue: string;
}
