import { Router } from 'express';
import { getUser } from '../controllers/oauth';

const authRouter = Router();

authRouter.get('/auth/get-user', getUser);

export default authRouter;
