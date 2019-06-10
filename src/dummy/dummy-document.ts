import '../types';

import { NodeImpl } from '../node';

export abstract class DummyDocument extends NodeImpl implements Document {
  ownerDocument = null as never;
  abstract doctype: DocumentType | null;
  abstract documentElement: HTMLElement;
  abstract documentURI: string;
  abstract implementation: DOMImplementation;

  abstract _inc: number;

  onabort: ((this: GlobalEventHandlers, ev: UIEvent) => any) | null;
  onanimationcancel: ((this: GlobalEventHandlers, ev: AnimationEvent) => any) | null;
  onanimationend: ((this: GlobalEventHandlers, ev: AnimationEvent) => any) | null;
  onanimationiteration: ((this: GlobalEventHandlers, ev: AnimationEvent) => any) | null;
  onanimationstart: ((this: GlobalEventHandlers, ev: AnimationEvent) => any) | null;
  onauxclick: ((this: GlobalEventHandlers, ev: Event) => any) | null;
  onblur: ((this: GlobalEventHandlers, ev: FocusEvent) => any) | null;
  oncancel: ((this: GlobalEventHandlers, ev: Event) => any) | null;
  oncanplay: ((this: GlobalEventHandlers, ev: Event) => any) | null;
  oncanplaythrough: ((this: GlobalEventHandlers, ev: Event) => any) | null;
  onchange: ((this: GlobalEventHandlers, ev: Event) => any) | null;
  onclick: ((this: GlobalEventHandlers, ev: MouseEvent) => any) | null;
  onclose: ((this: GlobalEventHandlers, ev: Event) => any) | null;
  oncontextmenu: ((this: GlobalEventHandlers, ev: MouseEvent) => any) | null;
  oncuechange: ((this: GlobalEventHandlers, ev: Event) => any) | null;
  ondblclick: ((this: GlobalEventHandlers, ev: MouseEvent) => any) | null;
  ondrag: ((this: GlobalEventHandlers, ev: DragEvent) => any) | null;
  ondragend: ((this: GlobalEventHandlers, ev: DragEvent) => any) | null;
  ondragenter: ((this: GlobalEventHandlers, ev: DragEvent) => any) | null;
  ondragexit: ((this: GlobalEventHandlers, ev: Event) => any) | null;
  ondragleave: ((this: GlobalEventHandlers, ev: DragEvent) => any) | null;
  ondragover: ((this: GlobalEventHandlers, ev: DragEvent) => any) | null;
  ondragstart: ((this: GlobalEventHandlers, ev: DragEvent) => any) | null;
  ondrop: ((this: GlobalEventHandlers, ev: DragEvent) => any) | null;
  ondurationchange: ((this: GlobalEventHandlers, ev: Event) => any) | null;
  onemptied: ((this: GlobalEventHandlers, ev: Event) => any) | null;
  onended: ((this: GlobalEventHandlers, ev: Event) => any) | null;
  onerror: OnErrorEventHandler;
  onfocus: ((this: GlobalEventHandlers, ev: FocusEvent) => any) | null;
  ongotpointercapture: ((this: GlobalEventHandlers, ev: PointerEvent) => any) | null;
  oninput: ((this: GlobalEventHandlers, ev: Event) => any) | null;
  oninvalid: ((this: GlobalEventHandlers, ev: Event) => any) | null;
  onkeydown: ((this: GlobalEventHandlers, ev: KeyboardEvent) => any) | null;
  onkeypress: ((this: GlobalEventHandlers, ev: KeyboardEvent) => any) | null;
  onkeyup: ((this: GlobalEventHandlers, ev: KeyboardEvent) => any) | null;
  onload: ((this: GlobalEventHandlers, ev: Event) => any) | null;
  onloadeddata: ((this: GlobalEventHandlers, ev: Event) => any) | null;
  onloadedmetadata: ((this: GlobalEventHandlers, ev: Event) => any) | null;
  onloadend: ((this: GlobalEventHandlers, ev: ProgressEvent) => any) | null;
  onloadstart: ((this: GlobalEventHandlers, ev: Event) => any) | null;
  onlostpointercapture: ((this: GlobalEventHandlers, ev: PointerEvent) => any) | null;
  onmousedown: ((this: GlobalEventHandlers, ev: MouseEvent) => any) | null;
  onmouseenter: ((this: GlobalEventHandlers, ev: MouseEvent) => any) | null;
  onmouseleave: ((this: GlobalEventHandlers, ev: MouseEvent) => any) | null;
  onmousemove: ((this: GlobalEventHandlers, ev: MouseEvent) => any) | null;
  onmouseout: ((this: GlobalEventHandlers, ev: MouseEvent) => any) | null;
  onmouseover: ((this: GlobalEventHandlers, ev: MouseEvent) => any) | null;
  onmouseup: ((this: GlobalEventHandlers, ev: MouseEvent) => any) | null;
  onpause: ((this: GlobalEventHandlers, ev: Event) => any) | null;
  onplay: ((this: GlobalEventHandlers, ev: Event) => any) | null;
  onplaying: ((this: GlobalEventHandlers, ev: Event) => any) | null;
  onpointercancel: ((this: GlobalEventHandlers, ev: PointerEvent) => any) | null;
  onpointerdown: ((this: GlobalEventHandlers, ev: PointerEvent) => any) | null;
  onpointerenter: ((this: GlobalEventHandlers, ev: PointerEvent) => any) | null;
  onpointerleave: ((this: GlobalEventHandlers, ev: PointerEvent) => any) | null;
  onpointermove: ((this: GlobalEventHandlers, ev: PointerEvent) => any) | null;
  onpointerout: ((this: GlobalEventHandlers, ev: PointerEvent) => any) | null;
  onpointerover: ((this: GlobalEventHandlers, ev: PointerEvent) => any) | null;
  onpointerup: ((this: GlobalEventHandlers, ev: PointerEvent) => any) | null;
  onprogress: ((this: GlobalEventHandlers, ev: ProgressEvent) => any) | null;
  onratechange: ((this: GlobalEventHandlers, ev: Event) => any) | null;
  onreset: ((this: GlobalEventHandlers, ev: Event) => any) | null;
  onresize: ((this: GlobalEventHandlers, ev: UIEvent) => any) | null;
  onscroll: ((this: GlobalEventHandlers, ev: Event) => any) | null;
  onsecuritypolicyviolation: ((this: GlobalEventHandlers, ev: SecurityPolicyViolationEvent) => any) | null;
  onseeked: ((this: GlobalEventHandlers, ev: Event) => any) | null;
  onseeking: ((this: GlobalEventHandlers, ev: Event) => any) | null;
  onselect: ((this: GlobalEventHandlers, ev: Event) => any) | null;
  onselectionchange: ((this: GlobalEventHandlers, ev: Event) => any) | null;
  onselectstart: ((this: GlobalEventHandlers, ev: Event) => any) | null;
  onstalled: ((this: GlobalEventHandlers, ev: Event) => any) | null;
  onsubmit: ((this: GlobalEventHandlers, ev: Event) => any) | null;
  onsuspend: ((this: GlobalEventHandlers, ev: Event) => any) | null;
  ontimeupdate: ((this: GlobalEventHandlers, ev: Event) => any) | null;
  ontoggle: ((this: GlobalEventHandlers, ev: Event) => any) | null;
  ontouchcancel: ((this: GlobalEventHandlers, ev: TouchEvent) => any) | null;
  ontouchend: ((this: GlobalEventHandlers, ev: TouchEvent) => any) | null;
  ontouchmove: ((this: GlobalEventHandlers, ev: TouchEvent) => any) | null;
  ontouchstart: ((this: GlobalEventHandlers, ev: TouchEvent) => any) | null;
  ontransitioncancel: ((this: GlobalEventHandlers, ev: TransitionEvent) => any) | null;
  ontransitionend: ((this: GlobalEventHandlers, ev: TransitionEvent) => any) | null;
  ontransitionrun: ((this: GlobalEventHandlers, ev: TransitionEvent) => any) | null;
  ontransitionstart: ((this: GlobalEventHandlers, ev: TransitionEvent) => any) | null;
  onvolumechange: ((this: GlobalEventHandlers, ev: Event) => any) | null;
  onwaiting: ((this: GlobalEventHandlers, ev: Event) => any) | null;
  onwheel: ((this: GlobalEventHandlers, ev: WheelEvent) => any) | null;
  oncopy: ((this: DocumentAndElementEventHandlers, ev: ClipboardEvent) => any) | null;
  oncut: ((this: DocumentAndElementEventHandlers, ev: ClipboardEvent) => any) | null;
  onpaste: ((this: DocumentAndElementEventHandlers, ev: ClipboardEvent) => any) | null;

  get styleSheets(): StyleSheetList {
    throw new Error('Property not implemented.');
  }

  createElement(_tagName: string): HTMLElement {
    throw new Error('Method not implemented.');
  }
  createDocumentFragment(): DocumentFragment {
    throw new Error('Method not implemented.');
  }
  createTextNode(_data: string): Text {
    throw new Error('Method not implemented.');
  }
  createComment(_data: string): Comment {
    throw new Error('Method not implemented.');
  }
  createCDATASection(_data: string): CDATASection {
    throw new Error('Method not implemented.');
  }
  createProcessingInstruction(_target: string, _data: string): ProcessingInstruction {
    throw new Error('Method not implemented.');
  }
  createAttribute(_name: string): Attr {
    throw new Error('Method not implemented.');
  }
  createEntityReference(_name: string): EntityReference {
    throw new Error('Method not implemented.');
  }
  createElementNS(_namespaceURI: string, _qualifiedName: string): any {
    throw new Error('Method not implemented.');
  }
  createAttributeNS(_namespaceURI: string, _qualifiedName: string): Attr {
    throw new Error('Method not implemented.');
  }
  createExpression(_expression: string, _resolver?: XPathNSResolver | null | undefined): XPathExpression {
    throw new Error('Method not implemented.');
  }
  createNSResolver(_nodeResolver: Node): XPathNSResolver {
    throw new Error('Method not implemented.');
  }

  get URL(): string {
    throw new Error('Property not implemented.');
  }
  get activeElement(): Element | null {
    throw new Error('Property not implemented.');
  }
  get alinkColor(): string {
    throw new Error('Property not implemented.');
  }
  get all(): HTMLAllCollection {
    throw new Error('Property not implemented.');
  }
  get anchors(): HTMLCollectionOf<HTMLAnchorElement> {
    throw new Error('Property not implemented.');
  }
  get applets(): HTMLCollectionOf<HTMLAppletElement> {
    throw new Error('Property not implemented.');
  }
  get bgColor(): string {
    throw new Error('Property not implemented.');
  }
  get body(): HTMLElement {
    throw new Error('Property not implemented.');
  }
  get characterSet(): string {
    throw new Error('Property not implemented.');
  }
  get charset(): string {
    throw new Error('Property not implemented.');
  }
  get compatMode(): string {
    throw new Error('Property not implemented.');
  }
  get contentType(): string {
    throw new Error('Property not implemented.');
  }
  get cookie(): string {
    throw new Error('Property not implemented.');
  }
  get currentScript(): HTMLScriptElement | SVGScriptElement | null {
    throw new Error('Property not implemented.');
  }
  get defaultView(): Window | null {
    throw new Error('Property not implemented.');
  }
  get designMode(): string {
    throw new Error('Property not implemented.');
  }
  get dir(): string {
    throw new Error('Property not implemented.');
  }
  get domain(): string {
    throw new Error('Property not implemented.');
  }
  get embeds(): HTMLCollectionOf<HTMLEmbedElement> {
    throw new Error('Property not implemented.');
  }
  get fgColor(): string {
    throw new Error('Property not implemented.');
  }
  get forms(): HTMLCollectionOf<HTMLFormElement> {
    throw new Error('Property not implemented.');
  }
  get fullscreen(): boolean {
    throw new Error('Property not implemented.');
  }
  get fullscreenEnabled(): boolean {
    throw new Error('Property not implemented.');
  }
  get head(): HTMLHeadElement {
    throw new Error('Property not implemented.');
  }
  get hidden(): boolean {
    throw new Error('Property not implemented.');
  }
  get images(): HTMLCollectionOf<HTMLImageElement> {
    throw new Error('Property not implemented.');
  }
  get inputEncoding(): string {
    throw new Error('Property not implemented.');
  }
  get lastModified(): string {
    throw new Error('Property not implemented.');
  }
  get linkColor(): string {
    throw new Error('Property not implemented.');
  }
  get links(): HTMLCollectionOf<HTMLAnchorElement | HTMLAreaElement> {
    throw new Error('Property not implemented.');
  }
  get location(): Location {
    throw new Error('Property not implemented.');
  }
  get onfullscreenchange(): ((this: Document, ev: Event) => any) | null {
    throw new Error('Property not implemented.');
  }
  get onfullscreenerror(): ((this: Document, ev: Event) => any) | null {
    throw new Error('Property not implemented.');
  }
  get onpointerlockchange(): ((this: Document, ev: Event) => any) | null {
    throw new Error('Property not implemented.');
  }
  get onpointerlockerror(): ((this: Document, ev: Event) => any) | null {
    throw new Error('Property not implemented.');
  }
  get onreadystatechange(): ((this: Document, ev: ProgressEvent) => any) | null {
    throw new Error('Property not implemented.');
  }
  get onvisibilitychange(): ((this: Document, ev: Event) => any) | null {
    throw new Error('Property not implemented.');
  }
  get origin(): string {
    throw new Error('Property not implemented.');
  }
  get plugins(): HTMLCollectionOf<HTMLEmbedElement> {
    throw new Error('Property not implemented.');
  }
  get readyState(): DocumentReadyState {
    throw new Error('Property not implemented.');
  }
  get referrer(): string {
    throw new Error('Property not implemented.');
  }
  get scripts(): HTMLCollectionOf<HTMLScriptElement> {
    throw new Error('Property not implemented.');
  }
  get scrollingElement(): Element | null {
    throw new Error('Property not implemented.');
  }
  get timeline(): DocumentTimeline {
    throw new Error('Property not implemented.');
  }
  get title(): string {
    throw new Error('Property not implemented.');
  }
  get visibilityState(): VisibilityState {
    throw new Error('Property not implemented.');
  }
  get vlinkColor(): string {
    throw new Error('Property not implemented.');
  }
  adoptNode<T extends Node>(_source: T): T {
    throw new Error('Method not implemented.');
  }
  captureEvents(): void {
    throw new Error('Method not implemented.');
  }
  caretPositionFromPoint(_x: number, _y: number): CaretPosition | null {
    throw new Error('Method not implemented.');
  }
  caretRangeFromPoint(_x: number, _y: number): Range {
    throw new Error('Method not implemented.');
  }
  clear(): void {
    throw new Error('Method not implemented.');
  }
  close(): void {
    throw new Error('Method not implemented.');
  }
  createEvent(_eventInterface: any): any {
    throw new Error('Method not implemented.');
  }
  createNodeIterator(
    _root: Node,
    _whatToShow?: number | undefined,
    _filter?: NodeFilter | null | undefined,
  ): NodeIterator {
    throw new Error('Method not implemented.');
  }
  createRange(): Range {
    throw new Error('Method not implemented.');
  }
  createTouch(
    _view: Window,
    _target: EventTarget,
    _identifier: number,
    _pageX: number,
    _pageY: number,
    _screenX: number,
    _screenY: number,
  ): Touch {
    throw new Error('Method not implemented.');
  }
  createTouchList(..._touches: Touch[]): TouchList {
    throw new Error('Method not implemented.');
  }
  createTreeWalker(_root: any, _whatToShow?: any, _filter?: any, _entityReferenceExpansion?: any): any {
    throw new Error('Method not implemented.');
  }
  elementFromPoint(_x: number, _y: number): Element | null {
    throw new Error('Method not implemented.');
  }
  elementsFromPoint(_x: number, _y: number): Element[] {
    throw new Error('Method not implemented.');
  }
  evaluate(
    _expression: string,
    _contextNode: Node,
    _resolver: XPathNSResolver | null,
    _type: number,
    _result: XPathResult | null,
  ): XPathResult {
    throw new Error('Method not implemented.');
  }
  execCommand(_commandId: string, _showUI?: boolean | undefined, _value?: string | undefined): boolean {
    throw new Error('Method not implemented.');
  }
  exitFullscreen(): Promise<void> {
    throw new Error('Method not implemented.');
  }
  exitPointerLock(): void {
    throw new Error('Method not implemented.');
  }
  getAnimations(): Animation[] {
    throw new Error('Method not implemented.');
  }
  getElementById(_elementId: string): HTMLElement | null {
    throw new Error('Method not implemented.');
  }
  getElementsByClassName(_classNames: string): HTMLCollectionOf<Element> {
    throw new Error('Method not implemented.');
  }
  getElementsByName(_elementName: string): NodeListOf<HTMLElement> {
    throw new Error('Method not implemented.');
  }
  getElementsByTagName(_qualifiedName: any): any {
    throw new Error('Method not implemented.');
  }
  getElementsByTagNameNS(_namespaceURI: any, _localName: any): any {
    throw new Error('Method not implemented.');
  }
  getSelection(): Selection | null {
    throw new Error('Method not implemented.');
  }
  hasFocus(): boolean {
    throw new Error('Method not implemented.');
  }
  importNode<T extends Node>(_importedNode: T, _deep: boolean): T {
    throw new Error('Method not implemented.');
  }
  open(
    _url?: string | undefined,
    _name?: string | undefined,
    _features?: string | undefined,
    _replace?: boolean | undefined,
  ): Document {
    throw new Error('Method not implemented.');
  }
  queryCommandEnabled(_commandId: string): boolean {
    throw new Error('Method not implemented.');
  }
  queryCommandIndeterm(_commandId: string): boolean {
    throw new Error('Method not implemented.');
  }
  queryCommandState(_commandId: string): boolean {
    throw new Error('Method not implemented.');
  }
  queryCommandSupported(_commandId: string): boolean {
    throw new Error('Method not implemented.');
  }
  queryCommandValue(_commandId: string): string {
    throw new Error('Method not implemented.');
  }
  releaseEvents(): void {
    throw new Error('Method not implemented.');
  }
  write(..._text: string[]): void {
    throw new Error('Method not implemented.');
  }
  writeln(..._text: string[]): void {
    throw new Error('Method not implemented.');
  }
  get fullscreenElement(): Element | null {
    throw new Error('Property not implemented.');
  }
  get pointerLockElement(): Element | null {
    throw new Error('Property not implemented.');
  }
}
