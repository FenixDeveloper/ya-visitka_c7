import React, { FC, useEffect, useState } from 'react';
import styles from './communication.module.scss';
import { ICommunicationProps } from '../../services/types/data';
import { Feedback } from '../feedback/feedback';

export const Communication: FC<ICommunicationProps> = ({ arrСomments }) => {
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  
  const openFeedback = () => {
    setIsFeedbackOpen(!isFeedbackOpen);
  };

  return (
    <div className={styles.container}>
      <button className={styles.communication} onClick={openFeedback}>
        {arrСomments.length !==0 && <div className={styles.communication__circle}>
          <p className={styles.communication__counter}>{arrСomments.length}</p>
        </div>}
      </button>
      {isFeedbackOpen && (
        <div className={styles.feedback}>
          <Feedback />
        </div>
      )}
    </div>
  )
}