import { expect } from 'chai';
import '../../src/index';
import { DOMParserImpl } from '../../src/parser/dom-parser';

describe('Namespace tests', () => {
  it('testlitecns', () => {
    const doc = new DOMParserImpl({
      xmlns: { c: 'http://www.xidea.org/lite/core', '': 'http://www.w3.org/1999/xhtml' },
    }).parseFromString('<html><body><c:var name="a" value="${1}"/></body></html>', 'text/xml');

    const el = doc.getElementsByTagName('c:var')[0];
    expect(el.namespaceURI).to.eq('http://www.xidea.org/lite/core');
    expect(String(doc)).to.eq(
      '<html xmlns="http://www.w3.org/1999/xhtml"><body><c:var name="a" value="${1}" xmlns:c="http://www.xidea.org/lite/core"></c:var></body></html>',
    );
  });

  it('test', () => {
    // Just for debugging
    const w3 = 'http://www.w3.org/1999/xhtml';
    const n1 = 'http://www.frankston.com/public';
    const n2 = 'http://rmf.vc/n2';
    const hx = '<html test="a" xmlns="' + w3 + '" xmlns:rmf="' + n1 + '"><rmf:foo hello="asdfa"/></html>';

    const doc = new DOMParser().parseFromString(hx, 'text/xml');
    //console.log(de.prefix,de.getAttributeNode('xmlns').prefix)
    const els = Array.from(doc.documentElement.getElementsByTagNameNS(n1, 'foo'));
    for (let _i = 0, els_1 = els; _i < els_1.length; _i++) {
      const el = els_1[_i];

      let te = doc.createElementNS(n1, 'test');
      te.setAttributeNS(n1, 'bar', 'valx');
      te = doc.createElementNS(n1, 'test');
      te.setAttributeNS(n1, 'bar', 'valx');
      //console.log("New Elm: " + ss(te));
      expect(te.toString()).to.eq('<test xmlns="' + n1 + '" bar="valx"/>');
      el.appendChild(te);
      const tx = doc.createElementNS(n2, 'test');
      tx.setAttributeNS(n2, 'bar', 'valx');
      //console.log("New Elm: " + String(tx));
      expect(tx.toString()).to.eq('<test xmlns="' + n2 + '" bar="valx"/>');
      el.appendChild(tx);
    }
  });
});
