import React, { FC } from 'react';
import styles from './Blog.module.scss';
import { DEFAULT_PAGE, ROMANTIC_PAGE, COCKY_PAGE } from '../../utils/constants';


interface IProps {
    typeComponent: typeof DEFAULT_PAGE | typeof ROMANTIC_PAGE | typeof COCKY_PAGE;
    title: string;
    urlImage: string;
    text: string;
}

export const Blog: FC<IProps> = ({ typeComponent, title, urlImage, text }) => {
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
        <div className={styles.blog__image}></div>
      }
      <p className={styles.blog__text}>{text}</p>
    </div>
  )
}