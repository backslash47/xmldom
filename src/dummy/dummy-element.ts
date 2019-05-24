import '../types';

import { NodeImpl } from '../node';

export abstract class DummyElement extends NodeImpl implements Element, HTMLElement {
  abstract _nsMap: Record<string, string>;
  abstract attributes: NamedNodeMap;

  abstract tagName: string;

  abstract localName: string;

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

  get accessKey(): string {
    throw new Error('Property not implemented.');
  }
  get accessKeyLabel(): string {
    throw new Error('Property not implemented.');
  }
  get autocapitalize(): string {
    throw new Error('Property not implemented.');
  }
  get dir(): string {
    throw new Error('Property not implemented.');
  }
  get draggable(): boolean {
    throw new Error('Property not implemented.');
  }
  get hidden(): boolean {
    throw new Error('Property not implemented.');
  }
  get innerText(): string {
    throw new Error('Property not implemented.');
  }
  get lang(): string {
    throw new Error('Property not implemented.');
  }
  get offsetHeight(): number {
    throw new Error('Property not implemented.');
  }
  get offsetLeft(): number {
    throw new Error('Property not implemented.');
  }
  get offsetParent(): Element | null {
    throw new Error('Property not implemented.');
  }
  get offsetTop(): number {
    throw new Error('Property not implemented.');
  }
  get offsetWidth(): number {
    throw new Error('Property not implemented.');
  }
  get spellcheck(): boolean {
    throw new Error('Property not implemented.');
  }
  get title(): string {
    throw new Error('Property not implemented.');
  }
  get translate(): boolean {
    throw new Error('Property not implemented.');
  }
  click(): void {
    throw new Error('Method not implemented.');
  }
  get contentEditable(): string {
    throw new Error('Property not implemented.');
  }
  get inputMode(): string {
    throw new Error('Property not implemented.');
  }
  get isContentEditable(): boolean {
    throw new Error('Property not implemented.');
  }
  get dataset(): DOMStringMap {
    throw new Error('Property not implemented.');
  }
  get nonce(): string | undefined {
    throw new Error('Property not implemented.');
  }
  get tabIndex(): number {
    throw new Error('Property not implemented.');
  }
  blur(): void {
    throw new Error('Method not implemented.');
  }
  focus(_options?: FocusOptions | undefined): void {
    throw new Error('Method not implemented.');
  }
  get style(): CSSStyleDeclaration {
    throw new Error('Property not implemented.');
  }

  get assignedSlot(): HTMLSlotElement | null {
    throw new Error('Property not implemented.');
  }
  get classList(): DOMTokenList {
    throw new Error('Property not implemented.');
  }
  get className(): string {
    throw new Error('Property not implemented.');
  }
  get clientHeight(): number {
    throw new Error('Property not implemented.');
  }
  get clientLeft(): number {
    throw new Error('Property not implemented.');
  }
  get clientTop(): number {
    throw new Error('Property not implemented.');
  }
  get clientWidth(): number {
    throw new Error('Property not implemented.');
  }
  get id(): string {
    throw new Error('Property not implemented.');
  }
  get innerHTML(): string {
    throw new Error('Property not implemented.');
  }
  get onfullscreenchange(): ((this: Element, ev: Event) => any) | null {
    throw new Error('Property not implemented.');
  }
  get onfullscreenerror(): ((this: Element, ev: Event) => any) | null {
    throw new Error('Property not implemented.');
  }
  get outerHTML(): string {
    throw new Error('Property not implemented.');
  }
  get scrollHeight(): number {
    throw new Error('Property not implemented.');
  }
  get scrollLeft(): number {
    throw new Error('Property not implemented.');
  }
  get scrollTop(): number {
    throw new Error('Property not implemented.');
  }
  get scrollWidth(): number {
    throw new Error('Property not implemented.');
  }
  get shadowRoot(): ShadowRoot | null {
    throw new Error('Property not implemented.');
  }
  get slot(): string {
    throw new Error('Property not implemented.');
  }
  attachShadow(_init: ShadowRootInit): ShadowRoot {
    throw new Error('Method not implemented.');
  }
  closest(_selector: any): any {
    throw new Error('Method not implemented.');
  }
  getAttribute(_qualifiedName: string): string | null {
    throw new Error('Method not implemented.');
  }
  getAttributeNS(_namespace: string | null, _localName: string): string | null {
    throw new Error('Method not implemented.');
  }
  getAttributeNames(): string[] {
    throw new Error('Method not implemented.');
  }
  getAttributeNode(_name: string): Attr | null {
    throw new Error('Method not implemented.');
  }
  getAttributeNodeNS(_namespaceURI: string, _localName: string): Attr | null {
    throw new Error('Method not implemented.');
  }
  getBoundingClientRect(): ClientRect | DOMRect {
    throw new Error('Method not implemented.');
  }
  getClientRects(): ClientRectList | DOMRectList {
    throw new Error('Method not implemented.');
  }
  getElementsByClassName(_classNames: string): HTMLCollectionOf<Element> {
    throw new Error('Method not implemented.');
  }
  getElementsByTagName(_qualifiedName: any): any {
    throw new Error('Method not implemented.');
  }
  getElementsByTagNameNS(_namespaceURI: any, _localName: any): any {
    throw new Error('Method not implemented.');
  }
  hasAttribute(_qualifiedName: string): boolean {
    throw new Error('Method not implemented.');
  }
  hasAttributeNS(_namespace: string | null, _localName: string): boolean {
    throw new Error('Method not implemented.');
  }
  hasPointerCapture(_pointerId: number): boolean {
    throw new Error('Method not implemented.');
  }
  insertAdjacentElement(_position: InsertPosition, _insertedElement: Element): Element | null {
    throw new Error('Method not implemented.');
  }
  insertAdjacentHTML(_where: InsertPosition, _html: string): void {
    throw new Error('Method not implemented.');
  }
  insertAdjacentText(_where: InsertPosition, _text: string): void {
    throw new Error('Method not implemented.');
  }
  matches(_selectors: string): boolean {
    throw new Error('Method not implemented.');
  }
  msGetRegionContent() {
    throw new Error('Method not implemented.');
  }
  releasePointerCapture(_pointerId: number): void {
    throw new Error('Method not implemented.');
  }
  removeAttribute(_qualifiedName: string): void {
    throw new Error('Method not implemented.');
  }
  removeAttributeNS(_namespace: string | null, _localName: string): void {
    throw new Error('Method not implemented.');
  }
  removeAttributeNode(_attr: Attr): Attr {
    throw new Error('Method not implemented.');
  }
  requestFullscreen(_options?: FullscreenOptions | undefined): Promise<void> {
    throw new Error('Method not implemented.');
  }
  requestPointerLock(): void {
    throw new Error('Method not implemented.');
  }
  scroll(_x?: any, _y?: any): any {
    throw new Error('Method not implemented.');
  }
  scrollBy(_x?: any, _y?: any): any {
    throw new Error('Method not implemented.');
  }
  scrollIntoView(_arg?: boolean | ScrollIntoViewOptions | undefined): void {
    throw new Error('Method not implemented.');
  }
  scrollTo(_x?: any, _y?: any): any {
    throw new Error('Method not implemented.');
  }
  setAttribute(_qualifiedName: string, _value: string): void {
    throw new Error('Method not implemented.');
  }
  setAttributeNS(_namespace: string | null, _qualifiedName: string, _value: string): void {
    throw new Error('Method not implemented.');
  }
  setAttributeNode(_attr: Attr): Attr | null {
    throw new Error('Method not implemented.');
  }
  setAttributeNodeNS(_attr: Attr): Attr | null {
    throw new Error('Method not implemented.');
  }
  setPointerCapture(_pointerId: number): void {
    throw new Error('Method not implemented.');
  }
  toggleAttribute(_qualifiedName: string, _force?: boolean | undefined): boolean {
    throw new Error('Method not implemented.');
  }
  webkitMatchesSelector(_selectors: string): boolean {
    throw new Error('Method not implemented.');
  }
  get nextElementSibling(): Element | null {
    throw new Error('Property not implemented.');
  }
  get previousElementSibling(): Element | null {
    throw new Error('Property not implemented.');
  }
  animate(
    _keyframes: Keyframe[] | PropertyIndexedKeyframes | null,
    _options?: number | KeyframeAnimationOptions | undefined,
  ): Animation {
    throw new Error('Method not implemented.');
  }
  getAnimations(): Animation[] {
    throw new Error('Method not implemented.');
  }
}
