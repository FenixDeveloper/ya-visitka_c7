import { Router } from 'express';
import { getComments, deleteComment } from '../controllers/comments';
import { getUsers, createUser, updateUser } from '../controllers/user';
import isCurator from '../middlwares/defining-role';
import {
  createUserValidator,
  deleteCommentValidator,
  getCommentsValidator,
  getUsersValidator,
  updateUserValidator,
} from '../helpers/validators';

const curatorRouter = Router();

curatorRouter.post('/users', createUserValidator, createUser);
curatorRouter.get('/users', getUsersValidator, getUsers);
curatorRouter.put('/users/:id', isCurator, updateUserValidator, updateUser);

curatorRouter.get('/comments', isCurator, getCommentsValidator, getComments);
curatorRouter.delete('/comments/:id', isCurator, deleteCommentValidator, deleteComment);

export default curatorRouter;
