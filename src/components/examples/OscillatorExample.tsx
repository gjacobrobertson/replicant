import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { RouteProps } from 'react-router';
import AudioConnectionStore from '../../stores/AudioConnectionStore';
import AudioContextStore from '../../stores/AudioContextStore';
import AudioGraphStore from '../../stores/AudioGraphStore';
import AudioNodeStore from '../../stores/AudioNodeStore';

type Props = RouteProps;
const OscillatorExample: React.ComponentType<Props> = (props: Props) => {
  const [ctx] = useState(() => {
    const graph = new AudioGraphStore();
    const node = new AudioNodeStore(OscillatorNode, { type: 'triangle' });
    const link = new AudioConnectionStore(node, null);
    graph.nodes.add(node);
    graph.links.add(link);
    return new AudioContextStore(graph);
  });

  useEffect(() => () => ctx.close());
  return (
    <div className="example example--oscillator">
      <h1>Oscillator</h1>
    </div>
  );
};

export default observer(OscillatorExample);
