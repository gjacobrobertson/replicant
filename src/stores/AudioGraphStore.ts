import { observable, ObservableSet } from 'mobx';
import AudioConnectionStore from './AudioConnectionStore';
import AudioNodeStore from './AudioNodeStore';

export default class AudioGraphStore {
  @observable public nodes: ObservableSet<AudioNodeStore<AudioNode, any>>;
  @observable public links: ObservableSet<AudioConnectionStore>;

  constructor(
    nodes: Array<AudioNodeStore<AudioNode, any>> = [],
    links: AudioConnectionStore[] = []
  ) {
    this.nodes = observable.set(nodes);
    this.links = observable.set(links);
  }
}
