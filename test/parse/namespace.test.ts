import { expect } from 'chai';
import '../../src/index';

describe('Namespace parse tests', () => {
  it('default namespace', () => {
    const dom = new DOMParser().parseFromString('<xml xmlns="http://test.com"><child attr="1"/></xml>', 'text/xml');
    const root = dom.documentElement;
    expect(root.namespaceURI).to.eq('http://test.com');
    expect(root.lookupNamespaceURI('')).to.eq('http://test.com');
    expect(root.firstChild!.namespaceURI).to.eq('http://test.com');
    expect(root.firstChild!.lookupNamespaceURI('')).to.eq('http://test.com');
    expect((root.firstChild! as Element).getAttributeNode('attr')!.namespaceURI).to.be.null;
  });

  it('prefix namespace', () => {
    const dom = new DOMParser().parseFromString(
      '<xml xmlns:p1="http://p1.com" xmlns:p2="http://p2.com"><p1:child a="1" p1:attr="1" b="2"/><p2:child/></xml>',
      'text/xml',
    );
    const root = dom.documentElement;
    expect(root.firstChild!.namespaceURI).to.eq('http://p1.com');
    expect(root.lookupNamespaceURI('p1')).to.eq('http://p1.com');
    expect((root.firstChild! as Element).getAttributeNode('attr')).to.be.null;
    expect((root.firstChild! as Element).getAttributeNode('p1:attr')!.namespaceURI).to.eq('http://p1.com');
    expect(root.firstChild!.nextSibling!.namespaceURI).to.eq('http://p2.com');
    expect(root.firstChild!.nextSibling!.lookupNamespaceURI('p2')).to.eq('http://p2.com');
  });

  it('after prefix namespace', () => {
    const dom = new DOMParser().parseFromString(
      '<xml xmlns:p="http://test.com"><p:child xmlns:p="http://p.com"/><p:child/></xml>',
      'text/xml',
    );
    const root = dom.documentElement;
    expect(root.firstChild!.namespaceURI).to.eq('http://p.com');
    expect(root.lastChild!.namespaceURI).to.eq('http://test.com');
    expect(root.firstChild!.nextSibling!.lookupNamespaceURI('p')).to.eq('http://test.com');
  });
});
