import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function  main() {
  const events = await prisma.event.findMany();
  console.log(events);
}

main()
  .catch(e => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect();
  })