import express, { Request, Response, NextFunction } from 'express';
import EventRepository from '../../data/event-repository';

const router = express.Router();

router.get('/api/events', [], async (req: Request, res: Response, next: NextFunction) => {
  try {
  const eventsRepo = new EventRepository();
  res.send(await eventsRepo.getEvents());
  } catch(err) {
    next(err);
  }
});

export { router as eventRouter };