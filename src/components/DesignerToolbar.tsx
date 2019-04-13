import { action } from 'mobx';
import { observer } from 'mobx-react-lite';
import React, { useCallback } from 'react';
import ScaleStore from '../stores/ScaleStore';
import styles from './DesignerToolbar.module.css';

interface IProps {
  scaleStore: ScaleStore;
}

const scaleFactor = 1.2;

const DesignerToolbar = (props: IProps) => {
  const { scaleStore } = props;
  const zoomIn = useCallback(
    action(() => {
      scaleStore.size /= scaleFactor;
    }),
    [scaleStore]
  );

  const zoomOut = useCallback(
    action(() => {
      scaleStore.size *= scaleFactor;
    }),
    [scaleStore]
  );
  return (
    <ul role="toolbar" className={styles.main}>
      <li>
        <button onClick={zoomIn}>+</button>
      </li>
      <li>
        <button onClick={zoomOut}>-</button>
      </li>
    </ul>
  );
};

export default observer(DesignerToolbar);
