import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Toolbox from './Toolbox';
const Sidebar = () => {
  return (
    <Switch>
      <Route path="/design" component={Toolbox} />} />
    </Switch>
  );
};

export default Sidebar;
