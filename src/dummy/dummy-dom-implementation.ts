export class DummyDOMIMplementation implements DOMImplementation {
  createDocument(_namespaceURI: string | null, _qualifiedName: string | null, _doctype: DocumentType | null): Document {
    throw new Error('Method not implemented.');
  }
  createDocumentType(_qualifiedName: string, _publicId: string, _systemId: string): DocumentType {
    throw new Error('Method not implemented.');
  }
  createHTMLDocument(_title?: string | undefined): Document {
    throw new Error('Method not implemented.');
  }
  hasFeature(..._args: any[]): true {
    throw new Error('Method not implemented.');
  }
}
