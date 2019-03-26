import { observable, ObservableMap } from 'mobx';

type AudioNodeConstructor<N extends AudioNode, O> = new (
  context: BaseAudioContext,
  options: O
) => N;

export default class AudioNodeStore<N extends AudioNode, O> {
  public ctor: AudioNodeConstructor<N, O>;
  public options: ObservableMap<string, any>;

  constructor(ctor: AudioNodeConstructor<N, O>, options: O) {
    this.ctor = ctor;
    this.options = observable.map(Object.entries(options));
  }
}
