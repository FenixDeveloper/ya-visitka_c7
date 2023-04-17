import { NextFunction, Request, Response } from 'express';
import ErrorMessages from '../helpers/error-messages';
import StatusCodes from '../helpers/status-codes';
import { ICustomError } from '../types/custom-error';

const errorMiddleware = (err: ICustomError, req: Request, res: Response, next: NextFunction) => {
  const { statusCode = StatusCodes.INTERNAL_SERVER_ERROR } = err;
  const isErrorInternal = statusCode === StatusCodes.INTERNAL_SERVER_ERROR;
  const message = isErrorInternal ? ErrorMessages.INTERNAL_SERVER_ERROR : err.message;
  res.status(statusCode).send({ message });
  next();
};

export default errorMiddleware;
