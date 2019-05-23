import { DummyComment } from './dummy/dummy-comment';
import { NodeTypeTS } from './node-types';

export class CommentImpl extends DummyComment {
  constructor() {
    super();
    this.nodeName = '#comment';
    this.nodeType = NodeTypeTS.COMMENT_NODE;
  }
}
