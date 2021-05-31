import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function  main() {
  // await prisma.event.create({
  //   data: {
  //     Name: 'Boysetsfire',
  //     Venue: 'Hollywood Palladium',
  //     Date: 100000101,
  //     TicketPrice: 200,
  //     ContractAddress: '0x'
  //   }
  // });

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