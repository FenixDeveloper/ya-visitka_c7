import { NextFunction, Request, Response } from 'express';
import userSchema, { IUser } from '../models/User';
import StatusCodes from '../helpers/status-codes';

export const getProfiles = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { offset, limit, cohort } = req.query;

  userSchema
    .find({ cohort })
    .skip(Number(offset) > 0 ? Number(offset) : 0)
    .limit(limit !== undefined && Number(limit) !== 0
      ? Number(limit)
      : 0)
    .then((users) => {
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

  userSchema.findById(id)
    .then((user) => {
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

  userSchema.findOneAndUpdate({ id }, profileData)
    .then((updatedProfile) => {
      res
        .status(StatusCodes.OK)
        .json(updatedProfile);
    })
    .catch(next);
};
