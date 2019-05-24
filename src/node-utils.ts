import './types';

import { NamedNodeMapImpl } from './named-node-map';
import { NodeListOfImpl } from './node-list-of';
import { MutableElement, MutableNode } from './types';
import { isAttr, isComment, isDocumentFragment, isElement, isProcessingInstruction } from './utils';

export function cloneNode<T extends MutableNode>(doc: Document, node: T, deep: boolean): T {
  const node2: T = new (node.constructor as any)();
  for (const n of Object.keys(node)) {
    const v = (node as any)[n];
    if (typeof v !== 'object') {
      if (v !== (node2 as any)[n]) {
        (node2 as any)[n] = v;
      }
    }
  }
  if (node.childNodes) {
    node2.childNodes = new NodeListOfImpl();
  }
  node2.ownerDocument = doc;

  if (isElement(node) && isElement(node2)) {
    const attrs = node.attributes;
    const attrs2 = ((node2 as MutableElement).attributes = new NamedNodeMapImpl());
    const len = attrs.length;
    attrs2._ownerElement = node2;
    for (let i = 0; i < len; i++) {
      node2.setAttributeNode(cloneNode(doc, attrs.item(i)!, true));
    }
  } else if (isAttr(node2)) {
    deep = true;
  }

  if (deep) {
    let child = node.firstChild;
    while (child) {
      node2.appendChild(cloneNode(doc, child, deep));
      child = child.nextSibling;
    }
  }
  return node2;
}

export function getTextContent(n: Node): string | null {
  let node: Node | null = n;

  if (isElement(node) || isDocumentFragment(node)) {
    const buf: string[] = [];
    node = node.firstChild;
    while (node) {
      if (!isProcessingInstruction(node) && !isComment(node)) {
        const content = getTextContent(node);

        if (content != null) {
          buf.push(content);
        }
      }
      node = node.nextSibling;
    }
    return buf.join('');
  } else {
    return node.nodeValue;
  }
}
