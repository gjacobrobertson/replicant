import AudioNodeStore from './AudioNodeStore';

export default class AudioConnectionStore {
  public source: AudioNodeStore<AudioNode, any>;
  public destination: AudioNodeStore<AudioNode, any> | null;
  public output: number;
  public input: number;
  public param: string | undefined;

  constructor(
    source: AudioNodeStore<AudioNode, any>,
    destination: AudioNodeStore<AudioNode, any> | null,
    input: number = 0,
    output: number = 0,
    param?: string
  ) {
    this.source = source;
    this.destination = destination;
    this.input = input;
    this.output = output;
    this.param = param;
  }
}
