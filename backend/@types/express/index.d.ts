/* eslint-disable no-unused-vars */
import { ObjectId } from 'mongoose';
import { IReqUser } from './custom.types';

declare global{
    namespace Express {
        interface Request {
            user?: IReqUser;
        }
    }
}
