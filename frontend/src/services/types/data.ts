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