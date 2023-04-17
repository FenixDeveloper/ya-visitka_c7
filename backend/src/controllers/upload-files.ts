import {
  Request, Response, Express, NextFunction,
} from 'express';
import path from 'path';
import fs from 'fs';
import BadRequestError from '../errors/bad-request-error';
import ErrorMessages from '../helpers/error-messages';

type TInfoTypes = 'hobby' | 'status' | 'job' | 'education' | 'avatar';

type TFiles = { [key in TInfoTypes]: Express.Multer.File[] };

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
  const filePath = path.resolve('uploads');
  res.download(filePath, JSON.stringify(result));
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
      throw new BadRequestError(ErrorMessages.NotFound);
    }
    res.sendFile(filePath);
  } catch (error) {
    next(error);
  }
};
