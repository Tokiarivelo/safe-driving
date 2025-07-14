import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../user/users.service';
import { LoginInput } from 'src/dtos/auth/login.input';
import { RegisterInput } from 'src/dtos/auth/register.input';

@Injectable()
export class AuthService {
  constructor(
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
}
