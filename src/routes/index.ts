import { Router, Request, Response } from 'express';
const router = Router();

/* GET users listing. */
router.get('/', function (req: Request, res: Response) {
  res.send('Hello world.');
});

export default router;
