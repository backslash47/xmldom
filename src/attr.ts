import './types';

import { DummyAttr } from './dummy/dummy-attr';
import { NodeTypeTS } from './node-types';
import { NodeListImpl } from './node-list';
import { ElementImpl } from './element';

export class AttrImpl extends DummyAttr {
  name: string;
  localName: string;

  specified: boolean;
  ownerElement: Element | null = null;

  ownerDocument: Document;

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

  get textContent() {
    return this.nodeValue;
  }

  set textContent(data: string | null) {
    const oldValue = this.nodeValue;
    this.nodeValue = data;

    if (this.ownerElement != null) {
      // notify observers
      (this.ownerElement as ElementImpl).queueMutation({
        type: 'attributes',
        target: this.ownerElement,
        addedNodes: new NodeListImpl(),
        removedNodes: new NodeListImpl(),
        previousSibling: null,
        nextSibling: null,
        attributeName: this.nodeName,
        attributeNamespace: this.namespaceURI,
        oldValue: oldValue,
      });
    }
  }
}
