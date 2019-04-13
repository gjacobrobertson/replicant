import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import DesignViewStore from '../../stores/DesignViewStore';
import Designer from '../Designer';
import DesignerToolbar from '../DesignerToolbar';
import styles from './DesignView.module.css';

const DesignView = () => {
  const [store] = useState(() => new DesignViewStore());
  return (
    <React.Fragment>
      <Designer panStore={store.pan} scaleStore={store.scale} />
      <DesignerToolbar
        scaleStore={store.scale}
        classes={{ main: styles.toolbar }}
      />
    </React.Fragment>
  );
};

export default observer(DesignView);
