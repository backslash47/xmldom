import './types';

import { NodeTypeTS } from './node-types';

export function isDocumentFragment(node: Node | null): node is DocumentFragment {
  return node != null && node.nodeType === NodeTypeTS.DOCUMENT_FRAGMENT_NODE;
}

export function isDocument(node: Node | null): node is Document {
  return node != null && node.nodeType === NodeTypeTS.DOCUMENT_NODE;
}

export function isText(node: Node | null): node is Text {
  return node != null && node.nodeType === NodeTypeTS.TEXT_NODE;
}

export function isAttr(node: Node | null): node is Attr {
  return node != null && node.nodeType === NodeTypeTS.ATTRIBUTE_NODE;
}

export function isElement(node: Node | null): node is Element {
  return node != null && node.nodeType === NodeTypeTS.ELEMENT_NODE;
}

export function isProcessingInstruction(node: Node | null): node is ProcessingInstruction {
  return node != null && node.nodeType === NodeTypeTS.PROCESSING_INSTRUCTION_NODE;
}

export function isComment(node: Node | null): node is Comment {
  return node != null && node.nodeType === NodeTypeTS.COMMENT_NODE;
}

export function isCDATASection(node: Node | null): node is CDATASection {
  return node != null && node.nodeType === NodeTypeTS.CDATA_SECTION_NODE;
}

export function isDocumentType(node: Node | null): node is DocumentType {
  return node != null && node.nodeType === NodeTypeTS.DOCUMENT_TYPE_NODE;
}

export function isEntityReference(node: Node | null): node is EntityReference {
  return node != null && node.nodeType === NodeTypeTS.ENTITY_REFERENCE_NODE;
}

export function isCharacterData(node: Node | null): node is CharacterData {
  return (
    node != null &&
    (node.nodeType === NodeTypeTS.TEXT_NODE ||
      node.nodeType === NodeTypeTS.CDATA_SECTION_NODE ||
      node.nodeType === NodeTypeTS.COMMENT_NODE ||
      node.nodeType === NodeTypeTS.PROCESSING_INSTRUCTION_NODE)
  );
}

export function copy(src: Record<string, any>, dest: Record<string, any>) {
  for (const field of Object.keys(src)) {
    dest[field] = src[field];
  }
}

export function asChildNode<T extends Node>(node: T) {
  return node as T & ChildNode;
}

export function asHTMLElement<T extends Element>(node: T) {
  return node as T & HTMLElement;
}
