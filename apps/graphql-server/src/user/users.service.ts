import { Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserCreateInput, UserUpdateInput } from '../dtos/@generated';
import { User } from '../dtos/@generated';
import { FindManyUserArgs } from 'src/dtos/@generated';
import { DeleteOneUserArgs } from 'src/dtos/@generated';
import { PrismaService } from 'src/prisma-module/prisma.service';
import { SALT_ROUNDS } from 'src/auth/constants';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(input: UserCreateInput): Promise<User> {
    const hash = await bcrypt.hash(input.password, SALT_ROUNDS);

    const user = await this.prisma.user.create({
      data: {
        email: input.email,
        firstName: input.firstName,
        lastName: input.lastName,
        phone: input.phone,
        password: hash,
        Role: input.Role,
      },
    });

    return user;
  }

  async update(id: string, input: UserUpdateInput): Promise<User> {
    const hash = input.password?.set
      ? await bcrypt.hash(input.password.set, SALT_ROUNDS)
      : undefined;

    const user = await this.prisma.user.update({
      where: { id },
      data: {
        email: input.email,
        firstName: input.firstName,
        username: input.username,
        lastName: input.lastName,
        phone: input.phone,
        password: hash,
        Role: input.Role,
      },
    });

    return user;
  }

  async findAll(params: FindManyUserArgs): Promise<User[] | null> {
    const { skip, take, cursor, where, orderBy } = params;
    const users = await this.prisma.user.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
    return users;
  }

  async findAllForAdmin(params: FindManyUserArgs): Promise<User[] | null> {
    const { skip, take, cursor, where, orderBy } = params;
    const users = await this.prisma.user.findMany({
      include: { Role: true },
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
    return users;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { email },
      include: { Role: true },
    });
    return user;
  }

  async findById(id: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: {
        Role: true,
        UserPreference: {
          include: { preferedvelicles: true },
        },
      },
    });
    if (!user) throw new NotFoundException(`User ${id} not found`);
    return user;
  }

  async deleteUser({ where }: DeleteOneUserArgs): Promise<User> {
    const user = await this.prisma.user.delete({
      where,
    });

    if (!user)
      throw new NotFoundException(`User ${JSON.stringify(where)} not found`);
    return user;
  }
}
