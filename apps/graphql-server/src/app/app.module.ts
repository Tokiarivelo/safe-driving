import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ConfigModule } from '@nestjs/config';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { UsersModule } from '../user/user.module';
import { AuthModule } from 'src/auth/auth.module';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { PrismaModule } from 'src/prisma-module/prisma.module';
import { SeedModule } from 'src/seed/seed.module';
import { S3Module } from 'src/s3/s3.module';
import { UploadModule } from 'src/upload/upload.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
      sortSchema: true,
      installSubscriptionHandlers: true,
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      subscriptions: {
        'graphql-ws': true,
      },
      context: ({ req, res }: any) => ({ req, res }),
    }),
    PrismaModule,
    SeedModule,
    UsersModule,
    AuthModule,
    S3Module,
    UploadModule,
  ],
})
export class AppModule {}
