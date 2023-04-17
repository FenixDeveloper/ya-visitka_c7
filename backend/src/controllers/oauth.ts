import { Response, Request, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import Roles from '../helpers/roles';
import User from '../models/User';
import {
  CLIENT_ID, CLIENT_SECRET, CURATOR_LIST, JWT_SECRET, TOKEN_URL, PROFILE_URL, NODE_ENV,
} from '../config/config';
import UnauthorizedError from '../errors/unauthorized-error';
import NotFoundError from '../errors/not-found-error';
import ErrorMessages from '../helpers/error-messages';
import { IUserPayload, IUserProfileYandex } from '../types/user-payload';

const getUserProfileYandex = async (code: string) => {
  try {
    const response = await fetch(TOKEN_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
      }),
    });
    const { access_token: accessToken } = await response.json();
    if (!accessToken) throw new UnauthorizedError(ErrorMessages.UNAUTHORIZED);
    const userResponse = await fetch(PROFILE_URL, {
      headers: { Authorization: `OAuth${accessToken}` },
    });

    const userProfile = await userResponse.json();
    if (!userProfile) throw new UnauthorizedError(ErrorMessages.UNAUTHORIZED);
    const user: IUserProfileYandex = {
      email: userProfile.default_email,
      name: userProfile.first_name,
    };
    return user;
  } catch (error) {
    throw new UnauthorizedError(ErrorMessages.UNAUTHORIZED);
  }
};

const getToken = (user: IUserPayload) => jwt.sign(
  user,
  NODE_ENV === 'production' ? JWT_SECRET : 'secret',
  { expiresIn: '7d' },
);

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { code } = req.body;
    if (!code) throw new UnauthorizedError(ErrorMessages.UNAUTHORIZED);
    const userProfile = await getUserProfileYandex(code);

    const email = userProfile.email.toLowerCase();
    const isCurator = CURATOR_LIST.toLowerCase().split(',').includes(email);
    const user = await User.findOne({ email });

    let token;
    if (user) {
      const student: IUserPayload = {
        _id: user._id,
        role: Roles.STUDENT,
        email,
      };
      token = getToken(student);
      const { name } = userProfile;
      await User.updateOne(
        { _id: user._id },
        { $set: { 'profile.name': name } },
      ).orFail(new NotFoundError(ErrorMessages.USER_NOT_FOUND))
        .catch(next);
    }

    if (isCurator) {
      const curator: IUserPayload = {
        _id: null,
        role: Roles.CURATOR,
        email,
      };
      token = getToken(curator);
    }

    if (!token) throw new NotFoundError(ErrorMessages.USER_NOT_FOUND);
    res.send({ token });
  } catch (error) {
    next(error);
  }
};

export const getUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { authorization } = req.headers;
    if (!authorization || !authorization.startsWith('Bearer ')) throw new UnauthorizedError(ErrorMessages.UNAUTHORIZED);
    const token = authorization.replace('Bearer ', '');

    const { _id, role, email } = jwt.decode(token) as IUserPayload;
    if (role === Roles.STUDENT) {
      const student = await User.findById(_id);
      const name = student?.profile.name;
      const photo = student?.profile.photo;
      const cohort = student?.cohort;
      res.send({
        _id, name, photo, email, cohort, role,
      });
    }

    if (role === Roles.CURATOR) {
      res.send({ email, role });
    }
  } catch (error) {
    next(error);
  }
};
