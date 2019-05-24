import '../types';

import { NodeImpl } from '../node';

export class DummyDocumentType extends NodeImpl implements DocumentType {
  get name(): string {
    throw new Error('Property not implemented.');
  }
  get publicId(): string {
    throw new Error('Property not implemented.');
  }
  get systemId(): string {
    throw new Error('Property not implemented.');
  }

  get internalSubset(): string {
    throw new Error('Property not implemented.');
  }
}
