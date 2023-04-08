import React, { FC, useState } from 'react';
import { FormEvent } from 'react';
import Emoji from '../Emoji/Emoji';
import { EMOJI } from '../../utils/constants';

import styles from './Feedback.module.scss';

export const Feedback: FC = () => {
  const initfeedbackTextArr = [
    ' 1Классные у тебя увлечения, я тоже играю в настолки, любимая игра — Эволюция. Люблю еще музыку слушать и отдыхать на природе. 🤣',
    ' 2Классные у тебя увлечения, я тоже играю в настолки, любимая игра — Эволюция. Люблю еще музыку слушать и отдыхать на природе. 🤣',
    ' 3Классные у тебя увлечения, я тоже играю в настолки, любимая игра — Эволюция. Люблю еще музыку слушать и отдыхать на природе. 🤣',
  ];
  const counterEmoji = 5;
  const [inputValue, setInputValue] = useState<string>('');
  const [feedbackTextArr, setFeedbackTextArr] =
    useState<string[]>([]);

  //тестовая функция для добавления комментариев
  const addFeedback = (comment: string) => {
    setFeedbackTextArr([...feedbackTextArr, comment]);
    setInputValue('');
  };
  //отправка комментария при нажатии Enter
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    addFeedback(inputValue);
  };

  const handleIconClick = () => {
    console.log('Click like');
  };

  return (
    <div className={styles.feedback__modal}>
      <div className={styles.feedback__container_text}>
        {feedbackTextArr.map((text, i) => (
          <div className={styles.feedback__text_style} key={i}>
            <p className={styles.feedback__text}>{text}</p>
          </div>
        ))}
      </div>
      {/* блок ввода комментариев */}
      <form onSubmit={onSubmit}>
        <input
          value={inputValue}
          className={styles.feedback__input}
          placeholder='Обратная связь'
          onChange={(e) => setInputValue(e.target.value)}
        />
      </form>
      {/* блок эмоджи */}
      <div className={styles.feedback__icons}>
        {EMOJI?.map((icon) => (
          <div className={styles.feedback__icon} key={icon.alt}>
            <Emoji
              symbol={icon.symbol}
              label={icon.alt}
              onClick={handleIconClick}
            />
            {counterEmoji && (
              <p className={styles.feedback__icon_count}>
                {counterEmoji > 99 ? '99+' : counterEmoji}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
