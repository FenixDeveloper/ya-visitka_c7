// eslint-disable-next-line import/no-extraneous-dependencies
import multer, { MulterError } from 'multer';
import { NextFunction, Request, Response } from 'express';
import { Error } from 'mongoose';

const config = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename(req, file, cb) {
    cb(null, file.originalname);
  },
});

const uploads = multer({ storage: config }).fields([
  { name: 'avatar', maxCount: 1 },
  { name: 'hobby', maxCount: 1 },
  { name: 'status', maxCount: 1 },
  { name: 'job', maxCount: 1 },
  { name: 'education', maxCount: 1 },
]);

// eslint-disable-next-line import/prefer-default-export
export const uploadsMiddleware = (req: Request, res: Response, next: NextFunction) => {
  uploads(req, res, (err) => {
    if (err instanceof MulterError) {
      next(new Error(String(err)));
    }
    next();
  });
};
