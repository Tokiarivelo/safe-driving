import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ConfigModule } from '@nestjs/config';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { UsersModule } from '../user/user.module';
import { AuthModule } from 'src/auth/auth.module';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { PrismaModule } from 'src/prisma-module/prisma.module';
import { SeedModule } from 'src/seed/seed.module';
import { UploadModule } from 'src/upload/upload.module';
import { UserPreferenceModule } from 'src/preference/preference.module';
import { DriverVehicle } from 'src/dtos/@generated';
import { VehicleTypeModule } from 'src/vehicle-type/vehicle-type.module';
import { FileModule } from 'src/file/file.module';
import { QrModule } from 'src/qr/qr.module';
import { RedisModule } from 'src/redis/redis.module';
import { MessageModule } from 'src/message/message.module';
import { ConversationModule } from 'src/conversation/conversation.module';

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
        'subscriptions-transport-ws': true,
      },
      context: ({ req, connection, res }) => {
        if (connection) {
          return { req: connection.context, res };
        }
        return { req, res };
      },
    }),
    PrismaModule,
    SeedModule,
    UsersModule,
    AuthModule,
    UploadModule,
    UserPreferenceModule,
    DriverVehicle,
    VehicleTypeModule,
    FileModule,
    QrModule,
    RedisModule,
    MessageModule,
    ConversationModule,
  ],
})
export class AppModule {}
