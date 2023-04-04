import React, { SyntheticEvent } from 'react';

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

export interface IInputProps {
  type: 'text' | 'textarea' | 'file' | 'select' | 'date';
  name?: string;
  label?: string;
  arrValues?: string[];
  placeholder?: string;
  onChange?(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void;
  value?: string;
  errorMessage?: string;
}