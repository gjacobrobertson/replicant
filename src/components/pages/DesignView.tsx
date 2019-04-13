import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import DesignViewStore from '../../stores/DesignViewStore';
import Designer from '../Designer';

const DesignView = () => {
  const [store] = useState(() => new DesignViewStore());
  return <Designer panStore={store.pan} scaleStore={store.scale} />;
};

export default observer(DesignView);
