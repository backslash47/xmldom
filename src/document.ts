import './types';

import { AttrImpl } from './attr';
import { CDATASectionImpl } from './cdata-section';
import { CommentImpl } from './comment';
import { DocumentFragmentImpl } from './document-fragment';
import { _insertBefore, _removeChild, _visitNode, importNode } from './document-utils';
import { DummyDocument } from './dummy/dummy-document';
import { ElementImpl } from './element';
import { EntityReferenceImpl } from './entity-reference';
import { LiveNodeListImpl } from './live-node-list';
import { NamedNodeMapImpl } from './named-node-map';
import { NodeListImpl } from './node-list';
import { NodeListOfImpl } from './node-list-of';
import { NodeTypeTS } from './node-types';
import { ProcessingInstructionImpl } from './processing-instruction';
import { TextImpl } from './text';
import { MutableChildNode } from './types';
import { asChildNode, asHTMLElement, isDocumentFragment, isElement } from './utils';

export class DocumentImpl extends DummyDocument {
  implementation: DOMImplementation;

  doctype: DocumentType | null = null;
  documentURI: string;
  documentElement: HTMLElement = null as never;
  _inc: number = 1;

  constructor() {
    super();
    this.nodeName = '#document';
    this.nodeType = NodeTypeTS.DOCUMENT_NODE;
  }

  insertBefore<T extends Node>(newChild: T, refChild: Node | null): T {
    // raises
    if (isDocumentFragment(newChild)) {
      let child = newChild.firstChild;
      while (child) {
        const next = child.nextSibling;
        this.insertBefore(child, refChild);
        child = next;
      }
      return newChild;
    } else {
      if (this.documentElement == null && isElement(newChild)) {
        this.documentElement = asHTMLElement(newChild);
      }

      const _newChild = _insertBefore(this, asChildNode(newChild), refChild == null ? null : asChildNode(refChild));
      (asChildNode(newChild) as MutableChildNode).ownerDocument = this;

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
  removeChild<T extends Node>(oldChild: T): T {
    if ((this.documentElement as unknown) === oldChild) {
      this.documentElement = null as never;
    }
    return _removeChild(this, oldChild);
  }
  // Introduced in DOM Level 2:
  importNode<T extends Node>(importedNode: T, deep: boolean): T {
    return importNode(this, importedNode, deep);
  }

  // Introduced in DOM Level 2:
  getElementById(id: string) {
    let rtv: Element | null = null;
    _visitNode(this.documentElement, (node: Node) => {
      if (isElement(node)) {
        if (node.getAttribute('id') === id) {
          rtv = node;
          return true;
        }
      }
    });
    return rtv;
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

  // document factory method:
  createElement(tagName: string) {
    const node = new ElementImpl();
    node.ownerDocument = this;
    node.nodeName = tagName;
    node.tagName = tagName;
    node.childNodes = new NodeListOfImpl();
    const attrs = (node.attributes = new NamedNodeMapImpl());
    attrs._ownerElement = node;
    return node;
  }
  createDocumentFragment() {
    const node = new DocumentFragmentImpl();
    node.ownerDocument = this;
    node.childNodes = new NodeListOfImpl();
    return node;
  }
  createTextNode(data: string) {
    const node = new TextImpl();
    node.ownerDocument = this;
    node.appendData(data);
    return node;
  }

  createComment(data: string) {
    const node = new CommentImpl();
    node.ownerDocument = this;
    node.appendData(data);
    return node;
  }
  createCDATASection(data: string) {
    const node = new CDATASectionImpl();
    node.ownerDocument = this;
    node.appendData(data);
    return node;
  }
  createProcessingInstruction(target: string, data: string) {
    const node = new ProcessingInstructionImpl();
    node.ownerDocument = this;
    node.tagName = node.target = target;
    node.nodeValue = node.data = data;
    return node;
  }
  createAttribute(name: string) {
    const node = new AttrImpl();
    node.ownerDocument = this;
    node.name = name;
    node.nodeName = name;
    node.localName = name;
    node.specified = true;
    return node;
  }
  createEntityReference(name: string) {
    const node = new EntityReferenceImpl();
    node.ownerDocument = this;
    node.nodeName = name;
    return node;
  }

  // Introduced in DOM Level 2:
  createElementNS(namespaceURI: string, qualifiedName: string): any {
    const node = new ElementImpl();
    const pl = qualifiedName.split(':');
    const attrs = (node.attributes = new NamedNodeMapImpl());
    node.childNodes = new NodeListOfImpl();
    node.ownerDocument = this;
    node.nodeName = qualifiedName;
    node.tagName = qualifiedName;
    node.namespaceURI = namespaceURI;
    if (pl.length === 2) {
      node.prefix = pl[0];
      node.localName = pl[1];
    } else {
      // el.prefix = null;
      node.localName = qualifiedName;
    }
    attrs._ownerElement = node;
    return node;
  }
  // Introduced in DOM Level 2:
  createAttributeNS(namespaceURI: string, qualifiedName: string) {
    const node = new AttrImpl();
    const pl = qualifiedName.split(':');
    node.ownerDocument = this;
    node.nodeName = qualifiedName;
    node.name = qualifiedName;
    node.namespaceURI = namespaceURI;
    node.specified = true;
    if (pl.length === 2) {
      node.prefix = pl[0];
      node.localName = pl[1];
    } else {
      // el.prefix = null;
      node.localName = qualifiedName;
    }
    return node;
  }
}
