import AudioConnectionStore from './AudioConnectionStore';
import AudioGraphStore from './AudioGraphStore';
import AudioNodeStore from './AudioNodeStore';

describe('AudioGraphStore', () => {
  let graph: AudioGraphStore;

  beforeAll(() => {
    graph = new AudioGraphStore();
  });
  it('observes new nodes', () => {
    const listener = jest.fn();
    graph.nodes.observe(listener);
    graph.links.observe(listener);
    const node = new AudioNodeStore(OscillatorNode, { type: 'triangle' });
    const link = new AudioConnectionStore(node, null);
    graph.nodes.add(node);
    graph.links.add(link);
    graph.nodes.delete(node);
    expect(listener).toHaveBeenCalledTimes(3);
    expect(listener).toHaveBeenCalledWith({
      newValue: node,
      object: graph.nodes,
      type: 'add'
    });
    expect(listener).toHaveBeenCalledWith({
      newValue: link,
      object: graph.links,
      type: 'add'
    });
    expect(listener).toHaveBeenCalledWith({
      object: graph.nodes,
      oldValue: node,
      type: 'delete'
    });
  });
});
