import { NextFunction, Request, Response } from 'express';
import { IUser } from '../types/user-model';
import userSchema from '../models/User';
import StatusCodes from '../helpers/status-codes';
import NotFoundError from '../errors/not-found-error';

export const getProfiles = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { offset, limit = 20, cohort } = req.query;

  userSchema
    .find({ cohort })
    .skip(Number(offset) > 0 ? Number(offset) : 0)
    .limit(Number(limit))
    .then((users: IUser[]) => {
      res
        .status(StatusCodes.OK)
        .json(users);
    })
    .catch(next);
};

export const getProfile = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { id } = req.params;

  userSchema
    .findById(id)
    .orFail(new NotFoundError('Пользователь не найден'))
    .then((user: IUser) => {
      res
        .status(StatusCodes.OK)
        .json(user);
    })
    .catch(next);
};

export const patchProfile = (
  req: Request,
  res: Response,
  next: NextFunction,

) => {
  const { id } = req.params;
  const profileData: IUser = req.body;

  userSchema
    .findOneAndUpdate({ id }, profileData, { new: true })
    .orFail(new NotFoundError('Пользователь не найден'))
    .then((updatedProfile: IUser) => {
      res
        .status(StatusCodes.OK)
        .json(updatedProfile);
    })
    .catch(next);
};
