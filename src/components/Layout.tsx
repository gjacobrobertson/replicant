import React from 'react';
import Content from './Content';
import Header from './Header';
import styles from './Layout.module.css';
import Sidebar from './Sidebar';

const Layout = () => {
  return (
    <main className={styles.main}>
      <Header />
      <Sidebar />
      <Content />
    </main>
  );
};

export default Layout;
