import { NextFunction, Request, Response } from 'express';
import { NotFoundError } from '../errors';
import ErrorMessages from '../helpers/error-messages';

const nonExistentRequestHandler = (_req: Request, _res: Response, next: NextFunction) => {
  next(new NotFoundError(ErrorMessages.NOT_FOUND));
};

export default nonExistentRequestHandler;
