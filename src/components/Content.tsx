import React from 'react';
import { Route, Switch } from 'react-router-dom';
import OscillatorExample from './examples/OscillatorExample';
import DesignView from './pages/DesignView';
import Home from './pages/Home';

const Content = () => {
  return (
    <Switch>
      <Route exact={true} path="/" component={Home} />
      <Route path="/examples/oscillator" component={OscillatorExample} />
      <Route path="/design" component={DesignView} />
    </Switch>
  );
};

export default Content;
