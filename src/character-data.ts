import './types';

import { DOMExceptionImpl } from './dom-exception';
import { DummyCharacterData } from './dummy/dummy-character-data';
import { NodeListImpl } from './node-list';

export class CharacterDataImpl extends DummyCharacterData {
  _data: string = '';
  length: number = 0;

  get data() {
    return this._data;
  }

  set data(data: string) {
    // notify observers
    this.queueMutation({
      type: 'characterData',
      target: this,
      addedNodes: new NodeListImpl(),
      removedNodes: new NodeListImpl(),
      previousSibling: null,
      nextSibling: null,
      attributeName: null,
      attributeNamespace: null,
      oldValue: this._data,
    });

    this._data = data;
  }

  substringData(offset: number, count: number) {
    return this.data.substring(offset, offset + count);
  }
  appendData(text: string) {
    text = this.data + text;
    this.nodeValue = this.data = text;
    this.length = text.length;
  }
  insertData(offset: number, text: string) {
    this.replaceData(offset, 0, text);
  }
  appendChild<T extends Node>(_newChild: T): T {
    throw new DOMExceptionImpl(DOMExceptionImpl.HIERARCHY_REQUEST_ERR);
  }
  deleteData(offset: number, count: number) {
    this.replaceData(offset, count, '');
  }
  replaceData(offset: number, count: number, text: string) {
    const start = this.data.substring(0, offset);
    const end = this.data.substring(offset + count);
    text = start + text + end;
    this.nodeValue = this.data = text;
    this.length = text.length;
  }
}
