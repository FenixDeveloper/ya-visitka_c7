import { NextFunction, Request, Response } from 'express';
import User from '../models/User';
import { ConflictError, NotFoundError } from '../errors';
import ErrorMessages from '../helpers/error-messages';

export async function getUsers(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { offset, limit, search } = req.query;

  const searchQuery = search?.length
    ? [{ email: search }, { cohort: search }, { 'profile.name': search }]
    : [{}];

  try {
    const items = await User.find(
      {
        $or: searchQuery,
      },
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

export async function createUser(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { email, cohort } = req.body;
    const user = await User.create({ email, cohort });
    const result = await User.findById(user._id);
    res.send(result);
  } catch (err) {
    next(err);
  }
}

export async function updateUser(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { email, cohort } = req.body;
  try {
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      throw new ConflictError(ErrorMessages.EmailConflict);
    }

    const user = await User.findById(req.params.id);
    if (!user) {
      throw new NotFoundError(ErrorMessages.NotFound);
    }
    await user.updateOne({ email, cohort });
    const result = await User.findById(user._id);
    res.send(result);
  } catch (err) {
    next(err);
  }
}
