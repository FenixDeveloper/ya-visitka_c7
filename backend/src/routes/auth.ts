import { Router } from 'express';
import { getUser } from '../controllers/oauth';

const authRouter = Router();

authRouter.get('/users/me', getUser);

export default authRouter;
