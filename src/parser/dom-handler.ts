import { DOMImplementationImpl } from '../dom-implementation';
import { DOMHandler, ElementAttributes, ErrorHandler, Locator, MutableDocument } from '../types';

export class DOMHandlerImpl implements DOMHandler, ErrorHandler {
  cdata: boolean;
  doc: MutableDocument;
  locator: Locator;
  currentElement: Node | null;

  constructor() {
    this.cdata = false;
    this.currentElement = null;
  }

  startDocument() {
    this.doc = new DOMImplementationImpl().createDocument(null, null, null);
    if (this.locator) {
      this.doc.documentURI = this.locator.systemId || '';
    }
  }

  startElement(namespaceURI: string, localName: string, qName: string, attrs: ElementAttributes) {
    const doc = this.doc;
    const el = doc.createElementNS(namespaceURI, qName || localName);
    const len = attrs.length;
    this.appendElement(el);
    this.currentElement = el;

    if (this.locator) {
      position(this.locator, el);
    }

    for (let i = 0; i < len; i++) {
      const attrNamespaceURI = attrs.getURI(i);
      const value = attrs.getValue(i);
      const attrQName = attrs.getQName(i);
      const attr = doc.createAttributeNS(attrNamespaceURI || null, attrQName);

      if (this.locator) {
        position(attrs.getLocator(i) || null, attr);
      }
      attr.value = attr.nodeValue = value;
      el.setAttributeNode(attr);
    }
  }
  endElement(_namespaceURI: string, _localName: string, _qName: string) {
    const current = this.currentElement;

    if (current === null) {
      throw new Error('No open element');
    }

    // const tagName = current.tagName;
    this.currentElement = current.parentNode;
  }
  startPrefixMapping(_prefix: string, _uri: string) {
    // empty
  }
  endPrefixMapping(_prefix: string) {
    // empty
  }
  processingInstruction(target: string, data: string) {
    const ins = this.doc.createProcessingInstruction(target, data);
    if (this.locator) {
      position(this.locator, ins);
    }
    this.appendElement(ins);
  }

  ignorableWhitespace(_ch: string, _start: number, _length: number) {
    // empty
  }
  characters(chars: string, start: number, length: number) {
    chars = chars.substr(start, length);

    // console.log(chars)
    if (chars) {
      let charNode;
      if (this.cdata) {
        charNode = this.doc.createCDATASection(chars);
      } else {
        charNode = this.doc.createTextNode(chars);
      }
      if (this.currentElement) {
        this.currentElement.appendChild(charNode);
      } else if (/^\s*$/.test(chars)) {
        this.doc.appendChild(charNode);
        // process xml
      }
      if (this.locator) {
        position(this.locator, charNode);
      }
    }
  }

  skippedEntity(_name: string) {
    // empty
  }
  endDocument() {
    this.doc.normalize();
  }
  setDocumentLocator(locator: Locator) {
    this.locator = locator;

    if (this.locator) {
      // && !('lineNumber' in locator)){
      locator.lineNumber = 0;
    }
  }
  // LexicalHandler
  comment(chars: string, start: number, length: number) {
    chars = chars.substr(start, length);
    const comm = this.doc.createComment(chars);

    if (this.locator) {
      position(this.locator, comm);
    }
    this.appendElement(comm);
  }

  startCDATA() {
    // used in characters() methods
    this.cdata = true;
  }
  endCDATA() {
    this.cdata = false;
  }

  startDTD(name: string, publicId: string, systemId: string) {
    const impl = this.doc.implementation;
    if (impl && impl.createDocumentType) {
      const dt = impl.createDocumentType(name, publicId, systemId);

      if (this.locator) {
        position(this.locator, dt);
      }
      this.appendElement(dt);
    }
  }

  endDTD() {
    // empty
  }

  warning(error: string) {
    // tslint:disable-next-line: no-console
    console.warn('[xmldom warning]\t' + error, _locator(this.locator));
  }
  error(error: string) {
    // tslint:disable-next-line: no-console
    console.error('[xmldom error]\t' + error, _locator(this.locator));
  }
  fatalError(error: string) {
    // tslint:disable-next-line: no-console
    console.error('[xmldom fatalError]\t' + error, _locator(this.locator));
  }

  appendElement(node: Node) {
    if (!this.currentElement) {
      this.doc.appendChild(node);
    } else {
      this.currentElement.appendChild(node);
    }
  } // appendChild and setAttributeNS are preformance key
}

function position(locator: Locator | null, node: Node) {
  if (locator) {
    node.lineNumber = locator.lineNumber;
    node.columnNumber = locator.columnNumber;
  }
}

/**
 * @see org.xml.sax.ContentHandler#startDocument
 * @link http://www.saxproject.org/apidoc/org/xml/sax/ContentHandler.html
 */

function _locator(l: Locator) {
  if (l) {
    return '\n@' + (l.systemId || '') + '#[line:' + l.lineNumber + ',col:' + l.columnNumber + ']';
  }
}
