import { celebrate, Joi } from 'celebrate';
import { isEmailValid, isUrlValid } from './validate-url';

export const signInValidator = celebrate({
  body: Joi.object()
    .required()
    .keys({
      email: Joi.string().email().required().custom(isEmailValid),
      password: Joi.string().required(),
    }),
});

export const createUserValidator = celebrate({
  body: Joi.object()
    .required()
    .keys({
      email: Joi.string().email().custom(isEmailValid),
      cohort: Joi.string()
        .max(20)
        .pattern(/([a-zA-Z]+)([+|-|_]*)(\d*)/gm),
    }),
});

export const updateUserValidator = celebrate({
  params: Joi.object().keys({
    id: Joi.string().required(),
  }),
  body: Joi.object()
    .required()
    .keys({
      email: Joi.string().email().custom(isEmailValid),
      cohort: Joi.string()
        .max(20)
        .pattern(/([a-zA-Z]+)([+|-|_]*)(\d*)/gm),
    }),
});

export const profileValidator = celebrate({
  params: Joi.object().keys({
    id: Joi.string().required(),
  }),
  body: Joi.object().required().keys({
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
      hobby: {
        text: Joi.string().max(1500),
        image: Joi.string().custom(isUrlValid),
      },
      status: {
        text: Joi.string().max(1500),
        image: Joi.string().custom(isUrlValid),
      },
      job: {
        text: Joi.string().max(1500),
        image: Joi.string().custom(isUrlValid),
      },
      edu: {
        text: Joi.string().max(1500),
        image: Joi.string().custom(isUrlValid),
      },
    }),
  }),
});

export const commentValidator = celebrate({
  params: Joi.object().keys({
    id: Joi.string().required(),
  }),
  body: Joi.object()
    .required()
    .keys({
      target: Joi.string().required(),
      text: Joi.string().max(200),
    }),
});
