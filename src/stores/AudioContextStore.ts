import {
  autorun,
  computed,
  IReactionDisposer,
  ISetDidChange,
  Lambda
} from 'mobx';
import AudioConnectionStore from './AudioConnectionStore';
import AudioGraphStore from './AudioGraphStore';
import AudioNodeStore from './AudioNodeStore';

function watchSet<T>(onAdd: (t: T) => void, onDelete: (t: T) => void) {
  return (changes: ISetDidChange<T>) => {
    switch (changes.type) {
      case 'add':
        onAdd(changes.newValue);
        break;
      case 'delete':
        onDelete(changes.oldValue);
        break;
    }
  };
}
export default class AudioContextStore {
  private ctx: AudioContext = new AudioContext();
  private graph: AudioGraphStore;
  private nodes: Map<AudioNodeStore<AudioNode, any>, AudioNode> = new Map();
  private disposers: Array<IReactionDisposer | Lambda> = [];

  constructor(graph: AudioGraphStore) {
    this.graph = graph;
    this.initializeGraph();
    this.observe();
  }

  public close() {
    this.dispose();
    this.ctx.close();
  }

  public observe() {
    this.disposers.push(
      ...this.scheduledSourceNodes.map(store =>
        autorun(() => {
          const node = this.nodes.get(store) as AudioScheduledSourceNode;
          store.active ? node.start() : node.stop();
        })
      )
    );
    this.disposers.push(
      this.graph.nodes.observe(
        watchSet(node => this.addNode(node), node => this.deleteNode(node))
      )
    );
    this.disposers.push(
      this.graph.links.observe(
        watchSet(link => this.addLink(link), link => this.deleteLink(link))
      )
    );
  }

  public dispose() {
    for (const disposer of this.disposers) {
      disposer();
    }
  }

  private addNode(store: AudioNodeStore<AudioNode, any>) {
    this.nodes.set(store, new store.ctor(this.ctx, store.options));
  }

  private deleteNode(store: AudioNodeStore<AudioNode, any>) {
    this.nodes.delete(store);
  }

  private getDestination(link: AudioConnectionStore) {
    return link.destination
      ? this.nodes.get(link.destination)
      : this.ctx.destination;
  }

  private addLink(store: AudioConnectionStore) {
    const source = this.nodes.get(store.source);
    const destination = this.getDestination(store);

    if (source == null) {
      return;
    }
    if (destination instanceof AudioParam) {
      source.connect(destination, store.output);
    } else if (destination instanceof AudioNode) {
      source.connect(destination, store.output, store.input);
    }
  }

  private deleteLink(store: AudioConnectionStore) {
    const source = this.nodes.get(store.source);
    const destination = this.getDestination(store);

    if (source == null) {
      return;
    }
    if (destination instanceof AudioParam) {
      source.disconnect(destination, store.output);
    } else if (destination instanceof AudioNode) {
      source.disconnect(destination, store.output, store.input);
    }
  }

  private initializeGraph() {
    this.initializeNodes();
    this.initializeLinks();
  }

  private initializeNodes() {
    for (const store of this.graph.nodes) {
      this.addNode(store);
    }
  }

  private initializeLinks() {
    for (const link of this.graph.links) {
      this.addLink(link);
    }
  }

  @computed get scheduledSourceNodes() {
    return [...this.nodes.keys()].filter(
      (key): key is AudioNodeStore<AudioScheduledSourceNode, any> =>
        this.nodes.get(key) instanceof AudioScheduledSourceNode
    );
  }
}
