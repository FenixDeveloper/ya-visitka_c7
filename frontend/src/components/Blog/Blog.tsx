import React, { FC, useEffect, useState } from 'react';
import styles from './Blog.module.scss';
import { Communication } from '../Communication/Communication';
import { IBlogProps } from '../../services/types/data';
import { EXAMPLE_MESSAGES } from '../../utils/constants';

export const Blog: FC<IBlogProps> = ({ typeComponent, index, title, urlImage, text }) => {
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
  const getImage = () => {
    if (urlImage.length === 0 && index === 0) {
      return (windowWidth >= 760) ? <div className={styles.blog__image}></div> : <div></div>
    } else if (urlImage.length === 0 && index === 1) {
      return (windowWidth >= 760) ? <div className={styles.blog__image}></div> : <div></div>
    } else if (urlImage.length > 0) {
      return <img className={styles.blog__image} src={urlImage} alt='Изображение пользователя'/>
    } else {
      return <div></div>
    }
  }

  useEffect(() => {
    function updateWindowWidth() {
      setWindowWidth(window.innerWidth)
    }

    window.addEventListener('resize', updateWindowWidth);

    return () => window.removeEventListener('resize', updateWindowWidth);
  }, [windowWidth])


  return (
    <div className={styles.blog}>
      <div className={styles.blog__communicationBox}>
        <Communication arrСomments={EXAMPLE_MESSAGES} />
      </div>
      <div className={`
        ${styles.blog__line} 
        ${typeComponent === 'романтичный' && styles.blog__line_romantic} 
        ${typeComponent === 'дерзкий' && styles.blog__line_cocky}
        `}
      ></div>  
      <h2 className={styles.blog__title}>{title}</h2>
      {getImage()}
      <p className={styles.blog__text}>{text}</p>
    </div>
  )
}