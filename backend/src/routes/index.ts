import { Router } from 'express';
import curatorRouter from './curator';
import fileRouter from './files';
import authRouter from './auth';
import studentRouter from './student';
import alive from '../controllers/health-check';
import { login } from '../controllers/oauth';
import { authenticate } from '../strategy/jwt.strategy';

const router = Router();

router.get('/api/healthcheck', alive);
router.post('/api/auth', login);
router.use(authenticate);
router.use('/api', authRouter);
router.use('/api', studentRouter);
router.use('/api', fileRouter);
router.use('/api', curatorRouter);

export default router;
