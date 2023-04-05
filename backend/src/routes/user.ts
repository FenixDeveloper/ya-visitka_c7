import express from 'express';
import { getUsersValidator } from '../helpers/validators';
import { getUsers, createUser, updateUser } from '../controllers/user';

const usersRouter = express.Router();

usersRouter.get('/', getUsersValidator, getUsers);
usersRouter.post('/', createUser);
usersRouter.put('/:id', updateUser);

export default usersRouter;
