import { expect } from 'chai';
import { NodeImpl } from '../../src/node';
import { XMLSerializerImpl } from '../../src/serializer/xml-serializer';

describe('Node parse tests', () => {
  it('element test', () => {
    const dom = new DOMParser().parseFromString('<xml><child/></xml>', 'text/xml');
    expect(dom.childNodes).to.have.length(1);
    expect(dom.documentElement.childNodes).to.have.length(1);
    expect(dom.documentElement.tagName).to.eq('xml');
    expect((dom.documentElement.firstChild as Element).tagName).to.eq('child');
  });

  it('text test', () => {
    const dom = new DOMParser().parseFromString('<xml>start center end</xml>', 'text/xml');
    const root = dom.documentElement;
    expect((root.firstChild as Text).data).eq('start center end');
    expect(root.firstChild!.nextSibling == null);
  });

  it('cdata test', () => {
    const dom = new DOMParser().parseFromString(
      '<xml>start <![CDATA[<encoded>]]> end<![CDATA[[[[[[[[[]]]]]]]]]]></xml>',
      'text/xml',
    );
    const root = dom.documentElement;
    expect((root.firstChild as Text).data).eq('start ');
    expect((root.firstChild!.nextSibling as CDATASection).data).eq('<encoded>');
    expect((root.firstChild!.nextSibling!.nextSibling!.nextSibling as CDATASection).data).eq('[[[[[[[[]]]]]]]]');
  });

  it('cdata empty', () => {
    const dom = new DOMParser().parseFromString('<xml><![CDATA[]]>start <![CDATA[]]> end</xml>', 'text/xml');
    const root = dom.documentElement;
    expect(root.textContent).to.eq('start  end');
  });

  it('comment', () => {
    const dom = new DOMParser().parseFromString('<xml><!-- comment&>< --></xml>', 'text/xml');
    const root = dom.documentElement;
    expect(root.firstChild!.nodeValue).to.eq(' comment&>< ');
  });

  it('cdata comment', () => {
    const dom = new DOMParser().parseFromString(
      '<xml>start <![CDATA[<encoded>]]> <!-- comment -->end</xml>',
      'text/xml',
    );
    const root = dom.documentElement;
    expect(root.firstChild!.nodeValue).to.eq('start ');
    expect(root.firstChild!.nextSibling!.nodeValue).to.eq('<encoded>');
    expect(root.firstChild!.nextSibling!.nextSibling!.nextSibling!.nodeValue).to.eq(' comment ');
    expect(root.firstChild!.nextSibling!.nextSibling!.nextSibling!.nextSibling!.nodeValue).to.eq('end');
  });

  it('append node', () => {
    const dom = new DOMParser().parseFromString('<xml/>', 'text/xml');
    const child = dom.createElement('child');
    expect(child).to.eq(dom.documentElement.appendChild(child));
    expect(child).to.eq(dom.documentElement.firstChild);
    const fragment = dom.createDocumentFragment();
    expect(child).to.eq(fragment.appendChild(child));
  });

  it('insert node', () => {
    const dom = new DOMParser().parseFromString('<xml><child/></xml>', 'text/xml');
    const node = dom.createElement('sibling');
    const child = dom.documentElement.firstChild!;
    child.parentNode!.insertBefore(node, child);
    expect(node).to.eq(child.previousSibling);
    expect(node.nextSibling).to.eq(child);
    expect(node.parentNode).to.eq(child.parentNode);
  });

  it('insert fragment', () => {
    const dom = new DOMParser().parseFromString('<xml><child/></xml>', 'text/xml');
    const fragment = dom.createDocumentFragment();
    expect(fragment.nodeType).to.eq(NodeImpl.DOCUMENT_FRAGMENT_NODE);

    const first = fragment.appendChild(dom.createElement('first'));
    const last = fragment.appendChild(dom.createElement('last'));
    expect(fragment.firstChild).to.eq(first);
    expect(fragment.lastChild).to.eq(last);
    expect(last.previousSibling).to.eq(first);
    expect(first.nextSibling).to.eq(last);

    const child = dom.documentElement.firstChild!;
    child.parentNode!.insertBefore(fragment, child);
    expect(last.previousSibling).to.eq(first);
    expect(first.nextSibling).to.eq(last);
    expect(child.parentNode!.firstChild).to.eq(first);
    expect(last).to.eq(child.previousSibling);
    expect(last.nextSibling).to.eq(child);
    expect(first.parentNode).to.eq(child.parentNode);
    expect(last.parentNode).to.eq(child.parentNode);
  });

  it('instruction', () => {
    const source = '<?xml version="1.0"?><root><child>&amp;<!-- &amp; --></child></root>';
    const doc = new DOMParser().parseFromString(source, 'text/xml');
    const source2 = new XMLSerializerImpl().serializeToString(doc);
    expect(source).to.eq(source2);
  });
});
