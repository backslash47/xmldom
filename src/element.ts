import './types';

import { _appendSingleChild, _visitNode } from './document-utils';
import { DOMExceptionImpl } from './dom-exception';
import { DummyElement } from './dummy/dummy-element';
import { LiveNodeListImpl } from './live-node-list';
import { NodeListImpl } from './node-list';
import { NodeTypeTS } from './node-types';
import { asChildNode, isDocumentFragment, isElement } from './utils';

export class ElementImpl extends DummyElement {
  _nsMap: Record<string, string>;
  tagName: string;
  attributes: NamedNodeMap;
  localName: string;

  constructor() {
    super();

    this._nsMap = {};
    this.nodeType = NodeTypeTS.ELEMENT_NODE;
  }

  hasAttribute(name: string) {
    return this.getAttributeNode(name) != null;
  }
  getAttribute(name: string) {
    const attr = this.getAttributeNode(name);
    return attr != null ? attr.value || '' : null;
  }
  getAttributeNode(name: string) {
    return this.attributes.getNamedItem(name);
  }
  setAttribute(name: string, value: string) {
    const attr = this.ownerDocument.createAttribute(name);
    attr.value = attr.nodeValue = '' + value;
    this.setAttributeNode(attr);
  }
  removeAttribute(name: string) {
    const attr = this.getAttributeNode(name);
    if (attr) {
      this.removeAttributeNode(attr);
    }
  }

  // four real opeartion method
  appendChild<T extends Node>(newChild: T): T {
    if (isDocumentFragment(newChild)) {
      return this.insertBefore(newChild, null);
    } else {
      const _newChild = _appendSingleChild(this, asChildNode(newChild));

      // notify observers
      this.queueMutation({
        type: 'childList',
        target: this,
        addedNodes: new NodeListImpl(_newChild),
        removedNodes: new NodeListImpl(),
        previousSibling: _newChild.previousSibling,
        nextSibling: _newChild.nextSibling,
        attributeName: null,
        attributeNamespace: null,
        oldValue: null,
      });

      return _newChild;
    }
  }
  setAttributeNode(newAttr: Attr) {
    if (this.ownerDocumentInternal() !== newAttr.ownerDocument) {
      throw new DOMExceptionImpl(DOMExceptionImpl.WRONG_DOCUMENT_ERR);
    }

    const oldAttr = this.attributes.setNamedItem(newAttr);

    // notify observers
    this.queueMutation({
      type: 'attributes',
      target: this,
      addedNodes: new NodeListImpl(),
      removedNodes: new NodeListImpl(),
      previousSibling: null,
      nextSibling: null,
      attributeName: newAttr.nodeName,
      attributeNamespace: null,
      oldValue: oldAttr != null ? oldAttr.value : null,
    });

    return oldAttr;
  }
  setAttributeNodeNS(newAttr: Attr) {
    if (this.ownerDocumentInternal() !== newAttr.ownerDocument) {
      throw new DOMExceptionImpl(DOMExceptionImpl.WRONG_DOCUMENT_ERR);
    }

    const oldAttr = this.attributes.setNamedItemNS(newAttr);

    // notify observers
    this.queueMutation({
      type: 'attributes',
      target: this,
      addedNodes: new NodeListImpl(),
      removedNodes: new NodeListImpl(),
      previousSibling: null,
      nextSibling: null,
      attributeName: newAttr.localName,
      attributeNamespace: newAttr.namespaceURI,
      oldValue: oldAttr != null ? oldAttr.value : null,
    });

    return oldAttr;
  }
  removeAttributeNode(attr: Attr) {
    // console.log(this == oldAttr.ownerElement)
    const oldAttr = this.attributes.removeNamedItem(attr.nodeName);

    // notify observers
    this.queueMutation({
      type: 'attributes',
      target: this,
      addedNodes: new NodeListImpl(),
      removedNodes: new NodeListImpl(),
      previousSibling: null,
      nextSibling: null,
      attributeName: oldAttr.namespaceURI != null ? oldAttr.localName : oldAttr.nodeName,
      attributeNamespace: oldAttr.namespaceURI,
      oldValue: oldAttr.value,
    });

    return oldAttr;
  }

  // get real attribute name,and remove it by removeAttributeNode
  removeAttributeNS(namespaceURI: string, localName: string) {
    const old = this.getAttributeNodeNS(namespaceURI, localName);
    if (old) {
      this.removeAttributeNode(old);
    }
  }

  hasAttributeNS(namespaceURI: string, localName: string) {
    return this.getAttributeNodeNS(namespaceURI, localName) != null;
  }
  getAttributeNS(namespaceURI: string, localName: string) {
    const attr = this.getAttributeNodeNS(namespaceURI, localName);
    return (attr && attr.value) || '';
  }
  setAttributeNS(namespaceURI: string, qualifiedName: string, value: string) {
    const attr = this.ownerDocument.createAttributeNS(namespaceURI, qualifiedName);
    attr.value = attr.nodeValue = '' + value;
    this.setAttributeNode(attr);
  }
  getAttributeNodeNS(namespaceURI: string, localName: string) {
    return this.attributes.getNamedItemNS(namespaceURI, localName);
  }

  getElementsByTagName(tagName: string): any {
    return new LiveNodeListImpl<Element>(this, (base) => {
      const ls: Element[] = [];

      _visitNode(base, (node) => {
        if (node !== base && isElement(node) && (tagName === '*' || node.tagName === tagName)) {
          ls.push(node);
        }
      });
      return ls;
    });
  }
  getElementsByTagNameNS(namespaceURI: string, localName: string): any {
    return new LiveNodeListImpl<Element>(this, (base) => {
      const ls: Element[] = [];
      _visitNode(base, (node) => {
        if (
          node !== base &&
          isElement(node) &&
          (namespaceURI === '*' || node.namespaceURI === namespaceURI) &&
          (localName === '*' || node.localName === localName)
        ) {
          ls.push(node);
        }
      });
      return ls;
    });
  }

  get outerHTML() {
    return this.toString();
  }
}
