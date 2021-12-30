import '../types';

import { NodeImpl } from '../node';

export abstract class DummyDocumentType extends NodeImpl implements DocumentType {
  abstract ownerDocument: Document;

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
