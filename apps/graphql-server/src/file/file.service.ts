import { Injectable, NotFoundException } from '@nestjs/common';
import { FileCreateInput, FindManyFileArgs } from '../dtos/@generated';
import { File } from '../dtos/@generated';
import { PrismaService } from 'src/prisma-module/prisma.service';
import { S3Service } from 'src/s3/s3.service';
import { CustomFileUpdateInput } from 'src/dtos/file/file.input';

@Injectable()
export class FileService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly s3Service: S3Service,
  ) {}

  async create(input: FileCreateInput): Promise<File> {
    const file = await this.prisma.file.create({
      data: input,
    });

    return file;
  }

  async update(id: string, input: CustomFileUpdateInput): Promise<File> {
    const file = await this.prisma.file.update({
      where: { id },
      data: input,
    });

    return file;
  }

  async findAll(params: FindManyFileArgs): Promise<File[] | null> {
    const { skip, take = 30, cursor, where, orderBy } = params;
    const files = await this.prisma.file.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
    return files;
  }

  async findById(userid: string, id: string): Promise<File> {
    const file = await this.prisma.file.findUnique({
      where: { id, userId: userid },
      include: {
        UserImage: {
          include: {
            User: true,
          },
        },
      },
    });
    if (!file) throw new NotFoundException(`File ${id} not found`);
    return file;
  }

  async deleteFileById(id: string): Promise<File> {
    const file = await this.prisma.file.delete({
      where: { id },
    });
    await this.s3Service.deleteObject(file.key);

    if (!file) throw new NotFoundException(`File ${id} not found`);
    return file;
  }

  async deleteManyFilesByUserId(userId: string): Promise<File[]> {
    const filesTodelete = await this.prisma.file.findMany({
      where: { userId },
    });

    if (filesTodelete.length === 0) {
      throw new NotFoundException(`No files found for user ${userId}`);
    }

    const files = await this.prisma.file.deleteMany({
      where: { userId },
    });

    await this.s3Service.deleteManyObjects(
      filesTodelete.map((file) => file.key),
    );

    return filesTodelete;
  }
}
