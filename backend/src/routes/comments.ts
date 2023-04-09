import { Router } from 'express';
import { getComments, deleteComment } from '../controllers/comments';
import { getCommentsValidator, deleteCommentValidator } from '../helpers/validators';

const router = Router();

router.get('/', getCommentsValidator, getComments);

router.delete('/:id', deleteCommentValidator, deleteComment);

export default router;
