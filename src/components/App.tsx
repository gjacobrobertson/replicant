import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Layout from './Layout';

const App: React.ComponentType<{}> = () => (
  <BrowserRouter>
    <Layout />
  </BrowserRouter>
);

export default React.memo(App);
