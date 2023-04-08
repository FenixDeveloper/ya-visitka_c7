import { ObjectId } from 'mongoose';

export interface IStudent {
  _id: ObjectId;
  name: string;
  email: string;
}
