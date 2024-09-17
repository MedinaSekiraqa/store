import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.$executeRaw`SET GLOBAL sql_require_primary_key = 0;`;
}

main()
  .then(() => {
    console.log('Primary key requirement disabled.');
  })
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
