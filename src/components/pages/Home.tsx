import React from 'react';
import { Link, RouteProps } from 'react-router-dom';

type Props = RouteProps;
const Home: React.ComponentType<Props> = (props: Props) => (
  <div className="home">
    <h2>Examples</h2>
    <ul>
      <li>
        <Link to="/examples/oscillator">Oscillator</Link>
      </li>
    </ul>
  </div>
);

export default React.memo(Home);
