Additional fields to add to `exit-page-create.input.ts`

```sh
{
  ......

  // Avant : data: any
  // On décompose data pour gérer les fichiers
  @Field(() => String)
  openingLine: string;

  @Field(() => [String], { nullable: true })
  gifUrls?: string[];

  @Field(() => [GraphQLUpload], { nullable: true })
  images?: Promise<FileUpload>[];

  @Field(() => [GraphQLUpload], { nullable: true })
  videos?: Promise<FileUpload>[];

  @Field(() => [GraphQLUpload], { nullable: true })
  audios?: Promise<FileUpload>[];

  @Field(() => String)
  reactionDefault: string;
}
```
