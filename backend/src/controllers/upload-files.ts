import {
  Request, Response, NextFunction,
} from 'express';
import path from 'path';
import fs from 'fs';
import BadRequestError from '../errors/bad-request-error';
import { TFiles, TInfoTypes } from '../types/files';
import ErrorMessages from '../helpers/error-messages';

export const uploadFiles = (
  req: Request<{}, {}, { files: TFiles }>,
  res: Response,
) => {
  const files = req.files as TFiles;

  const result = Object.keys(files)
    .reduce(
      (acc, key) => {
        const fileDescription = files[key as TInfoTypes][0];
        acc[key] = fileDescription.filename;

        return acc;
      },
      {} as {
        [a: string]: string;
      },
    );

  const filePath = path.resolve('uploads');
  res.download(filePath, JSON.stringify(result));
  res.send(JSON.stringify(result));
};

export const getFile = (
  req: Request<{ filename: string }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { filename } = req.params;
    const filePath = path.resolve('uploads', filename);
    if (!fs.existsSync(filePath)) {
      throw new BadRequestError(ErrorMessages.NOT_FOUND);
    }
    res.sendFile(filePath);
  } catch (error) {
    next(error);
  }
};
