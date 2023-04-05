import { Request, Response, NextFunction } from 'express';
import ErrorMessages from '../helpers/error-messages';
import StatusCodes from '../helpers/status-codes';
import User from '../models/User';

export const getComments = (req: Request, res: Response, next: NextFunction) => {
  const { offset, limit = 20, search } = req.query;

  User.aggregate([
    { $skip: Number(offset) > 0 ? Number(offset) : 0 },
    { $limit: limit !== undefined && Number(limit) !== 0 ? Number(limit) : 0 },
    { $unwind: '$reactions' },
    {
      $lookup: {
        from: 'users',
        localField: 'reactions.from._id',
        foreignField: '_id',
        as: 'userWithCohort',
      },
    },
    { $unwind: '$userWithCohort' },
    {
      $addFields: {
        'reactions.from.cohort': '$userWithCohort.cohort',
      },
    },
    {
      $group: {
        _id: '$_id',
        createdAt: { $first: '$createdAt' },
        updatedAt: { $first: '$updatedAt' },
        email: { $first: '$email' },
        cohort: { $first: '$cohort' },
        name: { $first: '$profile.name' },
        reactions: { $push: '$reactions' },
      },
    },
    {
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
    },
    { $unwind: '$reactions' },
    { $match: { 'reactions.emotion': { $exists: false } } },
    { $group: { _id: '$_id', items: { $push: '$reactions' }, to: { $first: '$to' } } },
    { $addFields: { total: { $size: '$items' } } },
    {
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
    },
    { $unwind: '$items' },
    { $sort: { 'items._id': 1 } },
    { $project: { 'items.type': 0 } },
    {
      $match: {
        $or: [
          { 'items.from.name': { $regex: search, $options: 'i' } },
          { 'items.from.email': { $regex: search, $options: 'i' } },
          { 'items.to.name': { $regex: search, $options: 'i' } },
          { 'items.to.email': { $regex: search, $options: 'i' } },
          { 'items.to.cohort': { $regex: search, $options: 'i' } },
        ],
      },
    },
    { $group: { _id: 'null', items: { $push: '$items' }, total: { $sum: 1 } } },
    { $project: { _id: 0, total: 1, items: 1 } },
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
