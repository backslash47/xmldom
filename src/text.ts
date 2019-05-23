import { DummyText } from './dummy/dummy-text';
import { NodeTypeTS } from './node-types';

export class TextImpl extends DummyText {
  constructor() {
    super();
    this.nodeName = '#text';
    this.nodeType = NodeTypeTS.TEXT_NODE;
  }

  splitText(offset: number) {
    let text = this.data;
    const newText = text.substring(offset);
    text = text.substring(0, offset);
    this.data = this.nodeValue = text;
    this.length = text.length;
    const newNode = this.ownerDocument.createTextNode(newText);
    if (this.parentNode) {
      this.parentNode.insertBefore(newNode, this.nextSibling);
    }
    return newNode;
  }
}
