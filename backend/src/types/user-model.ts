import { Model, Document, ObjectId } from 'mongoose';

export interface IStudent {
  _id: ObjectId;
  name: string;
  email: string;
}

export interface IBlock {
  text?: string;
  image?: string | null;
}

export interface IInfo {
  hobby: IBlock;
  status: IBlock;
  job: IBlock;
  edu: IBlock;
}

export interface ICity {
  name: string;
  geocode: number[];
}

export interface IProfile {
  name: string;
  photo: string;
  city: ICity | null;
  birthday: string | null;
  quote: string;
  telegram: string | null;
  github: string | null;
  template: string | null;
}

export interface IReaction {
  from: {
    name: string;
    email: string;
  };
  target: string | null;
  text?: string;
  emotion?: string;
}

export interface IСomment {
  from: {
    name: string;
    email: string;
  };
  target: string | null;
  text: string;
}

export interface IEmotion {
  from: {
    name: string;
    email: string;
  };
  target: string | null;
  emotion: string;
}

export interface IUser {
  createdAt: number;
  updatedAt: number;
  email: string;
  cohort: string;
  timestamps: boolean;
  profile: IProfile;
  info: IInfo;
  reactions: IReaction[];
}

export interface IUserModel extends Model<IUser> {
  findUserByEmail: (
    // eslint-disable-next-line no-unused-vars
    email: string,
  ) => Promise<Document<unknown, any, IUser>>;
  aggregateAndSort: () => Promise<Document<unknown, any, IUser>>;
}
