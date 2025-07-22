import { PrismaClient } from '@prisma/client';
import { RoleEnum } from 'src/dtos/enums/role.enum';

const prisma = new PrismaClient();

async function main() {
  for (const roleName of Object.values(RoleEnum)) {
    await prisma.role.upsert({
      where: { name: roleName },
      update: {},
      create: {
        name: roleName,
      },
    });
  }

  console.log(' Roles seeded.');
}

main()
  .catch((e) => {
    console.error(' Error while seeding roles:', e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
