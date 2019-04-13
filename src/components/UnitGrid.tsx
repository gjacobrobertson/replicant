import { observer } from 'mobx-react-lite';
import React, { useCallback } from 'react';
import PanStore from '../stores/PanStore';
import IPoint from '../types/IPoint';
import screenToSVG from '../util/screenToSVG';
import styles from './UnitGrid.module.css';

interface IProps {
  panStore: PanStore;
  size: number;
}

const mousePointHandler = (cb: (point: IPoint) => void) => (
  evt: React.MouseEvent<SVGElement>
) => {
  evt.preventDefault();
  evt.stopPropagation();
  const svg = evt.currentTarget.ownerSVGElement;
  if (!svg) {
    throw new Error("Couldn't get owner SVG");
  }
  const point = screenToSVG(svg, evt.clientX, evt.clientY);
  return cb(point);
};

const touchPointHandler = (cb: (point: IPoint) => void) => (
  evt: React.TouchEvent<SVGElement>
) => {
  evt.preventDefault();
  evt.stopPropagation();
  const svg = evt.currentTarget.ownerSVGElement;
  if (!svg) {
    throw new Error("Couldn't get owner SVG");
  }
};

const UnitGrid = (props: IProps) => {
  const { panStore } = props;

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
    <rect
      x={Math.floor(panStore.x)}
      y={Math.floor(panStore.y)}
      width={props.size + 1}
      height={props.size + 1}
      className={styles.main}
      onMouseDown={onPanStart}
      onMouseMove={onPan}
      onMouseUp={onPanEnd}
      onMouseLeave={onPanEnd}
    />
  );
};

export default observer(UnitGrid);
