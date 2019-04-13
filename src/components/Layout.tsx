import React from 'react';
import Content from './Content';
import Header from './Header';
import styles from './Layout.module.css';
import Sidebar from './Sidebar';

const Layout = () => {
  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <Header />
      </header>
      <aside className={styles.sidebar}>
        <Sidebar />
      </aside>
      <article className={styles.content}>
        <Content />
      </article>
    </main>
  );
};

export default Layout;
