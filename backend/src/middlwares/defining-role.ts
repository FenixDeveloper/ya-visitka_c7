import { Response, Request, NextFunction } from 'express';
import UnauthorizedError from '../errors/unauthorized-error';
import ForbiddenError from '../errors/forbidden-error';
import ErrorMessages from '../helpers/error-messages';
import { IUser } from '../types/user-payload';

const isCurator = (req: Request, res: Response, next: NextFunction) => {
  const { role } = req.user as IUser;
  if (!role) throw new UnauthorizedError(ErrorMessages.UNAUTHORIZED);

  if (role === 'curator') {
    next();
  } else {
    throw new ForbiddenError(ErrorMessages.FORBIDDEN);
  }
};

export default isCurator;
