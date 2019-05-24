import './types';

import { serializeToString } from './serializer/serialize';
import { NodeFilterTS } from './types';

/**
 * @see http://www.w3.org/TR/2000/REC-DOM-Level-2-Core-20001113/core.html#ID-536297177
 * The NodeList interface provides the abstraction of an ordered collection of nodes,
 * without defining or constraining how this collection is implemented. NodeList objects in the DOM are live.
 * The items in the NodeList are accessible via an integral index, starting from 0.
 */
export class NodeListImpl<T extends Node> extends Array<T> implements NodeList {
  /**
   * Returns the indexth item in the collection.
   * If index is greater than or equal to the number of nodes in the list, this returns null.
   *
   * @standard level1
   * @param index  unsigned long
   *   Index into the collection.
   * @return Node
   * 	The node at the indexth position in the NodeList, or null if that is not a valid index.
   */
  item(index: number): T | null {
    return this[index] || null;
  }

  // added for compatiblity with current DOM spec
  namedItem(_name: string): T | null {
    throw new Error('Method not implemented.');
  }

  forEach(callbackfn: (value: T, key: number, parent: NodeListImpl<T>) => void, thisArg?: any): void {
    super.forEach((value, key) => callbackfn(value, key, this), thisArg);
  }
  toString(isHTML?: boolean, nodeFilter?: NodeFilterTS) {
    const buf: string[] = [];

    for (const item of this) {
      serializeToString(item, buf, isHTML, nodeFilter);
    }

    return buf.join('');
  }
}
