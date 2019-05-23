import { DummyDocumentType } from './dummy/dummy-document-type';
import { NodeTypeTS } from './node-types';

export class DocumentTypeImpl extends DummyDocumentType {
  name: string;
  publicId: string;
  // Introduced in DOM Level 2:
  systemId: string;
  internalSubset: string;

  constructor() {
    super();
    this.nodeType = NodeTypeTS.DOCUMENT_TYPE_NODE;
  }
}
