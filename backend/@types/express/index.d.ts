import { ObjectId } from 'mongoose';
import { JwtPayload } from "jsonwebtoken"

declare global{
    namespace Express {
        interface Request {
            user: string | JwtPayload;
        }
    }
}
