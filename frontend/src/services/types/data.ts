import { SyntheticEvent } from 'react';

export interface UserData {
  user: {
    name: string;
    avatar?: string
  };
}

export interface IButtonProps {
  size?: 'large' | 'medium' | 'small',
  onClick?: () => void | ((e: SyntheticEvent) => void);
  children?: React.ReactNode;
  disabled?: boolean;
  htmlType?: 'button' | 'submit' | 'reset';
}

export interface IUserRequest {
  email: string;
  cohort?: string;
}

export interface ITokens {
  accessToken: string,
  refreshToken: string
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
      image: null;
    };
    status: {
      text: string;
      image: null;
    };
    job: {
      text: string;
      image: null;
    };
    edu: {
      text: string;
      image: null;
    };
  };
}
