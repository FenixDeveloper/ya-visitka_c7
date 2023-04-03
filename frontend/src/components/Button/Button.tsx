import React from 'react';
import styles from './Button.module.scss';
import { IButtonProps } from '../../services/types/data';

export const Button: React.FC<IButtonProps> = ({
  size = 'large',
  onClick,
  children,
  disabled = false,
  htmlType = 'button'
}) => {
  return (
    <button 
      onClick={onClick}
      type={htmlType}
      disabled={disabled}
      className = {`${styles.button} ` + (size === 'large' ?
        styles.large :
        size === 'medium' ?
          styles.medium :
          styles.small
      ) + ' ' + (disabled ? styles.disabled : '')}
    >
      {children}
    </button>
  );
}
