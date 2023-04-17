import { Types } from 'mongoose';

export interface IUserPayload {
  _id: Types.ObjectId | null;
  email: string;
  role: string;
}

export interface IUserProfileYandex {
  email: string;
  name: string;
}

export interface IUserRole {
  role?: string;
}
