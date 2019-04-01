import React from 'react';
import styles from './UnitGridDef.module.css';

const UnitGridDef = () => {
  return (
    <pattern id="unitGrid" width="1" height="1" patternUnits="userSpaceOnUse">
      <path
        className={styles.path}
        d="M 1 0 L 0 0 0 1"
        fill="none"
        strokeWidth="1"
        vectorEffect="non-scaling-stroke"
      />
    </pattern>
  );
};

export default UnitGridDef;
