// All other GET requests will return the React app
import express, { Request, Response } from 'express';
const path = require('path');
const router = express.Router();
const clientPath = '../../client/build';

// Have Node serve the files for our built React app
router.use(express.static(path.resolve(__dirname, clientPath)));

router.get('*', (req: Request, res:Response) => {
  res.sendFile(path.resolve(__dirname, clientPath, 'index.html'));
});

export { router as uiRouter };