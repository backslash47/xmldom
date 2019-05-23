import { expect } from 'chai';
import '../../src/index';

describe('Element tests', () => {
  it('getElementsByTagName', () => {
    const doc = new DOMParser().parseFromString(
      '<xml xmlns="http://test.com" xmlns:t="http://test.com" xmlns:t2="http://test2.com">' +
        '<t:test/><test/><t2:test/>' +
        '<child attr="1"><test><child attr="2"/></test></child>' +
        '<child attr="3"/></xml>',
      'text/xml',
    );
    let childs = doc.documentElement.getElementsByTagName('child');
    expect(childs.item(0)!.getAttribute('attr')).to.eq('1');
    expect(childs.item(1)!.getAttribute('attr')).to.eq('2');
    expect(childs.item(2)!.getAttribute('attr')).to.eq('3');
    expect(childs).to.have.length(3);

    childs = doc.getElementsByTagName('child');
    expect(childs.item(0)!.getAttribute('attr')).to.eq('1');
    expect(childs.item(1)!.getAttribute('attr')).to.eq('2');
    expect(childs.item(2)!.getAttribute('attr')).to.eq('3');
    expect(childs).to.have.length(3);

    childs = doc.documentElement.getElementsByTagName('*');

    let buf: string[] = [];
    for (let i = 0; i < childs.length; i++) {
      buf.push(childs[i].tagName);
    }
    expect(childs).to.have.length(7, buf.toString());

    const feed = new DOMParser().parseFromString('<feed><entry>foo</entry></feed>', 'text/xml');
    const entries = feed.documentElement.getElementsByTagName('entry');
    expect(entries).to.have.length(1);
    expect(entries[0].nodeName).to.eq('entry');
    expect(feed.documentElement.childNodes.item(0).nodeName).to.eq('entry');
  });

  it('getElementsByTagNameNS', () => {
    const doc = new DOMParser().parseFromString(
      '<xml xmlns="http://test.com" xmlns:t="http://test.com" xmlns:t2="http://test2.com">' +
        '<t:test/><test/><t2:test/>' +
        '<child attr="1"><test><child attr="2"/></test></child>' +
        '<child attr="3"/></xml>',
      'text/xml',
    );

    let childs = doc.documentElement.getElementsByTagNameNS('http://test.com', '*');
    expect(childs).to.have.length(6);

    childs = doc.getElementsByTagNameNS('http://test.com', '*');
    expect(childs).to.have.length(7);

    childs = doc.documentElement.getElementsByTagNameNS('http://test.com', 'test');
    expect(childs).to.have.length(3);

    childs = doc.getElementsByTagNameNS('http://test.com', 'test');
    expect(childs).to.have.length(3);

    childs = doc.getElementsByTagNameNS('*', 'test');
    //console.log([].join.apply(childs,['\n@']))
    expect(childs).to.have.length(4);

    childs = doc.documentElement.getElementsByTagNameNS('*', 'test');
    //console.log(childs.length)
    expect(childs).to.have.length(4);
  });

  it('getElementById', () => {
    const doc = new DOMParser().parseFromString(
      '<xml xmlns="http://test.com" id="root">' +
        '<child id="a1" title="1"><child id="a2"  title="2"/></child>' +
        '<child id="a1"   title="3"/></xml>',
      'text/xml',
    );
    expect(doc.getElementById('root')).to.exist;
    expect(doc.getElementById('a1')!.getAttribute('title')).to.eq('1');
    expect(doc.getElementById('a2')!.getAttribute('title')).to.eq('2');
    expect(doc.getElementById('a2')!.getAttribute('title2')).to.be.null;
  });

  it('append exist child', () => {
    const doc = new DOMParser().parseFromString(
      '<xml xmlns="http://test.com" id="root">' +
        '<child1 id="a1" title="1"><child11 id="a2"  title="2"/></child1>' +
        '<child2 id="a1"   title="3"/><child3 id="a1"   title="3"/></xml>',
      'text/xml',
    );

    const doc1 = doc;
    const str1 = new XMLSerializer().serializeToString(doc);
    const doc2 = doc1.cloneNode(true) as Document;
    const doc3 = doc1.cloneNode(true) as Document;
    const doc4 = doc1.cloneNode(true) as Document;

    doc3.documentElement.appendChild(doc3.documentElement.lastChild!);
    doc4.documentElement.appendChild(doc4.documentElement.firstChild!);

    const str2 = new XMLSerializer().serializeToString(doc2);
    const str3 = new XMLSerializer().serializeToString(doc3);
    const str4 = new XMLSerializer().serializeToString(doc4);
    expect(str1).to.eq(str2);
    expect(str2).to.eq(str3);
    expect(str3).to.not.eq(str4);
    expect(str3.length).to.eq(str4.length);
  });

  it('append exist other child', () => {
    const doc = new DOMParser().parseFromString(
      '<xml xmlns="http://test.com" id="root">' +
        '<child1 id="a1" title="1"><child11 id="a2"  title="2"><child/></child11></child1>' +
        '<child2 id="a1"   title="3"/><child3 id="a1"   title="3"/></xml>',
      'text/xml',
    );

    const doc1 = doc;
    const str1 = new XMLSerializer().serializeToString(doc);
    const doc2 = doc1.cloneNode(true) as Document;

    expect(doc2.documentElement.lastChild!.childNodes).to.have.length(0);
    doc2.documentElement.appendChild(doc2.documentElement.firstChild!.firstChild!);

    const str2 = new XMLSerializer().serializeToString(doc2);

    expect(doc2.documentElement.lastChild!.childNodes).to.have.length(1);
    expect(str1).to.not.eq(str2);
    expect(str1.length).to.not.eq(str2.length);
    const doc3 = new DOMParser().parseFromString(str2, 'text/xml');
    doc3.documentElement.firstChild!.appendChild(doc3.documentElement.lastChild!);
    const str3 = new XMLSerializer().serializeToString(doc3);
    expect(str1).to.eq(str3);
  });

  it('set textContent', () => {
    const doc = new DOMParser().parseFromString('<test><a/><b><c/></b></test>', 'text/xml');
    const a = doc.documentElement.firstChild!;
    const b = a.nextSibling!;
    a.textContent = 'hello';
    expect(doc.documentElement.toString()).to.eq('<test><a>hello</a><b><c/></b></test>');
    b.textContent = 'there';
    expect(doc.documentElement.toString()).to.eq('<test><a>hello</a><b>there</b></test>');
    b.textContent = '';
    expect(doc.documentElement.toString()).to.eq('<test><a>hello</a><b/></test>');
    doc.documentElement.textContent = 'bye';
    expect(doc.documentElement.toString()).to.eq('<test>bye</test>');
  });
});
