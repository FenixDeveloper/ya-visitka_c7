import { NextFunction, Request, Response } from 'express';
import Roles from '../helpers/roles';
import { IUser } from '../types/user-model';
import User from '../models/User';
import StatusCodes from '../helpers/status-codes';
import NotFoundError from '../errors/not-found-error';
import ErrorMessages from '../helpers/error-messages';
import { BadRequestError, ForbiddenError } from '../errors';
import ErrorNames from '../helpers/error-names';
import { IReqUser } from '../types/request-user';

enum ReactionType {
  Text = 'Text',
  Emotion = 'Emotion',
}

export const getProfiles = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { email, role } = req?.user as IReqUser;
  const { offset = 0, limit = 20, cohort: cohortQuery } = req.query;
  let cohort;

  if (role === Roles.STUDENT) {
    const student = await User.findOne({ email })
      .orFail(new NotFoundError(ErrorMessages.USER_NOT_FOUND))
      .catch(next);
    cohort = student?.cohort;
  } else if (role === Roles.CURATOR) {
    cohort = cohortQuery;
  }

  User.find(cohort ? { cohort } : {})
    .skip(Number(offset))
    .limit(Number(limit))
    .then((users) => {
      res.status(StatusCodes.OK).json(users);
    })
    .catch(next);
};

export const getProfile = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { id } = req.params;

  User.findById(id)
    .orFail(new NotFoundError(ErrorMessages.USER_NOT_FOUND))
    .then((user) => {
      res.status(StatusCodes.OK).json(user);
    })
    .catch(next);
};

export const patchProfile = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { id } = req.params;
  const user = req?.user as IReqUser;

  const profileData: IUser = req.body;

  if (id !== user.id) {
    next(new ForbiddenError(ErrorMessages.FORBIDDEN));
    return;
  }

  User.findOneAndUpdate({ _id: id }, profileData, {
    new: true,
    runValidators: true,
  })
    .orFail(new NotFoundError(ErrorMessages.USER_NOT_FOUND))
    .then((updatedProfile) => {
      res.status(StatusCodes.OK).json(updatedProfile);
    })
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

export const postProfileReaction = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { id: targetId } = req.params;
  const { id: senderId } = req?.user as IReqUser;
  const reactionBody = req.body;

  const user = await User.findById(senderId)
    .orFail(new NotFoundError(ErrorMessages.USER_NOT_FOUND))
    .then((userData) => userData)
    .catch(next);

  const reactionFrom = {
    _id: user?._id.toString(),
    name: user?.profile.name,
    email: user?.email,
  };

  const reaction = {
    from: reactionFrom,
    type: reactionBody.text ? ReactionType.Text : ReactionType.Emotion,
    ...reactionBody,
  };

  User.findByIdAndUpdate(
    targetId,
    { $addToSet: { reactions: reaction } },
    { new: true, runValidators: true },
  )
    .orFail(new NotFoundError(ErrorMessages.USER_NOT_FOUND))
    .then(() => {
      res.status(StatusCodes.OK).json();
    })
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

export const getProfileReactions = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { offset = 0, limit = 20 } = req.query;
  const { id: userId } = req.params;

  User.findById(userId)
    .orFail(new NotFoundError(ErrorMessages.USER_NOT_FOUND))
    .then((userData) => {
      const reactions = userData.reactions.slice(
        Number(offset),
        Number(offset) + Number(limit),
      );
      res.status(StatusCodes.OK).json(reactions);
    })
    .catch(next);
};
