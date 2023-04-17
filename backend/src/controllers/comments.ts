import { Request, Response, NextFunction } from 'express';
import { isValidObjectId } from 'mongoose';
import ErrorMessages from '../helpers/error-messages';
import StatusCodes from '../helpers/status-codes';
import User from '../models/User';
import { BadRequestError, NotFoundError } from '../errors';

export const getComments = (req: Request, res: Response, next: NextFunction) => {
  const { offset = 0, limit = 20, search = '' } = req.query;

  const lookupSender = {
    from: 'users',
    localField: 'reactions.from._id',
    foreignField: '_id',
    as: 'reactionSenderObject',
  };

  const addFieldCohort = { 'reactions.from.cohort': '$reactionSenderObject.cohort' };

  const groupReactionsWithFromCohort = {
    _id: '$_id',
    email: { $first: '$email' },
    cohort: { $first: '$cohort' },
    name: { $first: '$profile.name' },
    reactions: { $push: '$reactions' },
  };

  const projectWithToObj = {
    _id: 1,
    to: {
      _id: '$_id', name: '$name', email: '$email', cohort: '$cohort',
    },
    reactions: '$reactions',
  };

  const noEmotions = { 'reactions.emotion': { $exists: false } };

  const addFieldTotal = { total: { $size: '$items' } };

  const fildsShowWithItems = {
    _id: 0,
    total: 1,
    items: {
      $map: {
        input: '$items',
        as: 'item',
        in: {
          $mergeObjects: ['$$item', { type: '$type' }, { to: '$to' }, { from: '$from' }],
        },
      },
    },
  };

  const removeType = { 'items.type': 0 };

  const filter = [
    { 'items.from.name': { $regex: search, $options: 'i' } },
    { 'items.from.email': { $regex: search, $options: 'i' } },
    { 'items.to.name': { $regex: search, $options: 'i' } },
    { 'items.to.email': { $regex: search, $options: 'i' } },
    { 'items.to.cohort': { $regex: search, $options: 'i' } },
  ];

  const groupFinal = { _id: 'null', items: { $push: '$items' }, total: { $sum: 1 } };

  const finalfieldsShow = { _id: 0, total: 1, items: 1 };

  User.aggregate()
    .unwind('reactions')
    .lookup(lookupSender)
    .unwind('reactionSenderObject')
    .addFields(addFieldCohort)
    .group(groupReactionsWithFromCohort)
    .project(projectWithToObj)
    .unwind('reactions')
    .match(noEmotions)
    .group({ _id: '$_id', items: { $push: '$reactions' }, to: { $first: '$to' } })
    .addFields(addFieldTotal)
    .project(fildsShowWithItems)
    .unwind('items')
    .project(removeType)
    .match({ $or: filter })
    .skip(+offset)
    .limit(+limit)
    .group(groupFinal)
    .project(finalfieldsShow)
    .sort({ createdAt: 'desc' })
    .then((comments) => {
      res.status(StatusCodes.OK).json(comments[0]);
    })
    .catch(next);
};

export const deleteComment = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  if (!id || !isValidObjectId(id)) {
    next(new BadRequestError(ErrorMessages.BAD_REQUEST));
  }

  try {
    const updateResult = await User.updateOne(
      { 'reactions._id': id },
      { $pull: { reactions: { _id: id } } },
    );

    if (updateResult.modifiedCount === 1) {
      res.sendStatus(StatusCodes.OK);
    } else {
      next(new NotFoundError(ErrorMessages.NOT_FOUND));
    }
  } catch (err) {
    next(err);
  }
};
