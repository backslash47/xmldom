import { expect } from 'chai';
import '../../src/index';
import { DOMExceptionImpl } from '../../src/dom-exception';

describe('Attr tests', () => {
  it('set attribute', () => {
    const root = new DOMParser().parseFromString('<xml/>', 'text/xml').documentElement;
    root.setAttribute('a', '1');

    expect(root.attributes[0].localName).to.be.eq('a');

    root.setAttribute('b', '2');
    root.setAttribute('a', '1');
    root.setAttribute('a', '1');
    root.setAttribute('a', '1');

    expect(root.attributes).to.have.length(2);

    expect(() => {
      const c = root.ownerDocument!.createElement('c');
      c.setAttributeNode(root.attributes.item(0)!);
    })
      .to.throw(DOMExceptionImpl)
      .that.has.property('code', 10);
  });

  it('set ns attribute', () => {
    const root = new DOMParser().parseFromString("<xml xmlns:a='a' xmlns:b='b' xmlns='e'><child/></xml>", 'text/xml')
      .documentElement;
    const child = root.firstChild as Element;
    child.setAttributeNS('a', 'a:a', '1');
    child.setAttributeNS('b', 'b:b', '2');
    child.setAttributeNS('b', 'b:a', '1');

    expect(child.attributes).to.have.length(3, String(child.attributes.length));

    child.setAttribute('a', '1');
    child.setAttributeNS('b', 'b:b', '2');

    expect(child.attributes).to.have.length(4, String(child.attributes.length));

    expect(() => {
      const c = root.ownerDocument!.createElement('c');
      c.setAttributeNodeNS(root.attributes.item(0)!);
    })
      .to.throw(DOMExceptionImpl)
      .that.has.property('code', 10);
  });

  it('override attribute', () => {
    const root = new DOMParser().parseFromString("<xml xmlns:a='a' xmlns:b='b' xmlns='e'><child/></xml>", 'text/xml')
      .documentElement;
    root.setAttributeNS('a', 'a:a', '1');

    expect(root.attributes).to.have.length(4, String(root.attributes.length));
  });

  it('attribute namespace', () => {
    const root = new DOMParser().parseFromString("<xml xmlns:a='a' xmlns:b='b' a:b='e'></xml>", 'text/xml')
      .documentElement;

    expect(root.getAttributeNS('a', 'b')).to.be.eq('e');
  });
});
