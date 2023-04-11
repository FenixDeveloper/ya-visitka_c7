import React, { FC } from 'react';
import styles from './Blogs.module.scss';
import { DEFAULT_PAGE, EXAMPLE_USER_BLOGS } from '../../utils/constants';
import { Blog } from '../Blog/Blog';
import { ProfileContext } from '../../services/profileContext';

export const Blogs: FC = () => {
  const { user } = React.useContext(ProfileContext);

  return (
    <div className={styles.blogs}>
      {EXAMPLE_USER_BLOGS.map((item, index) => {
        return (
          <Blog typeComponent={user.pageStyle}
            index={index}
            title={item.title.toUpperCase()} 
            urlImage={item.urlImage} 
            text={item.text} 
            key={index}
          />
        )
      })}   
    </div>
  )
}