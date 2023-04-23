import React, { SyntheticEvent } from 'react';

export interface UserData {
  user: {
    _id: string;
    name: string;
    avatar?: string;
  };
}

export interface IButtonProps {
  size?: 'large' | 'medium' | 'small';
  onClick?: () => void | ((e: SyntheticEvent) => void);
  children?: React.ReactNode;
  disabled?: boolean;
  htmlType?: 'button' | 'submit' | 'reset';
}

export interface IInputProps {
  type: 'text' | 'textarea' | 'file' | 'select' | 'date' | 'avatar';
  name?: string;
  label?: string;
  arrValues?: string[];
  placeholder?: string;
  onChange?(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void;
  value?: string;
  errorMessage?: string;
  caption?: string;
  isMainPage?: boolean;
}

export interface IBlogProps {
  typeComponent: 'серьезный' | 'романтичный' | 'дерзкий';
  index: number;
  title: string;
  urlImage: string;
  text: string;
}

export interface ICommunicationProps {
  arrСomments: { message: string }[];
}

export interface IUserRequest {
  email: string;
  cohort: string;
}

export interface IProfile {
  profile: {
    name: string;
    photo: string;
    city: {
      name: string;
      geocode: Array<number>;
    };
    birthday: string;
    quote: string;
    telegram: string;
    github: string;
    template: string;
  };
  info: {
    hobby: {
      text: string;
      image: null | string;
    };
    status: {
      text: string;
      image: null | string;
    };
    job: {
      text: string;
      image: null | string;
    };
    edu: {
      text: string;
      image: null | string;
    };
  };
}

export interface IFile {
  hobby: string;
  status: string;
  job: string;
  education: string;
  avatar: string;
}

export enum UserStatus {
  STUDENT = 'student',
  CURATOR = 'curator',
}

export type TStudentsDataFull = TStudentsData & {
  createdAt: number;
  updatedAt: number;
};

export type TStudentsData = {
  _id: string;
  email: string;
  cohort: string;
  name?: string;
};

export enum UpdateField {
  COHORT = 'cohort',
  EMAIL = 'email',
}

export type TStudent = {
  cohort: string;
  email: string;
  name: string;
  id: string;
  fromFile: boolean;
  validationError: boolean;
};

export type TStudentProps = TStudent & {
  handleDelete?: () => void;
  handleUpdate: (student: TStudent) => void;
  updateValidation: (validation: boolean) => void;
};

export type TRedirectURI = {
  localhost: string;
  visitkiDev: string;
  visitki: string;
};

type TCommentAuthor = {
  _id: string;
  email: string;
  cohort: string;
  name: string;
}

export type TComment = {
  _id: string;
  from: TCommentAuthor;
  target: string;
  text: string;
  to: TCommentAuthor;
};

export type TVisitka = {
  _id: string,
      createdAt: string,
      updatedAt: string,
      email: string,
      cohort: string,
      profile?: {
        name: string,
        photo: string,
        city: {
          name: string,
          geocode: [
            number, number
          ]
        }
      },
      reactions?: number
}
