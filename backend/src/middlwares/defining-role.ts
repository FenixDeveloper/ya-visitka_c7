import { Response, Request, NextFunction } from 'express';
import Roles from '../helpers/roles';
import UnauthorizedError from '../errors/unauthorized-error';
import ForbiddenError from '../errors/forbidden-error';
import ErrorMessages from '../helpers/error-messages';
import { IUserRole } from '../types/user-payload';

const isCurator = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { role } = req.user as IUserRole;
    if (!role) throw new UnauthorizedError(ErrorMessages.UNAUTHORIZED);

    if (role === Roles.CURATOR) {
      next();
    } else {
      throw new ForbiddenError(ErrorMessages.FORBIDDEN);
    }
  } catch (error) {
    next(error);
  }
};

export default isCurator;
