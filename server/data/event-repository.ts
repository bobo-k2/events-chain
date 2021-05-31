import { PrismaClient, Event } from '@prisma/client';

class EventRepository {
  async getEvents() {
    const client = new PrismaClient();

    try {
      return await client.event.findMany();
    } finally {
      await client.$disconnect();
    }
  }

  async addEvent(event: Event) {
    const client = new PrismaClient();

    try {
      return await client.event.create({
        data: {
          ...event
        }
      });
    } finally {
      await client.$disconnect();
    }
  }
}

export default EventRepository;