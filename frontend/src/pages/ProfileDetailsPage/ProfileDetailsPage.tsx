import React, { FC } from 'react';
import ProfileDetailsPageStyles from './ProfileDetailsPage.module.scss';
import { DEFAULT_PAGE, ROMANTIC_PAGE, COCKY_PAGE } from '../../utils/constants';

interface IProps {
  typePage: typeof DEFAULT_PAGE | typeof ROMANTIC_PAGE | typeof COCKY_PAGE;
}

export const ProfileDetailsPage: FC<IProps> = ({ typePage }) => {
  return (
    <>
      <h1>
        Страница с детальной информацией
      </h1>
    </>
  );
}
