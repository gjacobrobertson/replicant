import { observer } from 'mobx-react-lite';
import React, { useRef } from 'react';
import PanStore from '../../stores/PanStore';
import UnitGrid from '../UnitGrid';
import UnitGridDef from '../UnitGridDef';
import styles from './DesignView.module.css';

const panStore = new PanStore();
const scale = 0.05;

const DesignView = () => {
  const size = 1 / scale;
  return (
    <svg
      className={styles.main}
      viewBox={`${panStore.x} ${panStore.y} ${size} ${size}`}
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <UnitGridDef />
      </defs>
      <UnitGrid store={panStore} size={size} />
    </svg>
  );
};

export default observer(DesignView);
