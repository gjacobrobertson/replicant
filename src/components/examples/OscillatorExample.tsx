import { observer, useDisposable } from 'mobx-react-lite';
import React from 'react';
import { RouteProps } from 'react-router';
import useAudioContext from '../../observers/useAudioContext';
import AudioConnectionStore from '../../stores/AudioConnectionStore';
import AudioGraphStore from '../../stores/AudioGraphStore';
import AudioNodeStore from '../../stores/AudioNodeStore';

type Props = RouteProps;
const OscillatorExample: React.ComponentType<Props> = (props: Props) => {
  useDisposable(() => {
    const graph = new AudioGraphStore();
    const node = new AudioNodeStore(OscillatorNode, { type: 'triangle' });
    const link = new AudioConnectionStore(node, null);
    graph.nodes.add(node);
    graph.links.add(link);
    (global as any).graph = graph;
    (global as any).node = node;
    (global as any).link = link;

    return useAudioContext(graph);
  });
  return (
    <div className="example example--oscillator">
      <h1>Oscillator</h1>
    </div>
  );
};

export default observer(OscillatorExample);
