import { Router } from 'express';
import isCurator from '../middlwares/defining-role';
import { getComments, deleteComment } from '../controllers/comments';
import { getUsers, createUser, updateUser } from '../controllers/user';
import {
  createUserValidator,
  deleteCommentValidator,
  getCommentsValidator,
  getUsersValidator,
  updateUserValidator,
} from '../helpers/validators';

const curatorRouter = Router();

curatorRouter.use(isCurator);

curatorRouter.post('/users', createUserValidator, createUser);
curatorRouter.get('/users', getUsersValidator, getUsers);
curatorRouter.put('/users/:id', updateUserValidator, updateUser);

curatorRouter.get('/comments', getCommentsValidator, getComments);
curatorRouter.delete('/comments/:id', deleteCommentValidator, deleteComment);

export default curatorRouter;
