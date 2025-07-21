import { Injectable, OnModuleInit } from '@nestjs/common';
import { RoleEnum } from 'src/dtos/enums/role.enum';
import { PrismaService } from 'src/prisma-module/prisma.service';
import { VehicleTypeEnum } from '../dtos/enums/vehicleType.enum';

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

    for (const vehicleTypeName of Object.values(VehicleTypeEnum)) {
      await this.prisma.vehicleType.upsert({
        where: { name: vehicleTypeName },
        update: {},
        create: {
          name: vehicleTypeName,
        },
      });
    }

    console.log('✅ Vehicle types seeded.');
  }
}
