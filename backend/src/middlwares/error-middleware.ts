import { NextFunction, Request, Response } from 'express';
import ErrorMessages from '../helpers/error-messages';
import StatusCodes from '../helpers/status-codes';
import { ICustomError } from '../types/custom-error';

const errorHandler = (err: ICustomError, req: Request, res: Response, next: NextFunction) => {
  const {
    statusCode = StatusCodes.INTERNAL_SERVER_ERROR,
    message = ErrorMessages.InternalServerError,
  } = err;

  res
    .status(statusCode)
    .send({ message });
  return next();
};

export default errorHandler;
