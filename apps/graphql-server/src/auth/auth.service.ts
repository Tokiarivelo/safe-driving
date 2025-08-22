import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../user/users.service';
import { LoginInput } from 'src/dtos/auth/login.input';
import { RegisterInput } from 'src/dtos/auth/register.input';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly config: ConfigService,
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      return null;
    }

    const isValidPassword = await bcrypt.compare(pass, user.password);
    if (isValidPassword) {
      const { password: _, ...rest } = user;
      return rest;
    }
    return null;
  }

  async login(loginInput: LoginInput) {
    const user = await this.validateUser(loginInput.email, loginInput.password);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials.');
    }
    const payload = {
      email: user.email,
      username: user.username,
      sub: user.id,
      roles: user.Role,
    };

    return { accessToken: this.jwtService.sign(payload), user };
  }

  async register(dto: RegisterInput) {
    return this.usersService.create({ ...dto });
  }

  async forgotPassword(email: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('User not found.');
    }

    const frontBaseUrl =
      this.config.get<string>('FRONT_BASE_URL') || 'http://localhost:3000';
    // Logic to generate reset link and send email would go here
    const resetLink = `${frontBaseUrl}/reset-password?token=${user.id}`;
    return { resetLink, email: user.email };
  }

  async resetPassword(sessionToken: string, newPassword: string) {
    const userId = sessionToken; // Assuming sessionToken is the user ID for simplicity
    return this.usersService.update(userId, {
      password: {
        set: newPassword,
      },
    });
  }
}
