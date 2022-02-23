import { UserController } from './controller/UserController';

export type Route = {
  method: 'get' | 'post' | 'put' | 'delete';
  route: string;
  controller: typeof UserController;
  action: keyof UserController;
};

export const usersRoutes: Route[] = [
  {
    method: 'get',
    route: '/',
    controller: UserController,
    action: 'all',
  },
  {
    method: 'get',
    route: '/:id',
    controller: UserController,
    action: 'one',
  },
  {
    method: 'post',
    route: '/',
    controller: UserController,
    action: 'save',
  },
  {
    method: 'delete',
    route: '/:id',
    controller: UserController,
    action: 'remove',
  },
];
