import { Response, Request, NextFunction } from 'express';
import UnauthorizedError from '../errors/unauthorized-error';
import ForbiddenError from '../errors/forbidden-error';
import ErrorMessages from '../helpers/error-messages';

interface IUser {
  role?: string;
}

const isCurator = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { role } = req.user as IUser;
    if (!role) throw new UnauthorizedError(ErrorMessages.Unauthorized);

    if (role === 'curator') {
      next();
    } else {
      throw new ForbiddenError(ErrorMessages.Forbidden);
    }
  } catch (error) {
    next(error);
  }
};

export default isCurator;
