import '../types';

import { NodeFilterTS, VisibleNamespaces } from '../types';
import {
  isAttr,
  isCDATASection,
  isCharacterData,
  isComment,
  isDocument,
  isDocumentFragment,
  isDocumentType,
  isElement,
  isEntityReference,
  isProcessingInstruction,
  isText,
} from '../utils';

const htmlns = 'http://www.w3.org/1999/xhtml';

export function serializeToString(
  node: Node,
  buf: string[],
  isHTML: boolean = false,
  nodeFilter?: NodeFilterTS,
  visibleNamespaces?: VisibleNamespaces,
) {
  if (nodeFilter) {
    node = nodeFilter(node);
    if (node) {
      if (typeof node === 'string') {
        buf.push(node);
        return;
      }
    } else {
      return;
    }
    // buf.sort.apply(attrs, attributeSorter);
  }

  if (isElement(node)) {
    if (!visibleNamespaces) {
      visibleNamespaces = [];
    }
    // const startVisibleNamespaces = visibleNamespaces.length;
    const attrs = node.attributes;
    const len = attrs.length;
    let child = node.firstChild;
    const nodeName = node.tagName;

    isHTML = htmlns === node.namespaceURI || isHTML;
    buf.push('<', nodeName);

    for (let i = 0; i < len; i++) {
      // add namespaces for attributes
      const attr = attrs.item(i)!;
      if (attr.prefix === 'xmlns') {
        visibleNamespaces.push({ prefix: attr.localName, namespace: attr.value });
      } else if (attr.nodeName === 'xmlns') {
        visibleNamespaces.push({ prefix: '', namespace: attr.value });
      }
    }
    for (let i = 0; i < len; i++) {
      const attr = attrs.item(i)!;
      if (needNamespaceDefine(attr, isHTML, visibleNamespaces)) {
        const prefix = attr.prefix || '';
        const uri = attr.namespaceURI!;
        const ns = prefix ? ' xmlns:' + prefix : ' xmlns';
        buf.push(ns, '="', uri, '"');
        visibleNamespaces.push({ prefix, namespace: uri });
      }
      serializeToString(attr, buf, isHTML, nodeFilter, visibleNamespaces);
    }
    // add namespace for current node
    if (needNamespaceDefine(node, isHTML, visibleNamespaces)) {
      const prefix = node.prefix || '';
      const uri = node.namespaceURI!;
      const ns = prefix ? ' xmlns:' + prefix : ' xmlns';
      buf.push(ns, '="', uri, '"');
      visibleNamespaces.push({ prefix, namespace: uri });
    }

    if (child || (isHTML && !/^(?:meta|link|img|br|hr|input)$/i.test(nodeName))) {
      buf.push('>');
      // if is cdata child node
      if (isHTML && /^script$/i.test(nodeName)) {
        while (child) {
          if (isCharacterData(child)) {
            buf.push(child.data);
          } else {
            serializeToString(child, buf, isHTML, nodeFilter, visibleNamespaces);
          }
          child = child.nextSibling;
        }
      } else {
        while (child) {
          serializeToString(child, buf, isHTML, nodeFilter, visibleNamespaces);
          child = child.nextSibling;
        }
      }
      buf.push('</', nodeName, '>');
    } else {
      buf.push('/>');
    }
    // remove added visible namespaces
    // visibleNamespaces.length = startVisibleNamespaces;
    return;
  } else if (isDocument(node) || isDocumentFragment(node)) {
    let child = node.firstChild;
    while (child) {
      serializeToString(child, buf, isHTML, nodeFilter, visibleNamespaces);
      child = child.nextSibling;
    }
    return;
  } else if (isAttr(node)) {
    return buf.push(' ', node.name, '="', node.value.replace(/[<&"]/g, _xmlEncoder), '"');
  } else if (isText(node)) {
    return buf.push(node.data.replace(/[<&]/g, _xmlEncoder));
  } else if (isCDATASection(node)) {
    return buf.push('<![CDATA[', node.data, ']]>');
  } else if (isComment(node)) {
    return buf.push('<!--', node.data, '-->');
  } else if (isDocumentType(node)) {
    const pubid = node.publicId;
    const sysid = node.systemId;
    buf.push('<!DOCTYPE ', node.name);
    if (pubid) {
      buf.push(' PUBLIC "', pubid);
      if (sysid && sysid !== '.') {
        buf.push('" "', sysid);
      }
      buf.push('">');
    } else if (sysid && sysid !== '.') {
      buf.push(' SYSTEM "', sysid, '">');
    } else {
      const sub = node.internalSubset;
      if (sub) {
        buf.push(' [', sub, ']');
      }
      buf.push('>');
    }
    return;
  } else if (isProcessingInstruction(node)) {
    return buf.push('<?', node.target, ' ', node.data, '?>');
  } else if (isEntityReference(node)) {
    return buf.push('&', node.nodeName, ';');
  } else {
    buf.push('??', (node as Node).nodeName);
  }
}

function needNamespaceDefine(node: Element | Attr, _isHTML: boolean, visibleNamespaces: VisibleNamespaces) {
  const prefix = node.prefix || '';
  const uri = node.namespaceURI;
  if (!prefix && !uri) {
    return false;
  }
  if ((prefix === 'xml' && uri === 'http://www.w3.org/XML/1998/namespace') || uri === 'http://www.w3.org/2000/xmlns/') {
    return false;
  }

  let i = visibleNamespaces.length;
  // console.log('@@@@',node.tagName,prefix,uri,visibleNamespaces)
  while (i--) {
    const ns = visibleNamespaces[i];
    // get namespace prefix
    // console.log(node.nodeType,node.tagName,ns.prefix,prefix)
    if (ns.prefix === prefix) {
      return ns.namespace !== uri;
    }
  }
  // console.log(isHTML,uri,prefix=='')
  // if(isHTML && prefix ==null && uri == 'http://www.w3.org/1999/xhtml'){
  // 	 return false;
  // }
  // node.flag = '11111'
  // console.error(3,true,node.flag,node.prefix,node.namespaceURI)
  return true;
}

function _xmlEncoder(c: string) {
  return (
    (c === '<' && '&lt;') ||
    (c === '>' && '&gt;') ||
    (c === '&' && '&amp;') ||
    (c === '"' && '&quot;') ||
    '&#' + c.charCodeAt(0) + ';'
  );
}
