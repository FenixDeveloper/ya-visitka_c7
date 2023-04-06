import { Router } from 'express';
import { getComments, deleteComment } from '../controllers/comments';

const router = Router();

router.get('/', getComments);

router.delete('/:id', deleteComment);

export default router;
