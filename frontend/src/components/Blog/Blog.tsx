import React, { FC, useEffect, useState } from 'react';
import styles from './Blog.module.scss';
import { DEFAULT_PAGE, ROMANTIC_PAGE, COCKY_PAGE } from '../../utils/constants';


interface IProps {
    typeComponent: typeof DEFAULT_PAGE | typeof ROMANTIC_PAGE | typeof COCKY_PAGE;
    index: number;
    title: string;
    urlImage: string;
    text: string;
}

export const Blog: FC<IProps> = ({ typeComponent, index, title, urlImage, text }) => {
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
      <div className={`
        ${styles.blog__line} 
        ${typeComponent === ROMANTIC_PAGE && styles.blog__line_romantic} 
        ${typeComponent === COCKY_PAGE && styles.blog__line_cocky}
        `}
      ></div>  
      <h2 className={styles.blog__title}>{title}</h2>
      {getImage()}
      <p className={styles.blog__text}>{text}</p>
    </div>
  )
}