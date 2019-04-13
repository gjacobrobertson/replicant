import { computed, observable } from 'mobx';

export default class ScaleStore {
  @observable public size: number = 20;
}
