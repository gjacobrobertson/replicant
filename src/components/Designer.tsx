import { observer } from 'mobx-react-lite';
import React from 'react';
import PanStore from '../stores/PanStore';
import styles from './Designer.module.css';
import UnitGrid from './UnitGrid';

interface IProps {
  panStore: PanStore;
  size: number;
}

const Designer = (props: IProps) => {
  const { size, panStore } = props;
  return (
    <svg
      className={styles.main}
      viewBox={`${panStore.x} ${panStore.y} ${size} ${size}`}
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <pattern
          id="unitGrid"
          width="1"
          height="1"
          patternUnits="userSpaceOnUse"
        >
          <path
            className={styles.path}
            d="M 1 0 L 0 0 0 1"
            fill="none"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
          />
        </pattern>
      </defs>
      <UnitGrid {...props} />
    </svg>
  );
};

export default observer(Designer);
