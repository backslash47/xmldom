import { DummyCDATASection } from './dummy/dummy-cdata-section';
import { NodeTypeTS } from './node-types';

export class CDATASectionImpl extends DummyCDATASection {
  ownerDocument: Document;
  
  constructor() {
    super();
    this.nodeName = '#cdata-section';
    this.nodeType = NodeTypeTS.CDATA_SECTION_NODE;
  }
}
