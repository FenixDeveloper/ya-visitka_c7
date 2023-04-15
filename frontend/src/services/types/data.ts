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

export enum UserStatus {
  Student = 'STUDENT',
  Curator = 'CURATOR',
}
