import React, { useEffect, useState } from 'react';
import { RouteProps } from 'react-router';
import ReactAudioConnection from '../audio/ReactAudioConnection';
import ReactAudioContext from '../audio/ReactAudioContext';
import ReactAudioNode from '../audio/ReactAudioNode';

type Props = RouteProps;
const OscillatorExample: React.ComponentType<Props> = (props: Props) => {
  const [audioContext] = useState(() => new AudioContext());
  const [oscillator] = useState(() => new OscillatorNode(audioContext));
  oscillator.start();
  return (
    <div className="example example--oscillator">
      <h1>Oscillator</h1>
      <ReactAudioContext.Provider value={audioContext}>
        <ReactAudioNode node={oscillator} type="triangle" />
        <ReactAudioConnection
          source={oscillator}
          destination={audioContext.destination}
        />
      </ReactAudioContext.Provider>
    </div>
  );
};

export default React.memo(OscillatorExample);
