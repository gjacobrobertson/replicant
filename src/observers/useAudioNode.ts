import { autorun } from 'mobx';
import AudioNodeStore from '../stores/AudioNodeStore';

export default (store: AudioNodeStore<AudioNode, any>, node: any) => {
  return autorun(() => {
    store.options.forEach((value, key) => {
      if (node[key] instanceof AudioParam) {
        node[key].value = value;
      } else {
        node[key] = value;
      }
    });
  });
};
