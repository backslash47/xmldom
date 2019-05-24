import './types';

import { _onAddAttribute, _onRemoveAttribute } from './document-utils';
import { DOMExceptionImpl } from './dom-exception';
import { _addNamedNode, _removeNamedNode } from './named-node-map-utils';

/**
 *
 * Objects implementing the NamedNodeMap interface are used to represent collections of nodes
 * that can be accessed by name. Note that NamedNodeMap does not inherit from NodeList;
 * NamedNodeMaps are not maintained in any particular order. Objects contained in an object
 * implementing NamedNodeMap may also be accessed by an ordinal index, but this is simply to
 * allow convenient enumeration of the contents of a NamedNodeMap, and does not imply that
 * the DOM specifies an order to these Nodes.
 *
 * NamedNodeMap objects in the DOM are live.
 * used for attributes or DocumentType entities
 */
export class NamedNodeMapImpl extends Array<Attr> implements NamedNodeMap {
  _ownerElement: Element;

  item(index: number) {
    return this[index] || null;
  }

  getNamedItem(key: string) {
    // if(key.indexOf(':')>0 || key == 'xmlns'){
    //   return null;
    // }
    // console.log()
    let i = this.length;
    while (i--) {
      const attr = this[i];
      // console.log(attr.nodeName,key)
      if (attr.nodeName === key) {
        return attr;
      }
    }

    return null;
  }

  setNamedItem(attr: Attr) {
    const el = attr.ownerElement;
    if (el && el !== this._ownerElement) {
      throw new DOMExceptionImpl(DOMExceptionImpl.INUSE_ATTRIBUTE_ERR);
    }
    const oldAttr = this.getNamedItem(attr.nodeName);
    _addNamedNode(this._ownerElement, this, attr, oldAttr);
    return oldAttr;
  }

  /* returns Node */
  setNamedItemNS(attr: Attr) {
    // raises: WRONG_DOCUMENT_ERR,NO_MODIFICATION_ALLOWED_ERR,INUSE_ATTRIBUTE_ERR
    const el = attr.ownerElement;
    let oldAttr: Attr | null;
    if (el && el !== this._ownerElement) {
      throw new DOMExceptionImpl(DOMExceptionImpl.INUSE_ATTRIBUTE_ERR);
    }
    oldAttr = this.getNamedItemNS(attr.namespaceURI, attr.localName);
    _addNamedNode(this._ownerElement, this, attr, oldAttr);
    return oldAttr;
  }

  /* returns Node */
  removeNamedItem(key: string) {
    const attr = this.getNamedItem(key);

    if (attr === null) {
      throw new DOMExceptionImpl(DOMExceptionImpl.NOT_FOUND_ERR);
    }

    _removeNamedNode(this._ownerElement, this, attr);
    return attr;
  } // raises: NOT_FOUND_ERR,NO_MODIFICATION_ALLOWED_ERR

  // for level2
  removeNamedItemNS(namespaceURI: string, localName: string) {
    const attr = this.getNamedItemNS(namespaceURI, localName);

    if (attr === null) {
      throw new DOMExceptionImpl(DOMExceptionImpl.NOT_FOUND_ERR);
    }

    _removeNamedNode(this._ownerElement, this, attr);
    return attr;
  }
  getNamedItemNS(namespaceURI: string | null, localName: string) {
    let i = this.length;
    while (i--) {
      const node = this[i];
      if (node.localName === localName && node.namespaceURI === namespaceURI) {
        return node;
      }
    }
    return null;
  }
}
