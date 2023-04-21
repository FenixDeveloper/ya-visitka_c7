import { Request, Response, NextFunction } from 'express';
import StatusCodes from '../helpers/status-codes';

const allowedCors = [
  'http://localhost:3000',
  'https://localhost:3000',
  'https://visitki-dev.team-7.practicum-team.ru',
  'http://visitki-dev.team-7.practicum-team.ru',
];

const accessControlAllowMiddlware = (req: Request, res: Response, next: NextFunction) => {
  const { origin } = req.headers;

  if (origin && allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, PATCH, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', 'true');
  }

  if (req.method === 'OPTIONS') {
    res.sendStatus(StatusCodes.OK);
  } else {
    next();
  }
};

export default accessControlAllowMiddlware;
