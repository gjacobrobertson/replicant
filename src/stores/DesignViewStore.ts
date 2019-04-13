import PanStore from './PanStore';
import ScaleStore from './ScaleStore';

export default class DesignViewStore {
  public pan: PanStore = new PanStore();
  public scale: ScaleStore = new ScaleStore();
}
