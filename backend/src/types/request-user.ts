import { ObjectId } from 'mongoose';

export interface IReqUser {
  id: string | ObjectId | null;
  email: string;
  role: 'student' | 'curator';
}
