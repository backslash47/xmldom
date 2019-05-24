import '../types';

import { NodeImpl } from '../node';

export abstract class DummyAttr extends NodeImpl implements Attr {
  abstract value: string;
  abstract name: string;
  abstract localName: string;
  abstract ownerElement: Element | null;
  abstract specified: boolean;
}
