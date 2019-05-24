import '../types';

import { NodeImpl } from '../node';

export class DummyDocumentFragment extends NodeImpl implements DocumentFragment {
  getElementById(_elementId: string): HTMLElement | null {
    throw new Error('Method not implemented.'); // todo: might be easy to implement
  }
}
