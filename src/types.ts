export {};

declare global {
  interface Document {
    _inc: number;
  }

  type EntityReference = Node;

  interface Element {
    _nsMap: Record<string, string>;
  }

  interface DocumentType {
    internalSubset: string;
  }

  interface Node {
    lineNumber?: number;
    columnNumber?: number;
    observers: RegisteredObserver[];

    toString(isHtml?: boolean, nodeFilter?: NodeFilterTS): string;

    addObserver(observer: MutationObserver, options: MutationObserverInit): boolean;
    delObserver(observer: MutationObserver): void;
  }

  interface MutationObserver {
    queueRecord(record: MutationRecord): void;
    notify(): void;
  }
}

export interface LiveNodeList<TNode extends Node> extends NodeListOf<TNode> {
  _node: Node;
  _refresh: RefreshTS;

  _length: number;
  _inc: number;
}

export type NodeFilterTS = (node: Node) => Node;

export type RefreshTS = (node: Node) => Node[];

export interface Locator {
  systemId?: string;
  lineNumber?: number;
  columnNumber?: number;
}

export type Mutable<T> = { -readonly [P in keyof T]: T[P] };
export type MutableNode = Mutable<Node>;
export type MutableChildNode = Mutable<ChildNode>;
export type MutableElement = Mutable<Element>;
export type MutableDocument = Mutable<Document>;
export type MutableAttr = Mutable<Attr>;

export interface ElementAttributes {
  [index: number]: any;

  tagName: string;
  prefix: string;
  uri: string;
  localName: string;
  closed: boolean;
  length: number;

  currentNSMap: NSMap;
  localNSMap: NSMap | null;

  setTagName(tagName: string): void;

  add(qName: string, value: string, offset: number): void;

  getLocalName(i: number): string | undefined;
  getLocator(i: number): Locator | undefined;
  getQName(i: number): string;
  getURI(i: number): string | undefined;
  getValue(i: number): string;
}

export type EntityMap = Record<string, string>;
export type NSMap = Record<string, string>;

export interface ErrorHandler {
  warning(error: string): void;
  error(error: string): void;
  fatalError(error: string): void;
}
export type ExternalErrorHandler =
  | ((key: 'warning' | 'error' | 'fatalError', msg: string) => void)
  | Partial<ErrorHandler>;

export interface DOMHandler {
  doc: Document;
  locator: Locator;
  currentElement: Node | null;

  startDocument(): void;
  endDocument(): void;
  characters(chars: string, start: number, length: number): void;
  processingInstruction(target: string, data: string): void;
  comment(chars: string, start: number, length: number): void;

  startElement(namespaceURI: string, localName: string, qName: string, attrs: ElementAttributes): void;
  endElement(_namespaceURI: string, _localName: string, _qName: string): void;

  startPrefixMapping(_prefix: string, _uri: string): void;
  endPrefixMapping(_prefix: string): void;

  startCDATA(): void;
  endCDATA(): void;

  startDTD(name: string, publicId: string, systemId: string): void;
  endDTD(): void;

  setDocumentLocator(locator: Locator): void;
}

export type VisibleNamespaces = Array<{ prefix: string | null; namespace: string }>;

export type EntityReplacer = (s: string) => string;

export interface RegisteredObserver {
  observer: MutationObserver;
  options: MutationObserverInit;
}
