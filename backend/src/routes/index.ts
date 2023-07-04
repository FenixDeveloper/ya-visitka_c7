import { Router } from 'express';
import curatorRouter from './curator';
import fileRouter from './files';
import authRouter from './auth';
import studentRouter from './student';
import alive from '../controllers/health-check';
import { login } from '../controllers/oauth';
import { authenticate } from '../strategy/jwt.strategy';
import nonExistentRequestHandler from '../middlwares/non-existent-request-handler';

const router = Router();

router.get('/healthcheck', alive);
router.post('/auth', login);
router.use(authenticate);
router.use(authRouter);
router.use(studentRouter);
router.use(fileRouter);
router.use(curatorRouter);

router.use(nonExistentRequestHandler);

export default router;
