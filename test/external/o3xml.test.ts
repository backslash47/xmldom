import { expect } from 'chai';
import '../../src/index';
import { readFileSync } from 'fs';

describe('O3XML tests', () => {
  function readFile(name: string) {
    return readFileSync('test/external/' + name).toString();
  }

  function diff(a: Node, b: Node) {
    expect(a.toString()).to.eq(b.toString());
  }

  const xml = new DOMParser();

  it('test0', () => {
    const doc = xml.parseFromString(readFile('test.xml'), 'text/xml');
    const elem = doc.documentElement;
    const ref_parent = elem.childNodes[3];

    ref_parent.insertBefore(elem.childNodes[1].childNodes[3], ref_parent.childNodes[3]);
    elem.normalize();
    return diff(doc, xml.parseFromString(readFile('test0.xml'), 'text/xml'));
  });

  it('test1', () => {
    const doc = xml.parseFromString(readFile('test.xml'), 'text/xml');
    const elem = doc.documentElement;
    const ref_parent = elem.childNodes[1];

    ref_parent.insertBefore(elem.childNodes[1].childNodes[3], ref_parent.childNodes[7]);
    elem.normalize();
    return diff(doc, xml.parseFromString(readFile('test1.xml'), 'text/xml'));
  });

  it('test2', () => {
    const doc = xml.parseFromString(readFile('test.xml'), 'text/xml');
    const elem = doc.documentElement;
    const ref_parent = elem.childNodes[1];

    ref_parent.insertBefore(elem.childNodes[1].childNodes[3], ref_parent.childNodes[4]);
    elem.normalize();
    return diff(doc, xml.parseFromString(readFile('test2.xml'), 'text/xml'));
  });

  it('test3', () => {
    const doc = xml.parseFromString(readFile('test.xml'), 'text/xml');
    const elem = doc.documentElement;
    const ref_parent = elem.childNodes[1];

    ref_parent.insertBefore(doc.createElement('subtitle'), ref_parent.childNodes[7]);
    elem.normalize();
    return diff(doc, xml.parseFromString(readFile('test3.xml'), 'text/xml'));
  });

  // it('test4', () => {
  //   const elem = xml.parseFromString(readFile('test.xml')).documentElement;
  //   const ref_parent = elem.childNodes[1];

  //   expect(() => {
  //     ref_parent.insertBefore(xml.parseFromString(readFile('test.xml')).createElement('subtitle'), to.childNodes[7]);
  //   }).to.throw(Error);
  // });

  it('test5', () => {
    const doc = xml.parseFromString(readFile('test.xml'), 'text/xml');
    const elem = doc.documentElement;
    const ref_parent = elem.childNodes[3];

    ref_parent.appendChild(elem.childNodes[1].childNodes[3]);
    elem.normalize();
    return diff(doc, xml.parseFromString(readFile('test5.xml'), 'text/xml'));
  });

  it('test6', () => {
    const doc = xml.parseFromString(readFile('test.xml'), 'text/xml');
    const elem = doc.documentElement;
    const ref_parent = elem.childNodes[1];

    ref_parent.appendChild(ref_parent.childNodes[3]);
    elem.normalize();
    return diff(doc, xml.parseFromString(readFile('test6.xml'), 'text/xml'));
  });

  it('test7', () => {
    const doc = xml.parseFromString(readFile('test.xml'), 'text/xml');
    const elem = doc.documentElement;
    const ref_parent = elem.childNodes[1];

    elem.normalize();
    ref_parent.appendChild(ref_parent.childNodes[12]);
    return diff(doc, xml.parseFromString(readFile('test7.xml'), 'text/xml'));
  });

  it('test8', () => {
    const doc = xml.parseFromString(readFile('test.xml'), 'text/xml');
    const elem = doc.documentElement;
    const to = elem.childNodes[1];

    to.appendChild(doc.createElement('subtitle'));
    elem.normalize();
    return diff(doc, xml.parseFromString(readFile('test8.xml'), 'text/xml'));
  });

  it.skip('test9', () => {
    const elem = xml.parseFromString(readFile('test.xml'), 'text/xml').documentElement;
    const ref_parent = elem.childNodes[1];

    expect(() => {
      ref_parent.appendChild(xml.parseFromString(readFile('test.xml'), 'text/xml').createElement('subtitle'));
    }).to.throw(Error);
  });

  it.skip('test10', () => {
    const doc = xml.parseFromString(readFile('test.xml'), 'text/xml');
    const elem = doc.documentElement;
    const ref_parent = elem.childNodes[3];

    expect(() => {
      ref_parent.insertBefore(elem, ref_parent.childNodes[3]);
    }).to.throw(Error);
  });

  it.skip('test11', () => {
    const doc = xml.parseFromString(readFile('test.xml'), 'text/xml');
    const elem = doc.documentElement;
    const ref_parent = elem.childNodes[3];

    expect(() => {
      ref_parent.appendChild(elem);
    }).to.throw(Error);
  });

  it('test12', () => {
    const doc = xml.parseFromString(readFile('test.xml'), 'text/xml');
    const elem = doc.documentElement;
    const ref_parent = elem.childNodes[3];

    expect(() => {
      ref_parent.insertBefore(null as never, ref_parent.childNodes[3]);
    }).to.throw(Error);
  });

  it('test13', () => {
    const doc = xml.parseFromString(readFile('test.xml'), 'text/xml');
    const elem = doc.documentElement;
    const ref_parent = elem.childNodes[3];
    const child = ref_parent.removeChild(ref_parent.childNodes[3]);

    elem.normalize();
    return !child.parentNode && diff(doc, xml.parseFromString(readFile('test13.xml'), 'text/xml'));
  });

  it.skip('test14', () => {
    const doc = xml.parseFromString(readFile('test.xml'), 'text/xml');
    const elem = doc.documentElement;
    const ref_parent = elem.childNodes[3];
    const child = ref_parent.removeChild(ref_parent.childNodes[3]);

    expect(() => {
      ref_parent.removeChild(child);
    }).to.throw(Error);
  });

  it('test15', () => {
    const doc = xml.parseFromString(readFile('test.xml'), 'text/xml');
    const elem = doc.documentElement;
    const ref_parent = elem.childNodes[3];

    expect(() => {
      ref_parent.removeChild(null as never);
    }).to.throw(Error);
  });

  it('test16', () => {
    const doc = xml.parseFromString(readFile('test.xml'), 'text/xml');
    const elem = doc.getElementById('bk102')!;

    elem.normalize();

    expect(elem.parentNode!.nodeName).to.eq('catalog');
    diff(elem, xml.parseFromString(readFile('test16.xml'), 'text/xml').documentElement);
  });

  it('test17', () => {
    const doc = xml.parseFromString(readFile('test.xml'), 'text/xml');
    const elem = doc.getElementById('bk103')!;

    expect(elem).to.be.null;
  });

  it('test18', () => {
    const doc = xml.parseFromString(readFile('test.xml'), 'text/xml');
    const elems = doc.getElementsByTagName('book');
    const elem = elems[1];

    elem.normalize();

    expect(elems).to.have.length(2);
    expect(elem.parentNode!.nodeName).to.eq('catalog');
    diff(elem, xml.parseFromString(readFile('test18.xml'), 'text/xml').documentElement);
  });

  it('test19', () => {
    const doc = xml.parseFromString(readFile('test.xml'), 'text/xml');
    const elems = doc.getElementsByTagName('shelf');
    const elem = elems[0];

    expect(elems).to.have.length(0);
    expect(elem).to.be.undefined;
  });

  it('test20', () => {
    const doc = xml.parseFromString(readFile('test.xml'), 'text/xml');
    const elem = doc.documentElement.childNodes[3] as Element;

    expect(elem.getAttribute('id')).to.eq('bk102');
  });

  it('test21', () => {
    const doc = xml.parseFromString(readFile('test.xml'), 'text/xml');
    const elem = doc.documentElement.childNodes[3] as Element;

    expect(elem.getAttribute('isbn')).to.be.null;
  });

  it.skip('test22', () => {
    const doc = xml.parseFromString(readFile('test.xml'), 'text/xml');
    const elem = doc.documentElement.childNodes[3] as Element;

    expect(() => {
      elem.getAttribute('@id');
    }).to.throw(Error);
  });

  it('test23', () => {
    const doc = xml.parseFromString(readFile('test.xml'), 'text/xml');
    const elem = doc.documentElement;
    const ref_parent = elem.childNodes[3] as Element;

    ref_parent.setAttribute('id', 'bk103');
    elem.normalize();
    return diff(doc, xml.parseFromString(readFile('test23.xml'), 'text/xml'));
  });

  it('test24', () => {
    const doc = xml.parseFromString(readFile('test.xml'), 'text/xml');
    const elem = doc.documentElement;
    const ref_parent = elem.childNodes[3] as Element;

    ref_parent.setAttribute('isbn', '9783161484100');
    elem.normalize();
    return diff(doc, xml.parseFromString(readFile('test24.xml'), 'text/xml'));
  });

  it.skip('test25', () => {
    const doc = xml.parseFromString(readFile('test.xml'), 'text/xml');
    const elem = doc.documentElement.childNodes[3] as Element;

    expect(() => {
      elem.setAttribute('@id', 'bk103');
    }).to.throw(Error);
  });

  it('test26', () => {
    const doc = xml.parseFromString(readFile('test.xml'), 'text/xml');
    const attr = doc.createAttribute('isbn');

    attr.nodeValue = '9783161484100';
    expect(attr.ownerDocument).to.eq(doc);
    expect(attr.parentNode).to.be.null;
    expect(attr.nodeType).to.eq(attr.ATTRIBUTE_NODE);
    expect(attr.nodeName).to.eq('isbn');
    expect(attr.nodeValue).to.eq('9783161484100');
  });

  it('test27', () => {
    const doc = xml.parseFromString(readFile('test.xml'), 'text/xml');
    const elem = doc.documentElement;
    const ref_parent = elem.childNodes[3] as Element;
    const attr = doc.createAttribute('isbn');

    attr.nodeValue = '9783161484100';
    ref_parent.setAttributeNode(attr);
    elem.normalize();
    diff(doc, xml.parseFromString(readFile('test27.xml'), 'text/xml'));
  });

  it('test28', () => {
    const doc = xml.parseFromString(readFile('test.xml'), 'text/xml');
    const elem = doc.documentElement;
    const ref_parent = elem.childNodes[3] as Element;
    const attr = ref_parent.getAttributeNode('id')!;

    ref_parent.setAttributeNode(attr);
    elem.normalize();
    diff(doc, xml.parseFromString(readFile('test28.xml'), 'text/xml'));
  });

  it('test29', () => {
    const doc = xml.parseFromString(readFile('test.xml'), 'text/xml');
    const elem = doc.documentElement;
    const ref_parent = elem.childNodes[3] as Element;
    const attr = (elem.childNodes[1] as Element).getAttributeNode('id')!;
    (elem.childNodes[1] as Element).removeAttributeNode(attr);

    ref_parent.setAttributeNode(attr);
    elem.normalize();
    diff(doc, xml.parseFromString(readFile('test29.xml'), 'text/xml'));
  });

  it('test30', () => {
    const elem = xml.parseFromString(readFile('test.xml'), 'text/xml').documentElement;
    const ref_parent = elem.childNodes[3] as Element;

    expect(() => {
      ref_parent.setAttributeNode(xml.parseFromString(readFile('test.xml'), 'text/xml').createAttribute('subtitle'));
    }).to.throw(Error);
  });

  it('test31', () => {
    const doc = xml.parseFromString(readFile('test.xml'), 'text/xml');
    const elem = doc.createElement('element');
    const attr = doc.createAttribute('attribute');
    const text = doc.createTextNode('Lorem ipsum');
    const cdata = doc.createCDATASection('Lorem ipsum');
    const comment = doc.createComment('Lorem ipsum');

    expect(elem.nodeType).to.eq(elem.ELEMENT_NODE);
    expect(elem.nodeName).to.eq('element');
    expect(elem.parentNode).to.be.null;
    expect(attr.nodeType).to.eq(attr.ATTRIBUTE_NODE);
    expect(attr.nodeName).to.eq('attribute');
    expect(attr.parentNode).to.be.null;
    expect(text.nodeType).to.eq(text.TEXT_NODE);
    expect(text.nodeValue).to.eq('Lorem ipsum');
    expect(text.parentNode).to.be.null;
    expect(cdata.nodeType).to.eq(cdata.CDATA_SECTION_NODE);
    expect(cdata.nodeValue == 'Lorem ipsum');
    expect(cdata.parentNode).to.be.null;
    expect(comment.nodeType).to.eq(cdata.COMMENT_NODE);
    expect(comment.nodeValue).to.eq('Lorem ipsum');
    expect(comment.parentNode).to.be.null;
  });

  // XPath specific
  // it('test32', () => {
  //   const elem = xml.parseFromString(readFile('xpath.xml')).documentElement;
  //   const expected = ['Everyday Italian', 'Harry Potter', 'XQuery Kick Start', 'Learning XML'];
  //   const actual = [];
  //   const xpath = '/bookstore/book/title';

  //   const selected = elem.selectNodes(xpath);
  //   for (let i = 0; i < selected.length; i++) actual.push(selected[i].nodeValue);

  //   return check(expected, actual);
  // });

  // it('test33', () => {
  //   const elem = xml.parseFromString(readFile('xpath.xml')).documentElement;
  //   const expected = ['Everyday Italian'];
  //   const actual = [];
  //   const xpath = '/bookstore/book[1]/title';

  //   const selected = elem.selectNodes(xpath);
  //   for (let i = 0; i < selected.length; i++) actual.push(selected[i].nodeValue);

  //   return check(expected, actual);
  // });

  // it('test34', () => {
  //   const elem = xml.parseFromString(readFile('xpath.xml')).documentElement;
  //   const expected = [30.0, 29.99, 49.99, 39.95];
  //   const actual = [];
  //   const xpath = '/bookstore/book/price/text()';

  //   const selected = elem.selectNodes(xpath);
  //   for (let i = 0; i < selected.length; i++) actual.push(selected[i].nodeValue);

  //   return check(expected, actual);
  // });

  // it('test35', () => {
  //   const elem = xml.parseFromString(readFile('xpath.xml')).documentElement;
  //   const expected = [49.99, 39.95];
  //   const actual = [];
  //   const xpath = '/bookstore/book[price>35]/price ';

  //   const selected = elem.selectNodes(xpath);
  //   for (let i = 0; i < selected.length; i++) actual.push(selected[i].nodeValue);

  //   return check(expected, actual);
  // });

  // it('test36', () => {
  //   const elem = xml.parseFromString(readFile('xpath.xml')).documentElement;
  //   const expected = ['Everyday Italian', 'Harry Potter', 'XQuery Kick Start', 'Learning XML'];
  //   const actual = [];
  //   const xpath = "descendant-or-self::node()[@lang='en']";

  //   const selected = elem.selectNodes(xpath);
  //   for (let i = 0; i < selected.length; i++) actual.push(selected[i].nodeValue);

  //   return check(expected, actual);
  // });
});
