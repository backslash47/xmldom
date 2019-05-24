import './types';

import { DocumentImpl } from './document';
import { DocumentTypeImpl } from './document-type';
import { DummyDOMIMplementation } from './dummy/dummy-dom-implementation';
import { NodeListOfImpl } from './node-list-of';

/**
 * @see http://www.w3.org/TR/REC-DOM-Level-1/level-one-core.html#ID-102161490
 */
export class DOMImplementationImpl extends DummyDOMIMplementation {
  _features: Record<string, any>;

  constructor(features?: Record<string, any>) {
    super();

    this._features = {};
    if (features) {
      for (const feature of Object.keys(features)) {
        this._features = features[feature];
      }
    }
  }

  hasFeature(feature: string, version: string): true {
    const versions = this._features[feature.toLowerCase()];
    if (versions && (!version || version in versions)) {
      return true;
    } else {
      return false as true; // because this call is really deprecated in modern DOM
    }
  }
  // Introduced in DOM Level 2:
  createDocument(namespaceURI: string | null, qualifiedName: string | null, doctype: DocumentType | null) {
    // raises:INVALID_CHARACTER_ERR,NAMESPACE_ERR,WRONG_DOCUMENT_ERR
    const doc = new DocumentImpl();
    doc.implementation = this;
    doc.childNodes = new NodeListOfImpl();
    doc.doctype = doctype;
    if (doctype) {
      doc.appendChild(doctype);
    }
    if (namespaceURI && qualifiedName) {
      const root = doc.createElementNS(namespaceURI, qualifiedName);
      doc.appendChild(root);
    }
    return doc;
  }

  createDocumentType(qualifiedName: string, publicId: string, systemId: string) {
    // raises:INVALID_CHARACTER_ERR,NAMESPACE_ERR
    const node = new DocumentTypeImpl();
    node.name = qualifiedName;
    node.nodeName = qualifiedName;
    node.publicId = publicId;
    node.systemId = systemId;
    // Introduced in DOM Level 2:
    // readonly attribute DOMString        internalSubset;

    // TODO:..
    //  readonly attribute NamedNodeMap     entities;
    //  readonly attribute NamedNodeMap     notations;
    return node;
  }
}
