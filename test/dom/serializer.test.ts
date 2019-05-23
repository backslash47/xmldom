import { expect } from 'chai';
import '../../src/index';
import { DOMParserImpl } from '../../src/parser/dom-parser';

describe('Serializer tests', () => {
  it('text node containing "]]>"', () => {
    const doc = new DOMParser().parseFromString('<test/>', 'text/xml');
    doc.documentElement.appendChild(doc.createTextNode('hello ]]> there'));
    expect(doc.documentElement.firstChild!.toString()).to.eq(
      'hello ]]> there',
      doc.documentElement.firstChild!.toString(),
    );
  });

  it('<script> element with no children', () => {
    const doc = new DOMParserImpl({ xmlns: { xmlns: 'http://www.w3.org/1999/xhtml' } }).parseFromString(
      '<html2><script></script></html2>',
      'text/html',
    );
    //console.log(doc.documentElement.firstChild.toString(true))
    expect(doc.documentElement.firstChild!.toString()).to.eq('<script xmlns="http://www.w3.org/1999/xhtml"></script>');
  });
});
