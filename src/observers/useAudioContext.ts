import { Lambda } from 'mobx';
import AudioConnectionStore from '../stores/AudioConnectionStore';
import AudioGraphStore from '../stores/AudioGraphStore';
import AudioNodeStore from '../stores/AudioNodeStore';
import watchSet from '../util/watchSet';
import useAudioNode from './useAudioNode';

export default (graph: AudioGraphStore) => {
  const ctx: AudioContext = new AudioContext();
  const nodes: Map<AudioNodeStore<AudioNode, any>, AudioNode> = new Map();
  const disposers: Map<AudioNodeStore<AudioNode, any>, Lambda> = new Map();

  const addNode = (store: AudioNodeStore<AudioNode, any>) => {
    const node = new store.ctor(ctx, store.options);
    if (node instanceof AudioScheduledSourceNode) {
      node.start();
    }
    nodes.set(store, node);
    disposers.set(store, useAudioNode(store, node));
  };

  const deleteNode = (store: AudioNodeStore<AudioNode, any>) => {
    const disposer = disposers.get(store);
    disposers.delete(store);
    nodes.delete(store);
    if (disposer) {
      disposer();
    }
  };

  const getDestination = (link: AudioConnectionStore) =>
    link.destination ? nodes.get(link.destination) : ctx.destination;

  const addLink = (store: AudioConnectionStore) => {
    const source = nodes.get(store.source);
    const destination = getDestination(store);

    if (source == null) {
      return;
    }
    if (destination instanceof AudioParam) {
      source.connect(destination, store.output);
    } else if (destination instanceof AudioNode) {
      source.connect(destination, store.output, store.input);
    }
  };

  const deleteLink = (store: AudioConnectionStore) => {
    const source = nodes.get(store.source);
    const destination = getDestination(store);

    if (source == null) {
      return;
    }
    if (destination instanceof AudioParam) {
      source.disconnect(destination, store.output);
    } else if (destination instanceof AudioNode) {
      source.disconnect(destination, store.output, store.input);
    }
  };

  graph.nodes.forEach(addNode);
  graph.links.forEach(addLink);

  const structureDisposers = [
    graph.nodes.observe(watchSet(addNode, deleteNode)),
    graph.links.observe(watchSet(addLink, deleteLink))
  ];

  return () => {
    structureDisposers.forEach(disposer => disposer());
    disposers.forEach(disposer => disposer());
    ctx.close();
  };
};
