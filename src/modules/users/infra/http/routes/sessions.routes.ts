import { Router } from 'express';
import SessionsControllers from '../controllers/SessionsControllers';

const sessionRouter = Router();
const sessionController = new SessionsControllers();

sessionRouter.post('/', sessionController.create);

export default sessionRouter;
