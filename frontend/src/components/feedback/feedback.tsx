import React, { FC, useState } from 'react';
import { FormEvent } from 'react';
import Emoji from '../emoji/emoji';
import { EMOJI } from '../../utils/constants';
import styles from './feedback.module.scss';

export const Feedback: FC = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [feedbackTextArr, setFeedbackTextArr] = useState<string[]>([]);
  const [emoji, setEmoji] = useState(EMOJI);
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

  const handleIconClick = (index: number) => {
    const newEmoji = emoji.map((emoji, i) => {
      if (i === index && emoji.acitve === false) {
        emoji.acitve = true;
        emoji.counter++;
      } else if (i === index) {
        emoji.acitve = false;
        emoji.counter--;
      }
      return emoji;
    });

    setEmoji(newEmoji);
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
        {emoji?.map((icon, index) => {
          const activeLike = icon.acitve
            ? `${styles.feedback__icon_active}`
            : '';
          return (
            <div
              className={`${styles.feedback__icon} ${activeLike}`}
              key={icon.alt}
            >
              <Emoji
                symbol={icon.symbol}
                label={icon.alt}
                onClick={() => handleIconClick(index)}
              />
              {icon.counter && (
                <p className={styles.feedback__icon_count}>
                  {icon.counter > 99 ? '99+' : icon.counter}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
