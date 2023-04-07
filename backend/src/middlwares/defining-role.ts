import { Response, Request, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import UnauthorizedError from '../errors/unauthorized-error';
import ForbiddenError from '../errors/forbidden-error';
import ErrorMessages from '../helpers/error-messages';

interface IUser {
  role?: string;
}

export const isCurator = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) throw new UnauthorizedError(ErrorMessages.Unauthorized);

  const { role } = jwt.decode(token) as IUser;

  if( role === 'curator' ) {
    next();
  } else {
    throw new ForbiddenError(ErrorMessages.Forbidden)
  }

};
