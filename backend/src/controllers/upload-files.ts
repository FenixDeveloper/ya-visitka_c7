import {
  Request, Response, NextFunction,
} from 'express';
import path from 'path';
import fs from 'fs';
import { TFiles, TInfoTypes } from '../types/upload-files';
import BadRequestError from '../errors/bad-request-error';

// eslint-disable-next-line import/prefer-default-export
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

  res.send(JSON.stringify(result));
};

export const getFile = (
  req: Request<{ filename: string }>,
  res: Response,
  next: NextFunction,
) => {
  const { filename } = req.params;
  const filePath = path.resolve('./uploads', filename);
  if (!fs.existsSync(filePath)) {
    next(new BadRequestError('Такого файла не существует'));
  }
  res.sendFile(filePath);
};
