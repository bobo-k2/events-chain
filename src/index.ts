import express from 'express';
import bodyParser from 'body-parser';
import { eventRouter } from './routes/events';
import { uiRouter } from './routes/ui';

const app = express();
app.use(bodyParser.json());
app.use(eventRouter);
app.use(uiRouter);

let listenPort = process.env.PORT || 3000;

app.listen(listenPort, () => {
  console.log('Server is listening on port ', listenPort);
});