import { NextFunction, Request, Response } from 'express';
import { NotFoundError } from '../errors';
import ErrorMessages from '../helpers/error-messages';

const nonExistentRequestHandler = (req: Request, res: Response, next: NextFunction) => {
  next(new NotFoundError(ErrorMessages.NOT_FOUND));
};

export default nonExistentRequestHandler;
