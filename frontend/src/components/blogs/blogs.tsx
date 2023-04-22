import React, { FC } from 'react';
import styles from './blogs.module.scss';
import { EXAMPLE_USER_BLOGS } from '../../utils/constants';
import { Blog } from '../blog/blog';
import { ProfileContext } from '../../services/profile-context';

export const Blogs: FC = () => {
  const [profileState, _] = React.useContext(ProfileContext);

  return (
    <div className={styles.blogs}>
      {EXAMPLE_USER_BLOGS.map((item, index) => {
        return (
          <Blog typeComponent={profileState.pattern}
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