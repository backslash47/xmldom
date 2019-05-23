import { expect } from 'chai';
import '../../src/index';
import { XMLSerializerImpl } from '../../src/serializer/xml-serializer';

describe('Clone tests', () => {
  it('clone', () => {
    const doc1 = new DOMParser().parseFromString(
      "<doc1 attr1='1' attr2='a2'>text1<child>text2</child></doc1>",
      'text/xml',
    );
    const doc1s = new XMLSerializerImpl().serializeToString(doc1);
    const n = doc1.cloneNode(true);
    expect(n.toString()).to.eq(doc1s.toString(), doc1s.toString());
  });

  it('import', () => {
    const doc1 = new DOMParser().parseFromString("<doc2 attr='2'/>", 'text/xml');
    const doc2 = new DOMParser().parseFromString(
      "<doc1 attr1='1' attr2='a2'>text1<child>text2</child></doc1>",
      'text/xml',
    );

    const doc3 = new DOMParser().parseFromString(
      "<doc2 attr='2'><doc1 attr1='1' attr2='a2'>text1<child>text2</child></doc1></doc2>",
      'text/xml',
    );
    const n = doc1.importNode(doc2.documentElement, true);
    doc1.documentElement.appendChild(n);
    expect(doc1.toString()).to.eq(doc3.toString());
    expect(doc2.toString()).to.not.eq(doc3.toString());
  });
});
