import { observer } from 'mobx-react-lite';
import React from 'react';
import PanStore from '../../stores/PanStore';
import Designer from '../Designer';

const panStore = new PanStore();
const scale = 0.05;

const DesignView = () => {
  const size = 1 / scale;
  return <Designer panStore={panStore} size={size} />;
};

export default observer(DesignView);
