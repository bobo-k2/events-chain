import { PrismaClient } from '@prisma/client';

class EventRepository {
  async getEvents() {
    const client = new PrismaClient();

    try {
      return await client.event.findMany();
    } finally {
      await client.$disconnect();
    }
  }
}

export default EventRepository;