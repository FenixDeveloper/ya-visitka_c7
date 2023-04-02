/* eslint-disable no-unused-vars */
import {
  Request, Response, Express,
} from 'express';

type TInfoTypes = 'hobby' | 'status' | 'job' | 'education' | 'avatar';

type TFiles = { [key in TInfoTypes]: Express.Multer.File[] };

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
