import '../types';

import { NodeImpl } from '../node';

export abstract class DummyDocumentFragment extends NodeImpl implements DocumentFragment {
  abstract ownerDocument: Document;

  getElementById(_elementId: string): HTMLElement | null {
    throw new Error('Method not implemented.'); // todo: might be easy to implement
  }
}
