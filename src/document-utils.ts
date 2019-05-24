import './types';

import { Mutable, MutableChildNode, MutableNode } from './types';
import { isAttr, isDocument, isDocumentFragment, isElement } from './utils';

/**
 * @param callback return true for continue,false for break
 * @return boolean true: break visit;
 */
export function _visitNode(n: Node, callback: (node: Node) => boolean | undefined | void) {
  let node: Node | null = n;

  if (callback(node)) {
    return true;
  }

  node = node.firstChild;

  while (node !== null) {
    if (_visitNode(node, callback)) {
      return true;
    }
    node = node.nextSibling;
  }
}

export function _onAddAttribute(doc: Document, el: Element, newAttr: Attr) {
  if (doc) {
    doc._inc++;
  }

  const ns = newAttr.namespaceURI;
  if (ns === 'http://www.w3.org/2000/xmlns/') {
    // update namespace
    el._nsMap[newAttr.prefix ? newAttr.localName : ''] = newAttr.value;
  }
}
export function _onRemoveAttribute(doc: Document, el: Element, newAttr: Attr, _remove?: any) {
  if (doc) {
    doc._inc++;
  }

  const ns = newAttr.namespaceURI;
  if (ns === 'http://www.w3.org/2000/xmlns/') {
    // update namespace
    delete el._nsMap[newAttr.prefix ? newAttr.localName : ''];
  }
}
export function _onUpdateChild(doc: Document | null, el: Node, newChild?: ChildNode) {
  if (doc && doc._inc) {
    doc._inc++;
    // update childNodes
    const cs = el.childNodes;
    if (newChild) {
      cs[cs.length++] = newChild;
    } else {
      // console.log(1)
      let child = el.firstChild;
      let i = 0;
      while (child) {
        cs[i++] = child;
        child = child.nextSibling;
      }
      cs.length = i;
    }
  }
}

/**
 * attributes;
 * children;
 *
 * writeable properties:
 * nodeValue,Attr:value,CharacterData:data
 * prefix
 */
export function _removeChild<T extends Node>(parentNode: MutableNode, child: T): T {
  const previous: MutableNode | null = child.previousSibling;
  const next: MutableChildNode | null = child.nextSibling;
  if (previous) {
    previous.nextSibling = next;
  } else {
    (parentNode as MutableNode).firstChild = next;
  }
  if (next) {
    next.previousSibling = previous;
  } else {
    parentNode.lastChild = previous as ChildNode | null;
  }
  _onUpdateChild(parentNode.ownerDocument, parentNode);
  return child;
}
/**
 * preformance key(refChild == null)
 */
export function _insertBefore<T extends MutableChildNode>(
  parentNode: Mutable<Node & ParentNode>,
  newChild: T,
  nextChild: MutableChildNode | null,
): T {
  const cp = newChild.parentNode;
  if (cp) {
    cp.removeChild(newChild); // remove and update
  }

  let newFirst: MutableChildNode | null;
  let newLast: MutableChildNode;
  if (isDocumentFragment(newChild)) {
    newFirst = newChild.firstChild;
    if (newFirst == null) {
      return newChild;
    }
    newLast = newChild.lastChild!;
  } else {
    newFirst = newLast = newChild;
  }

  const pre = (nextChild ? nextChild.previousSibling : parentNode.lastChild) as MutableChildNode | null;

  newFirst.previousSibling = pre;
  newLast.nextSibling = nextChild;

  if (pre) {
    pre.nextSibling = newFirst;
  } else {
    parentNode.firstChild = newFirst;
  }
  if (nextChild == null) {
    parentNode.lastChild = newLast;
  } else {
    nextChild.previousSibling = newLast;
  }
  do {
    newFirst.parentNode = parentNode;
    // tslint:disable-next-line:no-conditional-assignment
  } while (newFirst !== newLast && (newFirst = newFirst.nextSibling));
  _onUpdateChild(isDocument(parentNode) ? parentNode : parentNode.ownerDocument, parentNode);

  if (isDocumentFragment(newChild)) {
    (newChild as T).firstChild = (newChild as T).lastChild = null;
  }
  return newChild;
}
export function _appendSingleChild<T extends MutableChildNode>(parentNode: Mutable<Node & ParentNode>, newChild: T): T {
  const cp = newChild.parentNode;
  if (cp) {
    cp.removeChild(newChild); // remove and update
  }
  const pre: MutableChildNode | null = parentNode.lastChild;
  newChild.parentNode = parentNode;
  newChild.previousSibling = pre;
  newChild.nextSibling = null;
  if (pre) {
    pre.nextSibling = newChild;
  } else {
    parentNode.firstChild = newChild;
  }
  parentNode.lastChild = newChild;
  _onUpdateChild(parentNode.ownerDocument, parentNode, newChild);
  return newChild;
}

export function importNode<T extends Node>(doc: Document, node: T, deep: boolean): T {
  let node2: Mutable<T> | undefined;

  if (isElement(node)) {
    node2 = node.cloneNode(false) as Mutable<T>;
    node2.ownerDocument = doc;
    // const attrs = node2.attributes;
    // const len = attrs.length;
    // for(let i=0;i<len;i++){
    //   node2.setAttributeNodeNS(importNode(doc,attrs.item(i),deep));
    // }
  } else if (isAttr(node)) {
    deep = true;
  }
  // case ENTITY_REFERENCE_NODE:
  // case PROCESSING_INSTRUCTION_NODE:
  // case TEXT_NODE:
  // case CDATA_SECTION_NODE:
  // case COMMENT_NODE:
  // deep = false;
  // break;
  // case DOCUMENT_NODE:
  // case DOCUMENT_TYPE_NODE:
  // cannot be imported.
  // case ENTITY_NODE:
  // case NOTATION_NODE：
  // can not hit in level3
  // default:throw e;

  if (!node2) {
    node2 = node.cloneNode(false) as Mutable<T>; // false
  }
  node2.ownerDocument = doc;
  node2.parentNode = null;
  if (deep) {
    let child = node.firstChild;
    while (child) {
      node2.appendChild(importNode(doc, child, deep));
      child = child.nextSibling;
    }
  }
  return node2;
}
