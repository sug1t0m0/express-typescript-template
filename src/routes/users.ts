import { Router, Request, Response, NextFunction } from 'express';

import { usersRoutes } from '../users';

const router = Router();

console.log(usersRoutes);

usersRoutes.forEach((route) => {
  router[route.method](route.route, (req: Request, res: Response, next: NextFunction) => {
    console.log(route);
    const result = new route.controller()[route.action](req, res, next);
    if (result instanceof Promise) {
      void result.then((result) => (result !== null && result !== undefined ? res.json(result) : undefined));
    } else if (result !== null && result !== undefined) {
      res.json(result);
    }
  });
});

export default router;
