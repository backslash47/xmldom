import './types';
import { NodeTypeTS } from './node-types';
import { DummyAttr } from './dummy/dummy-attr';

export class AttrImpl extends DummyAttr {
  name: string;
  localName: string;

  specified: boolean;
  ownerElement: Element | null = null;

  constructor() {
    super();

    this.nodeType = NodeTypeTS.ATTRIBUTE_NODE;
  }

  get value() {
    return this.nodeValue || '';
  }

  set value(value: string) {
    this.nodeValue = value;
  }
}
