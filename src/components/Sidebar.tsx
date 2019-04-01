import classNames from 'classnames';
import React from 'react';
import layout from './Layout.module.css';
import styles from './Sidebar.module.css';

const Sidebar = () => {
  return (
    <aside className={classNames(layout.sidebar, styles.main)}>
      <div className={styles.overflow} />
    </aside>
  );
};

export default Sidebar;
