import './types';

import { _onAddAttribute, _onRemoveAttribute } from './document-utils';
import { DOMExceptionImpl } from './dom-exception';
import { MutableAttr } from './types';

export function _findNodeIndex(list: Node[], node: Node) {
  let i = list.length;
  while (i--) {
    if (list[i] === node) {
      return i;
    }
  }

  // todo: I added this fix, needs to check if good
  return -1;
}

export function _addNamedNode(el: Element, list: Attr[], newAttr: MutableAttr, oldAttr: Attr | null) {
  if (oldAttr) {
    list[_findNodeIndex(list, oldAttr)] = newAttr;
  } else {
    list[list.length++] = newAttr;
  }
  if (el) {
    newAttr.ownerElement = el;
    const doc = el.ownerDocument;
    if (doc) {
      if (oldAttr) {
        _onRemoveAttribute(doc, el, oldAttr);
      }
      _onAddAttribute(doc, el, newAttr);
    }
  }
}

export function _removeNamedNode(el: Element, list: Attr[], attr: MutableAttr) {
  // console.log('remove attr:'+attr)
  let i = _findNodeIndex(list, attr);
  if (i >= 0) {
    const lastIndex = list.length - 1;
    while (i < lastIndex) {
      list[i] = list[++i];
    }
    list.length = lastIndex;
    if (el) {
      const doc = el.ownerDocument;
      if (doc) {
        _onRemoveAttribute(doc, el, attr);
        attr.ownerElement = null;
      }
    }
  } else {
    throw new DOMExceptionImpl(DOMExceptionImpl.NOT_FOUND_ERR, el.tagName + '@' + attr);
  }
}
