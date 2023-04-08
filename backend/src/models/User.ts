import { model, Schema } from 'mongoose';
import isEmail from 'validator/lib/isEmail';
import { isCohortValid, imageOrTempIdRegex } from '../helpers/validate-url';
import NotFoundError from '../errors/not-found-error';
import ErrorMessages from '../helpers/error-messages';
import { reactionSchema } from './Reaction';
import {
  IBlock, ICity, IInfo, IProfile, IUser, IUserModel,
} from '../types/user-model';

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
      validate: {
        validator(cohort: string) {
          return isCohortValid(cohort);
        },
      },
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

userSchema.index({ email: 1 }, { unique: true });

export default model<IUser, IUserModel>('User', userSchema);
