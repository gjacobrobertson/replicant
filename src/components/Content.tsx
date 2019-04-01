import classNames from 'classnames';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import styles from './Content.module.css';
import OscillatorExample from './examples/OscillatorExample';
import layout from './Layout.module.css';
import DesignView from './pages/DesignView';
import Home from './pages/Home';

const Content = () => {
  return (
    <article className={classNames(layout.content, styles.main)}>
      <Switch>
        <Route exact={true} path="/" component={Home} />
        <Route path="/examples/oscillator" component={OscillatorExample} />
        <Route path="/design" component={DesignView} />
      </Switch>
    </article>
  );
};

export default Content;
