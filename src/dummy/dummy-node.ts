import '../types';

import { RegisteredObserver } from '../types';

export abstract class DummyNode implements Node {
  abstract observers: RegisteredObserver[];
  abstract ownerDocument: Document;
  abstract firstChild: ChildNode | null;
  abstract lastChild: ChildNode | null;
  abstract previousSibling: Node | null;
  abstract nextSibling: ChildNode | null;
  abstract parentNode: (Node & ParentNode) | null;
  abstract namespaceURI: string | null;
  abstract nodeName: string;
  abstract nodeType: number;
  abstract nodeValue: string | null;
  abstract childNodes: NodeListOf<ChildNode>;
  abstract ATTRIBUTE_NODE: number;
  abstract CDATA_SECTION_NODE: number;
  abstract COMMENT_NODE: number;
  abstract DOCUMENT_FRAGMENT_NODE: number;
  abstract DOCUMENT_NODE: number;
  abstract DOCUMENT_TYPE_NODE: number;
  abstract ELEMENT_NODE: number;
  abstract ENTITY_NODE: number;
  abstract ENTITY_REFERENCE_NODE: number;
  abstract NOTATION_NODE: number;
  abstract PROCESSING_INSTRUCTION_NODE: number;
  abstract TEXT_NODE: number;

  abstract addObserver(observer: MutationObserver, options: MutationObserverInit): boolean;
  abstract delObserver(observer: MutationObserver): void;

  get childElementCount(): number {
    throw new Error('Property not implemented.');
  }
  get children(): HTMLCollection {
    throw new Error('Property not implemented.');
  }
  get firstElementChild(): Element | null {
    throw new Error('Property not implemented.');
  }
  get lastElementChild(): Element | null {
    throw new Error('Property not implemented.');
  }
  append(..._nodes: Array<string | Node>): void {
    throw new Error('Method not implemented.');
  }
  prepend(..._nodes: Array<string | Node>): void {
    throw new Error('Method not implemented.');
  }
  querySelector(_selectors: any): any {
    throw new Error('Method not implemented.');
  }
  querySelectorAll(_selectors: any): any {
    throw new Error('Method not implemented.');
  }
  get baseURI(): string {
    throw new Error('Property not implemented.');
  }
  get isConnected(): boolean {
    throw new Error('Property not implemented.');
  }
  get parentElement(): HTMLElement | null {
    throw new Error('Property not implemented.');
  }
  get textContent(): string | null {
    throw new Error('Property not implemented.');
  }
  appendChild<T extends Node>(_newChild: T): T {
    throw new Error('Method not implemented.');
  }
  cloneNode<T extends Node>(_deep?: boolean): T {
    throw new Error('Method not implemented.');
  }
  compareDocumentPosition(_other: Node): number {
    throw new Error('Method not implemented.');
  }
  contains(_other: Node | null): boolean {
    throw new Error('Method not implemented.');
  }
  getRootNode(_options?: GetRootNodeOptions | undefined): Node {
    throw new Error('Method not implemented.');
  }
  hasChildNodes(): boolean {
    throw new Error('Method not implemented.');
  }
  insertBefore<T extends Node>(_newChild: T, _refChild: Node | null): T {
    throw new Error('Method not implemented.');
  }
  isDefaultNamespace(_namespace: string | null): boolean {
    throw new Error('Method not implemented.');
  }
  isEqualNode(_otherNode: Node | null): boolean {
    throw new Error('Method not implemented.');
  }
  isSameNode(_otherNode: Node | null): boolean {
    throw new Error('Method not implemented.');
  }
  lookupNamespaceURI(_prefix: string | null): string | null {
    throw new Error('Method not implemented.');
  }
  lookupPrefix(_namespace: string | null): string | null {
    throw new Error('Method not implemented.');
  }
  normalize(): void {
    throw new Error('Method not implemented.');
  }
  removeChild<T extends Node>(_oldChild: T): T {
    throw new Error('Method not implemented.');
  }
  replaceChild<T extends Node>(_newChild: Node, _oldChild: T): T {
    throw new Error('Method not implemented.');
  }

  static get DOCUMENT_POSITION_CONTAINED_BY(): number {
    throw new Error('Property not implemented.');
  }

  static get DOCUMENT_POSITION_CONTAINS(): number {
    throw new Error('Property not implemented.');
  }

  static get DOCUMENT_POSITION_DISCONNECTED(): number {
    throw new Error('Property not implemented.');
  }

  static get DOCUMENT_POSITION_FOLLOWING(): number {
    throw new Error('Property not implemented.');
  }

  static get DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC(): number {
    throw new Error('Property not implemented.');
  }

  static get DOCUMENT_POSITION_PRECEDING(): number {
    throw new Error('Property not implemented.');
  }

  get DOCUMENT_POSITION_CONTAINED_BY(): number {
    throw new Error('Property not implemented.');
  }
  get DOCUMENT_POSITION_CONTAINS(): number {
    throw new Error('Property not implemented.');
  }
  get DOCUMENT_POSITION_DISCONNECTED(): number {
    throw new Error('Property not implemented.');
  }
  get DOCUMENT_POSITION_FOLLOWING(): number {
    throw new Error('Property not implemented.');
  }
  get DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC(): number {
    throw new Error('Property not implemented.');
  }
  get DOCUMENT_POSITION_PRECEDING(): number {
    throw new Error('Property not implemented.');
  }

  addEventListener(
    _type: string,
    _listener: EventListener | EventListenerObject | null,
    _options?: boolean | AddEventListenerOptions | undefined,
  ): void {
    throw new Error('Method not implemented.');
  }
  dispatchEvent(_event: Event): boolean {
    throw new Error('Method not implemented.');
  }
  removeEventListener(
    _type: string,
    _callback: EventListener | EventListenerObject | null,
    _options?: boolean | EventListenerOptions | undefined,
  ): void {
    throw new Error('Method not implemented.');
  }

  after(..._nodes: Array<string | Node>): void {
    throw new Error('Method not implemented.');
  }
  before(..._nodes: Array<string | Node>): void {
    throw new Error('Method not implemented.');
  }
  remove(): void {
    throw new Error('Method not implemented.');
  }
  replaceWith(..._nodes: Array<string | Node>): void {
    throw new Error('Method not implemented.');
  }
}
