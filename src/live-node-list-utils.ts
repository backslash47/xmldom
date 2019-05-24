import './types';

import { LiveNodeList } from './types';
import { copy, isDocument } from './utils';

export function _updateLiveList<T extends Node>(list: LiveNodeList<T>) {
  const inc = isDocument(list._node) ? list._node._inc : list._node.ownerDocument!._inc;
  if (list._inc !== inc) {
    const ls = list._refresh(list._node);
    // console.log(ls.length)
    list._length = ls.length;
    copy(ls, list); // fixme: I am not sure this will work with the current extension of Array
    list._inc = inc;
  }
}
