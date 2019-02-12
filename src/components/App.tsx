import React from 'react';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import OscillatorExample from './examples/OscillatorExample';
import Home from './Home';

const App: React.ComponentType<{}> = () => (
  <BrowserRouter>
    <div className="app">
      <Link to="/">Home</Link>
      <Switch>
        <Route exact={true} path="/" component={Home} />
        <Route path="/examples/oscillator" component={OscillatorExample} />
      </Switch>
    </div>
  </BrowserRouter>
);

export default React.memo(App);
