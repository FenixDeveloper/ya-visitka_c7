import React, { FC } from 'react';
import styles from './Footer.module.scss';

const Footer: FC = () => {
  return (
    <footer className={styles.footer}>
      <p className={styles.footer__copyright}>
        © Визитки
      </p>
      <p className={styles.footer__author}>
        Яндекс Практикум
      </p>
    </footer>
  );
}

export default Footer;
