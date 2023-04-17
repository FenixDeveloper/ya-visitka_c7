import React, { FC } from 'react';
import styles from './footer.module.scss';

const Footer: FC = () => {
  return (
    <footer className={styles.footer}>
      <p className={styles.footer__copyright}>
        &#169; Визитки
      </p>
      <p className={styles.footer__author}>
        Яндекс Практикум
      </p>
    </footer>
  );
}

export default Footer;
