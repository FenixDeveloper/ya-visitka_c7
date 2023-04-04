import {
  model, Schema, Model, Document,
} from 'mongoose';
// eslint-disable-next-line import/no-extraneous-dependencies
import isEmail from 'validator/lib/isEmail';
import NotFoundError from '../errors/not-found-error';
import ErrorMessages from '../helpers/error-messages';
import { imageOrTempIdRegex } from '../constants/constants';
import { reactionSchema } from './Reaction';

interface IBlock {
  text?: string;
  image?: string | null;
}

interface IInfo {
  hobby: IBlock;
  status: IBlock;
  job: IBlock;
  edu: IBlock;
}

interface ICity {
  name: string;
  geocode: number[];
}

interface IProfile {
  name: string;
  photo: string;
  city: ICity | null;
  birthday: string | null;
  quote: string;
  telegram: string | null;
  github: string | null;
  template: string | null;
}

interface IUser {
  createdAt: number;
  updatedAt: number;
  email: string;
  cohort: string;
  timestamps: boolean;
  profile: IProfile;
  info: IInfo;
  reactions: [
    {
      from: {
        name: string;
        email: string;
      };
      target: string | null;
      text?: string;
      emotion?: string;
    }
  ];
}

interface IUserModel extends Model<IUser> {
  findUserByEmail: (
    // eslint-disable-next-line no-unused-vars
    email: string,
  ) => Promise<Document<unknown, any, IUser>>;
  agregateAndSort: () => Promise<Document<unknown, any, IUser>>;
}

const blockSchema = new Schema<IBlock>(
  {
    text: {
      type: String,
      maxlength: 1500,
    },
    image: {
      type: String,
      validate: {
        validator(v: string) {
          return imageOrTempIdRegex.test(v);
        },
      },
    },
  },
  { _id: false },
);

const infoSchema = new Schema<IInfo>(
  {
    hobby: blockSchema,
    status: blockSchema,
    job: blockSchema,
    edu: blockSchema,
  },
  { _id: false },
);

const citySchema = new Schema<ICity>(
  {
    name: {
      type: String,
    },
    geocode: {
      type: [Number],
    },
  },
  { _id: false },
);

const profileSchema = new Schema<IProfile>(
  {
    name: {
      type: String,
    },
    photo: {
      type: String,
      validate: {
        validator(v: string) {
          return imageOrTempIdRegex.test(v);
        },
      },
    },
    city: citySchema,
    // В дальнейшем у birthday может поменяться на type: Schema.Types.Date
    // (обратить внимание после интеграции с фронтом)
    birthday: {
      type: String,
    },
    quote: {
      type: String,
      maxlength: 200,
    },
    telegram: {
      type: String,
    },
    github: {
      type: String,
    },
    template: {
      type: String,
    },
  },
  { _id: false },
);

const userSchema = new Schema<IUser, IUserModel>(
  {
    createdAt: {
      type: Number,
    },
    updatedAt: {
      type: Number,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      validate: {
        validator(v: string) {
          return isEmail(v);
        },
      },
    },
    cohort: {
      type: String,
      // match: cohortRegEx,
    },
    profile: profileSchema,
    info: infoSchema,
    reactions: {
      type: [reactionSchema],
      default: [],
    },
  },
  {
    timestamps: { currentTime: () => Math.floor(Date.now() / 1000) },
  },
);

userSchema.static('findUserByEmail', function findUserByEmail(email: string) {
  return this.findOne({ email }).then((user) => {
    if (!user) {
      throw new NotFoundError(ErrorMessages.NotFound);
    }
    return user;
  });
});

userSchema.static('agregateAndSort', function agregateAndSort() {
  return this.aggregate([
    { $unwind: '$reactions' },
    { $sort: { 'reactions._id': 1 } },
  ]).exec();
});

userSchema.index({ email: 1 }, { unique: true });

export default model<IUser, IUserModel>('User', userSchema);
