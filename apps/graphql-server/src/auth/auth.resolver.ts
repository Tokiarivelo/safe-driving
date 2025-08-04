import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { TokensService } from './token/tokens.service';

import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LoginInput } from 'src/dtos/auth/login.input';
import { User } from 'src/dtos/@generated';
import { RegisterInput } from 'src/dtos/auth/register.input';
import { LoginOutput } from 'src/dtos/auth/login.output';
import { ForgotPasswordOutput } from 'src/dtos/auth/forgot-password/forgot-password.output';

@Resolver()
export class AuthResolver {
  constructor(
    private authService: AuthService,
    private tokensService: TokensService,
  ) {}

  @Mutation(() => LoginOutput, { nullable: true, name: 'login' })
  async login(@Args('data') data: LoginInput) {
    const result = await this.authService.login(data);
    if (!result || !result.accessToken || !result.user) {
      return null;
    }

    return {
      token: result.accessToken,
      user: result.user,
    };
  }

  @Mutation(() => User, { name: 'register' })
  async register(@Args('data') data: RegisterInput) {
    return this.authService.register(data);
  }

  @Mutation(() => Boolean, { name: 'logout' })
  @UseGuards(JwtAuthGuard)
  async logout(@Context() { req }: any): Promise<boolean> {
    await this.tokensService.revoke(req.user.userId);
    return true;
  }

  @Mutation(() => ForgotPasswordOutput, { name: 'forgotPassword' })
  async forgotPassword(
    @Args('email') email: string,
  ): Promise<ForgotPasswordOutput> {
    const result = await this.authService.forgotPassword(email);
    return result;
  }

  @Mutation(() => Boolean, { name: 'resetPassword' })
  async resetPassword(
    @Args('sessionToken') sessionToken: string,
    @Args('newPassword') newPassword: string,
  ): Promise<boolean> {
    const result = await this.authService.resetPassword(
      sessionToken,
      newPassword,
    );
    return !!result;
  }
}
