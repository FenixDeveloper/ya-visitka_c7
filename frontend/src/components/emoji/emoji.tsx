import React, { FC } from 'react';
import styles from './emoji.module.scss';

interface IEmoji {
  label: string;
  symbol: string;
  onClick: () => void | undefined;
}

const Emoji: FC<IEmoji> = ({ label, symbol, onClick }) => {
  return (
    <span
      className={styles.container}
      role='img'
      aria-label={label ? label : ''}
      aria-hidden={label ? 'false' : 'true'}
      onClick={onClick}
    >
      {symbol}
    </span>
  );
};
export default React.memo(Emoji);
