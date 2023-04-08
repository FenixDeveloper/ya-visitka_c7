import { Router } from 'express';
import curatorRouter from './curator';
import fileRouter from './files';
import authRouter from './auth';
import studentRouter from './student';

const router = Router();

router.use(authRouter);
router.use(curatorRouter);
router.use(studentRouter);
router.use(fileRouter);

export default router;
