import '../types';
import { NodeFilterTS } from '../types';

export class XMLSerializerImpl implements XMLSerializer {
  serializeToString(node: Node, isHtml?: boolean, nodeFilter?: NodeFilterTS) {
    return node.toString(isHtml, nodeFilter);
  }
}
