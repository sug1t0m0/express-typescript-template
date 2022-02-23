import { Router, Request, Response, NextFunction} from 'express'
const router = Router();


/* GET users listing. */
router.get('/', function(req: Request, res: Response, next: NextFunction) {
  res.send('Hello world.');
});

export default router;
