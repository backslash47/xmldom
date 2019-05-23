import { DummyEntityReference } from './dummy/dummy-entity-reference';
import { NodeTypeTS } from './node-types';

export class EntityReferenceImpl extends DummyEntityReference {
  constructor() {
    super();
    this.nodeType = NodeTypeTS.ENTITY_REFERENCE_NODE;
  }
}
