import { Injectable, OnModuleInit } from '@nestjs/common';
import { RoleEnum } from 'src/dtos/enums/role.enum';
import { PrismaService } from 'src/prisma-module/prisma.service';

@Injectable()
export class SeedService implements OnModuleInit {
  constructor(private prisma: PrismaService) {}

  async onModuleInit() {
    await this.seedRoles();
  }

  async seedRoles() {
    const existingRoles = await this.prisma.role.findMany();
    const existingRoleNames = existingRoles.map((r) => r.name);

    for (const role of Object.values(RoleEnum)) {
      if (!existingRoleNames.includes(role)) {
        await this.prisma.role.create({
          data: { name: role },
        });
      }
    }

    console.log('✅ Roles seeded');
  }
}
