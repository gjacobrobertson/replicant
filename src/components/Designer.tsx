import { observer } from 'mobx-react-lite';
import React, { useCallback } from 'react';
import PanStore from '../stores/PanStore';
import ScaleStore from '../stores/ScaleStore';
import IPoint from '../types/IPoint';
import screenToSVG from '../util/screenToSVG';
import styles from './Designer.module.css';

interface IProps {
  panStore: PanStore;
  scaleStore: ScaleStore;
}

const mousePointHandler = (cb: (point: IPoint) => void) => (
  evt: React.MouseEvent<SVGSVGElement>
) => {
  evt.preventDefault();
  evt.stopPropagation();
  const svg = evt.currentTarget;
  const point = screenToSVG(svg, evt.clientX, evt.clientY);
  return cb(point);
};

const Designer = (props: IProps) => {
  const { scaleStore, panStore } = props;
  const { x, y } = panStore;
  const { size } = scaleStore;

  const onPan = useCallback(mousePointHandler(point => panStore.pan(point)), [
    panStore
  ]);

  const onPanStart = useCallback(
    mousePointHandler(point => panStore.panStart(point)),
    [panStore]
  );

  const onPanEnd = useCallback(() => {
    panStore.panEnd();
  }, [panStore]);

  return (
    <svg
      className={styles.main}
      viewBox={`${x} ${y} ${size} ${size}`}
      preserveAspectRatio="xMidYMid slice"
      onMouseDown={onPanStart}
      onMouseMove={onPan}
      onMouseUp={onPanEnd}
      onMouseLeave={onPanEnd}
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
            strokeWidth="0.01"
          />
        </pattern>
        <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
          <rect width="10" height="10" fill="url(#unitGrid)" />
          <path
            className={styles.path}
            d="M 10 0 L 0 0 0 10"
            fill="none"
            strokeWidth="0.025"
          />
        </pattern>
      </defs>
      <rect
        x={Math.floor(x)}
        y={Math.floor(y)}
        width={size + 1}
        height={size + 1}
        fill="url(#grid)"
      />
    </svg>
  );
};

export default observer(Designer);
