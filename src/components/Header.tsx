import classNames from 'classnames';
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';
import layout from './Layout.module.css';

const Header = () => {
  return (
    <header className={classNames(layout.header, styles.main)}>
      <h1 className={styles.title}>Replicant</h1>
    </header>
  );
};

export default Header;
