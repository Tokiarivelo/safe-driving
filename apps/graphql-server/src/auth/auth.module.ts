import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma-module/prisma.module';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { JwtModule } from '@nestjs/jwt';
import { TokensService } from './token/tokens.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UsersModule } from 'src/user/user.module';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_EXPIRES_IN },
    }),
    PrismaModule, // Import PrismaModule to use PrismaService
    UsersModule, // Import UsersModule to use UsersService
  ],
  providers: [JwtStrategy, AuthService, AuthResolver, TokensService],
  exports: [AuthService],
})
export class AuthModule {}
