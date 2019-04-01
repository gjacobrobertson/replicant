import classNames from 'classnames';
import { observer } from 'mobx-react-lite';
import React, { useCallback } from 'react';
import PanStore from '../stores/PanStore';
import screenToSVG from '../util/screenToSVG';
import grid from './UnitGridDef.module.css';
import styles from './UnitGrid.module.css';

interface IProps {
  store: PanStore;
  size: number;
}
const UnitGrid = (props: IProps) => {
  const { store } = props;

  const onMouseMove = useCallback(
    (evt: React.MouseEvent<SVGElement>) => {
      evt.preventDefault();
      evt.stopPropagation();
      const svg = evt.currentTarget.ownerSVGElement;
      if (!svg) {
        throw new Error("Couldn't get owner SVG");
      }
      const point = screenToSVG(svg, evt.clientX, evt.clientY);
      store.pan(point);
    },
    [store]
  );

  const onMouseDown = useCallback(
    (evt: React.MouseEvent<SVGElement>) => {
      evt.preventDefault();
      evt.stopPropagation();
      const svg = evt.currentTarget.ownerSVGElement;
      if (!svg) {
        throw new Error("Couldn't get owner SVG");
      }
      const point = screenToSVG(svg, evt.clientX, evt.clientY);
      store.panStart(point);
    },
    [store]
  );

  const onPanEnd = useCallback(() => {
    store.panEnd();
  }, [store]);

  return (
    <rect
      x={Math.floor(store.x)}
      y={Math.floor(store.y)}
      width={props.size + 1}
      height={props.size + 1}
      className={classNames(grid.main, styles.main)}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onPanEnd}
      onMouseLeave={onPanEnd}
    />
  );
};

export default observer(UnitGrid);
