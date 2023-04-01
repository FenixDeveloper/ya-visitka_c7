import { celebrate, Joi } from 'celebrate';
import { isCohortValid, isEmailValid, isUrlValid } from './validate-url';

const joiEmail = Joi.string().email().required().custom(isEmailValid);
const joiCohort = Joi.string().max(20).custom(isCohortValid);
const joiId = Joi.string().length(24).hex().required();
const joiOffset = Joi.number().integer().positive().default(0);
const joiLimit = Joi.number().integer().positive().default(20);
const joiSearch = Joi.string().default('');
const joiInfoItem = Joi.object().keys({
  text: Joi.string().max(1500),
  image: Joi.string().custom(isUrlValid),
});

export const signInValidator = celebrate({
  body: Joi.object()
    .required()
    .keys({
      email: joiEmail,
      password: Joi.string().required(),
    }),
});

export const createUserValidator = celebrate({
  body: Joi.object()
    .required()
    .keys({
      email: joiEmail,
      cohort: joiCohort,
    }),
});

export const updateUserValidator = celebrate({
  params: Joi.object().keys({
    id: joiId,
  }),
  body: Joi.object().required().keys({
    email: joiEmail,
    cohort: joiCohort,
  }),
});

export const updateProfileValidator = celebrate({
  params: Joi.object().keys({
    id: joiId,
  }),
  body: Joi.object()
    .required()
    .keys({
      profile: Joi.object().keys({
        name: Joi.string(),
        photo: Joi.string().custom(isUrlValid),
        city: {
          name: Joi.string(),
          geocode: Joi.array().length(2).items(Joi.number(), Joi.number()),
        },
        birthday: Joi.date().iso(),
        quote: Joi.string().max(200),
        telegram: Joi.string(),
        github: Joi.string(),
        template: Joi.string(),
      }),
      info: Joi.object().keys({
        hobby: joiInfoItem,
        status: joiInfoItem,
        job: joiInfoItem,
        edu: joiInfoItem,
      }),
    }),
});

export const postCommentValidator = celebrate({
  params: Joi.object().keys({
    id: joiId,
  }),
  body: Joi.object()
    .required()
    .keys({
      target: Joi.string(),
      text: Joi.string().max(200),
    }),
});

export const postReactionValidator = celebrate({
  params: Joi.object().keys({
    id: joiId,
  }),
  body: Joi.object()
    .required()
    .keys({
      target: Joi.string(),
      emotion: joiId,
    }),
});

export const getUsersValidator = celebrate({
  params: Joi.object().keys({
    offset: joiOffset,
    limit: joiLimit,
    search: joiSearch,
  }),
});

export const getCommentsValidator = celebrate({
  params: Joi.object().keys({
    offset: joiOffset,
    limit: joiLimit,
    search: joiSearch,
  }),
});

export const getProfilesValidator = celebrate({
  params: Joi.object().keys({
    offset: joiOffset,
    limit: joiLimit,
    cohort: joiCohort,
  }),
});

export const getProfileByIdValidator = celebrate({
  params: Joi.object().keys({
    id: joiId,
  }),
});

export const getProfileReactionsValidator = celebrate({
  params: Joi.object().keys({
    offset: joiOffset,
    limit: joiLimit,
    id: joiId,
  }),
});

export const deleteCommentValidator = celebrate({
  params: Joi.object().keys({
    id: joiId,
  }),
});
