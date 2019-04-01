import { action, observable } from 'mobx';
import IPoint from '../types/IPoint';

export default class PanStore {
  @observable public x: number = 0;
  @observable public y: number = 0;

  private handle: IPoint | null = null;

  public panStart(point: IPoint) {
    this.handle = point;
  }

  @action
  public pan(point: IPoint) {
    if (this.handle == null) {
      return;
    }
    this.x = this.x + this.handle.x - point.x;
    this.y = this.y + this.handle.y - point.y;
  }

  public panEnd() {
    this.handle = null;
  }
}
