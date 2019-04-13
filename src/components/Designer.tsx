import { observer } from 'mobx-react-lite';
import React from 'react';
import PanStore from '../stores/PanStore';
import ScaleStore from '../stores/ScaleStore';
import styles from './Designer.module.css';
import DesignerToolbar from './DesignerToolbar';
import UnitGrid from './UnitGrid';

interface IProps {
  panStore: PanStore;
  scaleStore: ScaleStore;
}

const Designer = (props: IProps) => {
  const { scaleStore, panStore } = props;
  const { x, y } = panStore;
  const { size } = scaleStore;
  return (
    <React.Fragment>
      <svg
        className={styles.main}
        viewBox={`${x} ${y} ${size} ${size}`}
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
        <UnitGrid panStore={panStore} size={size} />
      </svg>
      <div className={styles.toolbar}>
        <DesignerToolbar scaleStore={scaleStore} />
      </div>
    </React.Fragment>
  );
};

export default observer(Designer);
