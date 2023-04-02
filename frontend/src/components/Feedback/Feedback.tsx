import { FC, useState, useEffect } from 'react';
import likeIcon from '../../assets/icons/reactions/👍.svg';
import dislikeIcon from '../../assets/icons/reactions/👎️.svg';
import waveIcon from '../../assets/icons/reactions/👋️.svg';
import smileIcon from '../../assets/icons/reactions/🙂️.svg';
import sadIcon from '../../assets/icons/reactions/😞️.svg';
import laughIcon from '../../assets/icons/reactions/🤣️.svg';
import angryIcon from '../../assets/icons/reactions/😬️.svg';
import scaryIcon from '../../assets/icons/reactions/😱️.svg';
import heartIcon from '../../assets/icons/reactions/❤️.svg';
import styles from './Feedback.module.scss';
import { FormEvent } from 'react';

const IconeArr = [
  { iconName: likeIcon, alt: 'likeIcon' },
  { iconName: dislikeIcon, alt: 'likeIcon' },
  { iconName: waveIcon, alt: 'waveIcon' },
  { iconName: smileIcon, alt: 'smileIcon' },
  { iconName: sadIcon, alt: 'sadIcon' },
  { iconName: laughIcon, alt: 'laughIcon' },
  { iconName: angryIcon, alt: 'angryIcon' },
  { iconName: scaryIcon, alt: 'scaryIcon' },
  { iconName: heartIcon, alt: 'heartIcon' },
];

export const Feedback: FC = () => {
  //для первоначального отображения комментариев
  const initfeedbackTextArr = [
    ' 1Классные у тебя увлечения, я тоже играю в настолки, любимая игра — Эволюция. Люблю еще музыку слушать и отдыхать на природе. 🤣',
    ' 2Классные у тебя увлечения, я тоже играю в настолки, любимая игра — Эволюция. Люблю еще музыку слушать и отдыхать на природе. 🤣',
    ' 3Классные у тебя увлечения, я тоже играю в настолки, любимая игра — Эволюция. Люблю еще музыку слушать и отдыхать на природе. 🤣',
  ];
  const [inputValue, setInputValue] = useState<string>('');
  const [feedbackTextArr, setFeedbackTextArr] =
    useState<string[]>(initfeedbackTextArr);

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
    console.log('Click')
  }
  return (
    //блок коментариев
    <div className={styles.feedbackModal}>
      <div className={styles.feedbackTexts}>
        {feedbackTextArr.map((text, i) => {
          return (
            <div className={styles.feedbackTextStyle} key={i}>
              <p className={styles.feedbackText}>{text}</p>
            </div>
          );
        })}
      </div>
      {/* блок ввода комментариев */}
      <form onSubmit={onSubmit}>
        <input
          value={inputValue}
          className={styles.feedbackInput}
          placeholder="Обратная связь"
          onChange={(e) => setInputValue(e.target.value)}
        ></input>
      </form>
      {/* блок эмоджи */}
      <div className={styles.feedbackIcons}>
        {IconeArr?.map((icon, index) => (
          <div className={styles.feedbackIcon} key={index}>
            <img src={icon.iconName} alt={icon.alt}  onClick={handleIconClick} />
            <p className={styles.feedbackIconCount}>{'99+'}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
