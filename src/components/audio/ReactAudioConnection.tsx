import React, { useEffect, useState } from 'react';

interface IProps {
  source: AudioNode;
  destination: AudioNode | AudioParam;
  output?: number;
  input?: number;
}
const ReactAudioConnection = (props: IProps) => {
  const { source, destination, output, input } = props;
  useEffect(() => {
    source.connect(destination as AudioNode, output, input);
    return () => {
      source.disconnect(
        destination as AudioNode,
        output as number,
        input as number
      );
    };
  }, []);
  return null;
};

export default React.memo(ReactAudioConnection);
