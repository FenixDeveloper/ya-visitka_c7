import React, { FC, useEffect, useState } from 'react';
import styles from './Blog.module.scss';
import { DEFAULT_PAGE, ROMANTIC_PAGE, COCKY_PAGE } from '../../utils/constants';


interface IProps {
    typeComponent: typeof DEFAULT_PAGE | typeof ROMANTIC_PAGE | typeof COCKY_PAGE;
    title: string;
    urlImage: string;
    text: string;
}

export const Blog: FC<IProps> = ({ typeComponent, title, urlImage, text }) => {
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);

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
      {urlImage.length !== 0 ?
        <img className={styles.blog__image} src={urlImage} alt='Изображение пользователя'/> 
        :
        (windowWidth >= 760) ? <div className={styles.blog__image}></div> : <div></div>
      }
      <p className={styles.blog__text}>{text}</p>
    </div>
  )
}