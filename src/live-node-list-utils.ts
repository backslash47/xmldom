import './types';
import { isDocument, copy } from './utils';
import { LiveNodeList } from './types';

export function _updateLiveList<T extends Node>(list: LiveNodeList<T>) {
  const inc = isDocument(list._node) ? list._node._inc : list._node.ownerDocument!._inc;
  if (list._inc != inc) {
    let ls = list._refresh(list._node);
    //console.log(ls.length)
    list._length = ls.length;
    copy(ls, list); // fixme: I am not sure this will work with the current extension of Array
    list._inc = inc;
  }
}
