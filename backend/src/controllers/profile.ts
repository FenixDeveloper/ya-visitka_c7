import { NextFunction, Request, Response } from 'express';
import { IUser } from '../types/user-model';
import userSchema from '../models/User';
import StatusCodes from '../helpers/status-codes';
import NotFoundError from '../errors/not-found-error';
import ErrorMessages from '../helpers/error-messages';
import { IReqUser } from '../../@types/express/custom.types';

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

  userSchema
    .findById(id)
    .orFail(new NotFoundError(ErrorMessages.UserNotFound))
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
  const profileData: IUser = req.body;

  userSchema
    .findOneAndUpdate({ _id: id }, profileData, { new: true })
    .orFail(new NotFoundError(ErrorMessages.UserNotFound))
    .then((updatedProfile) => {
      res.status(StatusCodes.OK).json(updatedProfile);
    })
    .catch(next);
};

export const postProfileReaction = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { id: targetId } = req.params;
  const { id: senderId } = req.user as IReqUser;
  const reactionBody = req.body;

  const user = await userSchema
    .findById(senderId)
    .orFail(new NotFoundError(ErrorMessages.UserNotFound))
    .then((userData) => userData)
    .catch(next);

  const reactionFrom = {
    _id: user?._id.toString(),
    name: user?.profile.name,
    email: user?.email,
  };

  const reaction = {
    from: reactionFrom,
    type: reactionBody.text ? 'Text' : 'Emotion',
    ...reactionBody,
  };

  userSchema
    .findByIdAndUpdate(
      targetId,
      { $addToSet: { reactions: reaction } },
      { new: true },
    )
    .orFail(new NotFoundError(ErrorMessages.UserNotFound))
    .then(() => {
      res.status(StatusCodes.OK).json();
    })
    .catch(next);
};

export const getProfileReactions = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { offset = 0, limit = 20 } = req.query;
  const { id: userId } = req.params;

  userSchema
    .findById(userId)
    .orFail(new NotFoundError(ErrorMessages.UserNotFound))
    .then((userData) => {
      const reactions = userData.reactions.slice(Number(offset), Number(offset) + Number(limit));
      res.status(StatusCodes.OK).json(reactions);
    })
    .catch(next);
};
