import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma-module/prisma.module';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { JwtModule } from '@nestjs/jwt';
import { TokensService } from './token/tokens.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UsersModule } from 'src/user/user.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_EXPIRES_IN },
    }),
    ConfigModule,
    PrismaModule, // Import PrismaModule to use PrismaService
    UsersModule, // Import UsersModule to use UsersService
  ],
  providers: [JwtStrategy, AuthService, AuthResolver, TokensService],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
