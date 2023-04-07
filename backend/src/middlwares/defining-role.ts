import { Response, Request, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import UnauthorizedError from '../errors/unauthorized-error';
import ForbiddenError from '../errors/forbidden-error';
import ErrorMessages from '../helpers/error-messages';

interface IUser {
  role?: string;
}

export const isCurator = (req: Request, res: Response, next: NextFunction) => {
  const { role } = req.user as IUser;
  if (!role ) throw new UnauthorizedError(ErrorMessages.Unauthorized);

  if( role === 'curator' ) {
    next();
  } else {
    throw new ForbiddenError(ErrorMessages.Forbidden)
  }

};
