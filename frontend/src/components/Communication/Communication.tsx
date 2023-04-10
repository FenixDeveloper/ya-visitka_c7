import React, { FC } from 'react';
import styles from './Communication.module.scss';
import { EXAMPLE_MESSAGES } from '../../utils/constants';

export const Communication: FC = () => {

  return (
    
    <button className={styles.communication}
      type='button'
    >
      <div className={styles.communication__circle}>
        <p className={styles.communication__counter}>{EXAMPLE_MESSAGES.length}</p>
      </div> 
    </button>
  )
}