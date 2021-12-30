import { DummyDocumentFragment } from './dummy/dummy-document-fragment';
import { NodeTypeTS } from './node-types';
import { isProcessingInstruction, isComment } from './utils';

export class DocumentFragmentImpl extends DummyDocumentFragment {
  ownerDocument: Document;
  
  constructor() {
    super();
    this.nodeName = '#document-fragment';
    this.nodeType = NodeTypeTS.DOCUMENT_FRAGMENT_NODE;
  }

  get textContent() {
    let node: Node | null = this;

    const buf: string[] = [];
    node = node.firstChild;
    while (node) {
      if (!isProcessingInstruction(node) && !isComment(node)) {
        const content = node.textContent;

        if (content != null) {
          buf.push(content);
        }
      }
      node = node.nextSibling;
    }
    return buf.join('');
  }

  set textContent(data: string | null) {
    while (this.firstChild) {
      this.removeChild(this.firstChild);
    }
    if (data) {
      this.appendChild(this.ownerDocument.createTextNode(data));
    }
  }
}
