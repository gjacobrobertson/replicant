import React from 'react';
import { useComputed } from 'mobx-react-lite';

interface IProps {
  title: string;
  inputs: number;
  outputs: number;
  params: [string];
}
const AudioNodeView = (props: IProps) => {
  const { title, inputs, outputs, params } = props;

  const width = useComputed(() => params.length + 3);
  return;
  <rect className="node">
    <g>
      <rect />
      <text>{title}</text>
    </g>
  </rect>;
};

export default AudioNodeView;
