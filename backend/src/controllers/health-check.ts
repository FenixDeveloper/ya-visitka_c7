import { Request, Response } from 'express';
import StatusCodes from '../helpers/status-codes';

const alive = (req: Request, res: Response) => {
  res.status(StatusCodes.OK).send("I'm alive!");
};

export default alive;
