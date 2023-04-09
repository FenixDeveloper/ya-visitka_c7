import { Request, Response, NextFunction } from 'express';
import ErrorMessages from '../helpers/error-messages';
import StatusCodes from '../helpers/status-codes';
import User from '../models/User';

export const getComments = (req: Request, res: Response, next: NextFunction) => {
  const { offset = 0, limit = 20, search = '' } = req.query;

  const skipCommentsStage = { $skip: Number(offset) };

  const limitCommentsStage = { $limit: Number(limit) };

  const lookUpReactionSenderObjStage = {
    $lookup: {
      from: 'users',
      localField: 'reactions.from._id',
      foreignField: '_id',
      as: 'reactionSenderObject',
    },
  };

  const addSenderCohortIntoReactionFromFieldStage = {
    $addFields: {
      'reactions.from.cohort': '$reactionSenderObject.cohort',
    },
  };

  const groupUserObjectWithAddedSenderReactionCohortWithoutUnusedFieldsStage = {
    $group: {
      _id: '$_id',
      email: { $first: '$email' },
      cohort: { $first: '$cohort' },
      name: { $first: '$profile.name' },
      reactions: { $push: '$reactions' },
    },
  };

  const excludeEmotionReactionsStage = { $match: { 'reactions.emotion': { $exists: false } } };

  const collectToObjAndMakeProjectStage = {
    $project: {
      _id: 1,
      to: {
        _id: '$_id',
        name: '$name',
        email: '$email',
        cohort: '$cohort',
      },
      reactions: '$reactions',
    },
  };

  const groupUserObjByIdAndSaveToObjStage = {
    $group: {
      _id: '$_id', items: { $push: '$reactions' }, to: { $first: '$to' },
    },
  };

  const addTotalReactionsCountIntoEachUserObjStage = { $addFields: { total: { $size: '$items' } } };

  const collectReactionDocWithTotalAndItemsFieldsAndAddToObjIntoEachReactionStage = {
    $project: {
      _id: 0,
      total: 1,
      items: {
        $map: {
          input: '$items',
          as: 'item',
          in: {
            $mergeObjects: [
              '$$item',
              { type: '$type' },
              { to: '$to' },
              { from: '$from' },
            ],
          },
        },
      },
    },
  };

  const deleteReactionTypeFieldFromProjectStage = { $project: { 'items.type': 0 } };

  const searchByFields = {
    $match: {
      $or: [
        { 'items.from.name': { $regex: search, $options: 'i' } },
        { 'items.from.email': { $regex: search, $options: 'i' } },
        { 'items.to.name': { $regex: search, $options: 'i' } },
        { 'items.to.email': { $regex: search, $options: 'i' } },
        { 'items.to.cohort': { $regex: search, $options: 'i' } },
      ],
    },
  };

  const groupAllReactionObjectsIntoOneArrAndAddTotalForThemStage = {
    $group: { _id: 'null', items: { $push: '$items' }, total: { $sum: 1 } },
  };

  const deleteIdFieldFromTheOutputStage = { $project: { _id: 0, total: 1, items: 1 } };

  User.aggregate([
    skipCommentsStage,
    limitCommentsStage,
    { $unwind: '$reactions' },
    lookUpReactionSenderObjStage,
    { $unwind: '$reactionSenderObject' },
    addSenderCohortIntoReactionFromFieldStage,
    groupUserObjectWithAddedSenderReactionCohortWithoutUnusedFieldsStage,
    collectToObjAndMakeProjectStage,
    { $unwind: '$reactions' },
    excludeEmotionReactionsStage,
    groupUserObjByIdAndSaveToObjStage,
    addTotalReactionsCountIntoEachUserObjStage,
    collectReactionDocWithTotalAndItemsFieldsAndAddToObjIntoEachReactionStage,
    { $unwind: '$items' },
    { $sort: { 'items._id': 1 } },
    deleteReactionTypeFieldFromProjectStage,
    searchByFields,
    groupAllReactionObjectsIntoOneArrAndAddTotalForThemStage,
    deleteIdFieldFromTheOutputStage,
  ])
    .then((comments) => {
      res.status(StatusCodes.OK).json(comments[0]);
    })
    .catch(next);
};

export const deleteComment = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  try {
    const updateResult = await User.updateOne(
      { 'reactions._id': id },
      { $pull: { reactions: { _id: id } } },
    );

    if (updateResult.modifiedCount === 1) {
      res.status(StatusCodes.OK).json();
    } else {
      res.status(StatusCodes.NOT_FOUND).json({ error: ErrorMessages.NotFound });
    }
  } catch (err) {
    if (err instanceof Error && err.name === 'CastError') {
      res.status(StatusCodes.NOT_FOUND).json({ error: ErrorMessages.NotFound });
    }
    next(err);
  }
};
