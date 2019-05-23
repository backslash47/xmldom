import { expect } from 'chai';
import '../../src/index';
import { DOMParserImpl } from '../../src/parser/dom-parser';

describe('Simple parse tests', () => {
  let inc = 0;
  const domErrorHandler = function(_level: string, _str: string) {
    if (inc++ > 120) throw new Error();
  };

  it('simple', () => {
    const parser = new DOMParser();
    const s = '<html xmlns="http://www.w3.org/1999/xhtml"><body title="1<2"></body></html>';
    const doc = parser.parseFromString(s, 'text/html');
    expect(doc.toString()).to.eq(s.replace('<2', '&lt;2'));
  });

  it('unclosedFix', () => {
    const parser = new DOMParser();
    const fileContents = '<r><Page><Label /></Page  <Page></Page></r>';
    const expected = '<r><Page><Label/></Page>  <Page/></r>';
    const dom = parser.parseFromString(fileContents, 'text/xml');
    expect(dom.toString()).to.eq(expected);
  });

  it('test', () => {
    const parser = new DOMParser();
    const fileContents = '<Page><Label class="title"/></Page  1';
    const dom = parser.parseFromString(fileContents, 'text/xml');
    expect(dom.toString() + '$').to.eq(fileContents.replace(/\s+1$/, '') + '>  1$');
  });

  it('svg test', () => {
    const svgCase = [
      '<svg>',
      '  <metadata>...</metadata>',
      '  <defs id="defs14">',
      '  <path id="path4" d="M 68.589358,...-6.363961,-6.363964 z" />',
      '  <path id="path4" d="M 68.589358,...-6.363961,-6.363964 z" /></defs>',
      '</svg>',
    ].join('\n');
    const parser = new DOMParserImpl({ locator: {}, errorHandler: domErrorHandler });
    const dom = parser.parseFromString(svgCase, 'text/xml');
    expect(dom.toString()).to.eq(svgCase.replace(/ \/>/g, '/>'));
  });

  it.skip('line error', () => {
    const xmlLineError = [
      '<package xmlns="http://ns.saxonica.com/xslt/export"',
      '         xmlns:fn="http://www.w3.org/2005/xpath-functions"',
      '         xmlns:xs="http://www.w3.org/2001/XMLSchema"',
      '         xmlns:vv="http://saxon.sf.net/generated-variable"',
      '         version="20"',
      '         packageVersion="1">',
      '  <co id="0" binds="1">',
      '</package>',
    ].join('\r\n');

    const parser = new DOMParserImpl({ locator: {}, errorHandler: domErrorHandler });
    const dom = parser.parseFromString(xmlLineError, 'text/xml');
    const node = dom.documentElement.firstChild!.nextSibling!;
    expect(node.lineNumber).to.eq(7);
  });
});
