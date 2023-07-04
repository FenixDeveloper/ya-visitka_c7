import { IReqUser } from './custom.types';

declare global{
    namespace Express {
        interface Request {
            user?: IReqUser;
        }
    }
}
