import { NextFunction, Request, Response } from 'express';
import { isValidObjectId } from 'mongoose';
import ErrorNames from '../helpers/error-names';
import StatusCodes from '../helpers/status-codes';
import User from '../models/User';
import { BadRequestError, ConflictError, NotFoundError } from '../errors';
import ErrorMessages from '../helpers/error-messages';

export async function getUsers(req: Request, res: Response, next: NextFunction) {
  const { offset = 0, limit = 20, search = '' } = req.query;
  const searchRegex = new RegExp(String(search), 'i');
  const searchQuery = search?.length
    ? [{ email: searchRegex }, { cohort: searchRegex }, { 'profile.name': searchRegex }]
    : [{}];

  try {
    const items = await User.find(
      { $or: searchQuery },
      {
        createdAt: 1, updatedAt: 1, email: 1, cohort: 1, name: '$profile.name',
      },
    )
      .limit(Number(limit))
      .skip(Number(offset));

    const result = {
      total: items.length,
      items,
    };
    res.send(result);
  } catch (err) {
    next(err);
  }
}

export const createUser = (req: Request, res: Response, next: NextFunction) => {
  const { email, cohort } = req.body;
  User.create({ email, cohort })
    .then((user) => {
      res.status(StatusCodes.CREATED);
      const resUser = {
        _id: user._id,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        email: user.email,
        cohort: user.cohort,
      };
      res.send(resUser);
    })
    .catch((err) => {
      if (err.code === StatusCodes.CONFLICT_ERROR_CODE_MONGODB) {
        next(new ConflictError(ErrorMessages.EMAIL_CONFLICT));
      }
      if (err.name === ErrorNames.VALIDATION_ERROR) {
        next(new BadRequestError(ErrorMessages.BAD_REQUEST));
      }
      next(err);
    });
};

export const updateUser = (req: Request, res: Response, next: NextFunction) => {
  const { email, cohort } = req.body;
  const { id } = req.params;

  if (!id || !isValidObjectId(id)) {
    next(new BadRequestError(ErrorMessages.BAD_REQUEST));
  }

  User.findByIdAndUpdate(id, { email, cohort }, {
    new: true,
    projection: {
      email: 1, cohort: 1, updatedAt: 1, createdAt: 1,
    },
    runValidators: true,
  }).orFail(new NotFoundError(ErrorMessages.USER_NOT_FOUND))
    .then((user) => res.send(user))
    .catch((err) => {
      if (
        err.name === ErrorNames.VALIDATION_ERROR
        || err.name === ErrorNames.CAST_ERROR
      ) {
        next(new BadRequestError(ErrorMessages.BAD_REQUEST));
      }
      next(err);
    });
};
