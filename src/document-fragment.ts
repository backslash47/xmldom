import { DummyDocumentFragment } from './dummy/dummy-document-fragment';
import { NodeTypeTS } from './node-types';

export class DocumentFragmentImpl extends DummyDocumentFragment {
  constructor() {
    super();
    this.nodeName = '#document-fragment';
    this.nodeType = NodeTypeTS.DOCUMENT_FRAGMENT_NODE;
  }
}
