import { AttrImpl } from './attr';
import { CDATASectionImpl } from './cdata-section';
import { CommentImpl } from './comment';
import { DocumentImpl } from './document';
import { DocumentFragmentImpl } from './document-fragment';
import { DocumentTypeImpl } from './document-type';
import { DOMImplementationImpl } from './dom-implementation';
import { ElementImpl } from './element';
import { MutationObserverImpl } from './mutation/mutation-observer';
import { NamedNodeMapImpl } from './named-node-map';
import { NodeImpl } from './node';
import { NodeListImpl } from './node-list';
import { DOMParserImpl } from './parser/dom-parser';
import { ProcessingInstructionImpl } from './processing-instruction';
import { XMLSerializerImpl } from './serializer/xml-serializer';
import { TextImpl } from './text';

export {
  AttrImpl,
  CDATASectionImpl,
  CommentImpl,
  DocumentImpl,
  DocumentFragmentImpl,
  DocumentTypeImpl,
  DOMImplementationImpl,
  ElementImpl,
  MutationObserverImpl,
  NamedNodeMapImpl,
  NodeImpl,
  NodeListImpl,
  DOMParserImpl,
  ProcessingInstructionImpl,
  XMLSerializerImpl,
  TextImpl,
};

if (globalThis) {
  globalThis.XMLSerializer = XMLSerializerImpl;
  globalThis.DOMImplementation = DOMImplementationImpl;
  globalThis.DOMParser = DOMParserImpl;

  globalThis.Attr = AttrImpl;
  globalThis.CDATASection = CDATASectionImpl;
  globalThis.Comment = CommentImpl;
  globalThis.DocumentFragment = DocumentFragmentImpl;
  globalThis.DocumentType = DocumentTypeImpl;
  globalThis.Document = DocumentImpl;
  globalThis.Element = ElementImpl;
  globalThis.NamedNodeMap = NamedNodeMapImpl;
  globalThis.NodeList = NodeListImpl;
  globalThis.Node = NodeImpl;
  globalThis.ProcessingInstruction = ProcessingInstructionImpl;
  globalThis.Text = TextImpl;

  globalThis.MutationObserver = MutationObserverImpl;
}
