import React, { useContext, useEffect, useState } from 'react';
import ReactAudioContext from './ReactAudioContext';

interface IProps<T extends AudioNode> {
  [key: string]: any;
  node: T;
}

function ReactAudioNode<T extends AudioNode>(props: IProps<T>) {
  const { node, ...options } = props;
  useEffect(() => {
    Object.assign(node, options);
  }, Object.values(options));

  return null;
}

export default React.memo(ReactAudioNode);
