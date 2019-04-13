import cn from 'classnames';
import { action } from 'mobx';
import { observer } from 'mobx-react-lite';
import React, { useCallback } from 'react';
import ScaleStore from '../stores/ScaleStore';
import styles from './DesignerToolbar.module.css';

interface IProps {
  scaleStore: ScaleStore;
  classes: {
    main: string;
  };
}

const scaleFactor = 1.2;

const DesignerToolbar = (props: IProps) => {
  const { scaleStore, classes } = props;
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
    <ul role="toolbar" className={cn(styles.main, classes.main)}>
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
