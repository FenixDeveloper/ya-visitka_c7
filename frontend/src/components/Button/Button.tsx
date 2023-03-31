import React, { SyntheticEvent } from 'react';
import styles from './Button.module.scss';

interface IButtonProps {
    size?: 'large' | 'medium' | 'small',
    onClick?: () => void | ((e: SyntheticEvent) => void);
    children?: React.ReactNode;
    disabled?: boolean;
    htmlType?: 'button' | 'submit' | 'reset';
}
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
