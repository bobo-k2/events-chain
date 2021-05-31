import express, { Request, Response, NextFunction } from 'express';
import { Event } from '@prisma/client';
import EventRepository from '../../data/event-repository';

const router = express.Router();

router.get('/api/events', [], async (req: Request, res: Response, next: NextFunction) => {
  try {
    // TODO think about injecting the repository.
    const eventsRepo = new EventRepository();
    res.send(await eventsRepo.getEvents());
  } catch(err) {
    next(err);
  }
});

router.post('/api/events', [], async (req: Request<Event>, res: Response, next: NextFunction) => {
  try {
    console.log(req);
    const eventsRepo = new EventRepository();
    res.send(await eventsRepo.addEvent(req.body));
  } catch(err) {
    next(err);
  }
});

export { router as eventRouter };