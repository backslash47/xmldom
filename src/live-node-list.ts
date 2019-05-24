import './types';

import { _updateLiveList } from './live-node-list-utils';
import { LiveNodeList, RefreshTS } from './types';

export class LiveNodeListImpl<TNode extends Node> extends Array<TNode> implements LiveNodeList<TNode> {
  _node: Node;
  _refresh: RefreshTS;

  _length: number;
  _inc: number;

  constructor(node: Node, refresh: RefreshTS) {
    super();

    this._node = node;
    this._refresh = refresh;
    this._length = 0;
    _updateLiveList(this);
  }

  forEach(callbackfn: (value: TNode, key: number, parent: LiveNodeListImpl<TNode>) => void, thisArg?: any): void {
    super.forEach((value, key) => callbackfn(value, key, this), thisArg);
  }

  item(i: number): TNode {
    _updateLiveList(this);
    return this[i];
  }

  // added for compatiblity with current DOM spec
  namedItem(_name: string): TNode | null {
    throw new Error('Method not implemented.');
  }

  get length(): number {
    _updateLiveList(this);
    return this._length;
  }
}
