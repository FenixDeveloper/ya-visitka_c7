import { celebrate, Joi } from 'celebrate';
import { isCohortValid, isEmailValid, isUrlValid } from './validate-url';

const joiEmail = Joi.string().email().required().custom(isEmailValid);
const joiCohort = Joi.string().max(20).custom(isCohortValid);
const joiId = Joi.string().length(24).hex().required();
const joiOffset = Joi.number().integer().positive();
const joiLimit = Joi.number().integer().positive();
const joiSearch = Joi.string();
const joiInfoItem = Joi.object().keys({
  text: Joi.alternatives().try(Joi.string().max(1500), Joi.string().empty('')),
  image: Joi.string().custom(isUrlValid).allow(null),
});

const joiEmotion = Joi.object()
  .required()
  .keys({
    target: Joi.string(),
    emotion: Joi.string().length(24).hex().required(),
  });

const joiComment = Joi.object()
  .required()
  .keys({
    target: Joi.string(),
    text: Joi.string().max(200).required(),
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
        photo: Joi.string().custom(isUrlValid).allow(null),
        city: Joi.object().allow(null).keys({
          name: Joi.string(),
          geocode: Joi.array().length(2).items(Joi.number(), Joi.number()),
        }),
        birthday: Joi.date().iso().allow(null),
        quote: Joi.string().max(200),
        telegram: Joi.string().allow(null),
        github: Joi.string().allow(null),
        template: Joi.string().allow(null),
      }),
      info: Joi.object().keys({
        hobby: joiInfoItem,
        status: joiInfoItem,
        job: joiInfoItem,
        edu: joiInfoItem,
      }),
    }),
});

export const postReactionValidator = celebrate({
  params: Joi.object().keys({
    id: joiId,
  }),
  body: Joi.alternatives().try(joiComment, joiEmotion),
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
