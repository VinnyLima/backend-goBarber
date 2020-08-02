import { Router } from 'express';
import UsersController from '../controllers/UsersControllers';
import UserAvatarController from '../controllers/UserAvatarController';

const usersRouter = Router();
const usersController = new UsersController();
const usersAvatarController = new UserAvatarController();

usersRouter.post('/', usersController.create);

usersRouter.get('/');

usersRouter.patch('/avatar', usersAvatarController.update);

export default usersRouter;
