import { Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { SALT_ROUNDS } from 'src/auth/constants';
import { DeleteOneUserArgs, FindManyUserArgs } from 'src/dtos/@generated';
import { UploadUserDocumentsInput } from 'src/dtos/user/user.input';
import { PrismaService } from 'src/prisma-module/prisma.service';
import { QrService } from 'src/qr/qr.service';
import { User, UserCreateInput, UserUpdateInput } from '../dtos/@generated';
import { UploadService } from 'src/upload/upload.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly qrService: QrService,
    private readonly uploadService: UploadService,
  ) { }

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
        status: input.status?.set,
        driverStatus: input.driverStatus?.set,
        isVerified: input.isVerified?.set,
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
        UserImage: { include: { file: true } },
        avatar: true,
        UserCover: { include: { file: true } },
        UserDocument: { include: { file: true } },
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

  async userByToken(token: string) {
    const userId = await this.qrService.findUserIdByToken(token);
    if (!userId) return null;

    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });
    return user;
  }

  async uploadAvatar(userId: string, avatarKey: string): Promise<User> {
    const user = await this.prisma.user.update({
      where: { id: userId },
      data: {
        avatar: {
          connect: { key: avatarKey },
        },
      },
      include: { Role: true, avatar: true },
    });
    if (!user) throw new NotFoundException(`User ${userId} not found`);
    return user;
  }

  async removeAvatar(userId: string): Promise<User> {
    const user = await this.prisma.user.update({
      where: { id: userId },
      data: {
        avatar: {
          disconnect: true,
        },
      },
      include: { Role: true, avatar: true },
    });
    if (!user) throw new NotFoundException(`User ${userId} not found`);
    return user;
  }

  async uploadUserDocument(
    userId: string,
    input: UploadUserDocumentsInput[],
  ): Promise<User> {
    const user = await this.prisma.user.update({
      where: { id: userId },
      data: {
        UserDocument: {
          create: input.map((doc) => ({
            documentType: doc.documentType,
            name: doc.name,
            file: {
              connect: { key: doc.file.key },
            },
          })),
        },
      },
      include: {
        Role: true,
        UserDocument: {
          include: { file: true },
        },
      },
    });
    if (!user) throw new NotFoundException(`User ${userId} not found`);
    return user;
  }

  async deleteUserDocumentByKey(userId: string, key: string): Promise<User> {
    const file = await this.prisma.file.findUnique({
      where: { key },
    });
    if (!file) throw new NotFoundException(`File with key ${key} not found`);

    const user = await this.prisma.user.update({
      where: { id: userId },
      data: {
        UserDocument: {
          deleteMany: { fileId: file.id },
        },
      },
      include: {
        Role: true,
        UserDocument: {
          include: { file: true },
        },
      },
    });
    if (!user) throw new NotFoundException(`User ${userId} not found`);

    // delete the file from S3
    await this.uploadService.deleteObject(key);

    // delete the file record from the database
    await this.prisma.file.delete({
      where: { id: file.id },
    });

    return user;
  }

  async uploadCover(userId: string, coverKey: string): Promise<User> {
    const user = await this.prisma.user.update({
      where: { id: userId },
      data: {
        UserCover: {
          upsert: {
            create: {
              file: {
                connect: { key: coverKey },
              },
            },
            update: {
              file: {
                connect: { key: coverKey },
              },
            },
          },
        },
      },
      include: {
        Role: true,
        UserCover: {
          include: { file: true },
        },
      },
    });
    if (!user) throw new NotFoundException(`User ${userId} not found`);
    return user;
  }

  async deleteCover(userId: string): Promise<User> {
    const user = await this.prisma.user.update({
      where: { id: userId },
      data: {
        UserCover: {
          disconnect: true,
        },
      },
      include: { Role: true },
    });
    if (!user) throw new NotFoundException(`User ${userId} not found`);

    // delete from s3
    if (user.userCoverId) {
      const coverFile = await this.prisma.file.findUnique({
        where: { id: user.userCoverId },
      });
      if (coverFile) {
        await this.uploadService.deleteObject(coverFile.key);
        await this.prisma.file.delete({
          where: { id: coverFile.id },
        });
      }
    }

    return user;
  }

  async uploadUserImages(userId: string, keys: string[]): Promise<User> {
    const user = await this.prisma.user.update({
      where: { id: userId },
      data: {
        UserImage: {
          create: keys.map((key) => ({
            file: {
              connect: { key },
            },
          })),
        },
      },
      include: {
        Role: true,
        UserImage: {
          include: { file: true },
        },
      },
    });
    if (!user) throw new NotFoundException(`User ${userId} not found`);
    return user;
  }

  async deleteUserImageByKey(userId: string, key: string): Promise<User> {
    const file = await this.prisma.file.findUnique({
      where: { key },
    });
    if (!file) throw new NotFoundException(`File with key ${key} not found`);

    const user = await this.prisma.user.update({
      where: { id: userId },
      data: {
        UserImage: {
          deleteMany: { fileId: file.id },
        },
      },
      include: {
        Role: true,
        UserImage: {
          include: { file: true },
        },
      },
    });
    if (!user) throw new NotFoundException(`User ${userId} not found`);

    // delete the file from S3
    await this.uploadService.deleteObject(key);

    // delete the file record from the database
    await this.prisma.file.delete({
      where: { id: file.id },
    });

    return user;
  }
}
