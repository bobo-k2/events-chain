import express from 'express';
import bodyParser from 'body-parser';
import { eventRouter } from './routes/events';

const app = express();
app.use(bodyParser.json());
app.use(eventRouter);

app.listen(3001, () => {
  console.log('Server is listening on port 3001')
});