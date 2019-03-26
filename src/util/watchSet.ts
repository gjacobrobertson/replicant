import { ISetDidChange } from 'mobx';

export default function watchSet<T>(
  onAdd: (t: T) => void,
  onDelete: (t: T) => void
) {
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
