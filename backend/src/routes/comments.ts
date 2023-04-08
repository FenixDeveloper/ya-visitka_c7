import { Router } from 'express';
import { getComments, deleteComment } from '../controllers/comments';
import { getCommentsValidator, deleteCommentValidator } from '../helpers/validators';

const router = Router();

router.get('/', getComments, getCommentsValidator);

router.delete('/:id', deleteComment, deleteCommentValidator);

export default router;
