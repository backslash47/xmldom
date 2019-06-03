export class MutationRecordImpl implements MutationRecord {
  addedNodes: NodeList;
  attributeName: string | null;
  attributeNamespace: string | null;
  nextSibling: Node | null;
  oldValue: string | null;
  previousSibling: Node | null;
  removedNodes: NodeList;
  target: Node;
  type: MutationRecordType;

  constructor(record?: MutationRecord) {
    if (record !== undefined) {
      this.addedNodes = record.addedNodes;
      this.attributeName = record.attributeName;
      this.attributeNamespace = record.attributeNamespace;
      this.nextSibling = record.nextSibling;
      this.oldValue = record.oldValue;
      this.previousSibling = record.previousSibling;
      this.removedNodes = record.removedNodes;
      this.target = record.target;
      this.type = record.type;
    }
  }
}
