// All other GET requests will return the React app
import express, { Request, Response } from 'express';
const path = require('path');
const router = express.Router();

// Have Node serve the files for our built React app
router.use(express.static(path.resolve(__dirname, '../../../client/build')));

router.get('*', (req: Request, res:Response) => {
  res.sendFile(path.resolve(__dirname, '../../../client/build', 'index.html'));
});

export { router as uiRouter };