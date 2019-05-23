import { expect } from 'chai';
import { DOMParserImpl } from '../../src/parser/dom-parser';

describe('Locator parse tests', () => {
  function assertPosition(n: Node, line: number, col: number, info: string) {
    expect(n.lineNumber).to.eq(line, 'lineNumber:' + n.lineNumber + '/' + line + '\n@' + info);
    expect(n.columnNumber).to.eq(col, 'columnNumber:' + n.columnNumber + '/' + col + '\n@' + info);
  }

  it.skip('empty line number', () => {
    const xml = [
      '<scxml xmlns="http://www.w3.org/2005/07/scxml" version="1.0"',
      '       profile="ecmascript" id="scxmlRoot" initial="start">',
      '',
      '  <!--',
      '      some comment (next line is empty)',
      '',
      '  -->',
      '',
      '  <state id="start" name="start">',
      '    <transition event"init" name="init" target="main_state" />',
      '  </state>',
      '',
      '  </scxml>',
    ].join('\n');
    const parser = new DOMParserImpl({ locator: {} });
    const doc = parser.parseFromString(xml, 'text/xml');
    const trans = doc.getElementsByTagName('transition')[0];

    expect(trans.lineNumber).to.eq(10);
  });

  it.skip('node positions', () => {
    const parser = new DOMParserImpl({ locator: {} });
    const doc = parser.parseFromString(
      '<?xml version="1.0"?><!-- aaa -->\n' + '<test>\n' + '  <a attr="value"><![CDATA[1]]>something\n</a>x</test>',
      'text/xml',
    );
    const test = doc.documentElement;
    const a = test.firstChild!.nextSibling!;
    assertPosition(doc.firstChild!, 1, 1, 'first child');
    assertPosition(doc.firstChild!.nextSibling!, 1, 1 + '<?xml version="1.0"?>'.length, 'first child nextSibling');
    assertPosition(test, 2, 1, 'document element' + test);
    assertPosition(a, 3, 3, 'documentElement firstchild nextSibling' + a);
    assertPosition(a.firstChild!, 3, 19, 'a.firstchild');
    assertPosition(a.firstChild!.nextSibling!, 3, 19 + '<![CDATA[1]]>'.length, 'a.firstchild.nextsibling');
    assertPosition(test.lastChild!, 4, 5, 'test.lastChild');
  });

  it('error positions', () => {
    const error: string[] = [];
    const parser = new DOMParserImpl({
      locator: { systemId: 'c:/test/1.xml' },
      errorHandler: {
        error: function(msg) {
          error.push(msg);
        },
      },
    });
    const xml = '<html><body title="1<2"><table>&lt;;test</body></body></html>';
    const doc = parser.parseFromString(xml, 'text/html');
    const attr = (doc.documentElement.firstChild! as Element).attributes.item(0)!;
    assertPosition(attr, 1, 19, 'title="1<2 ');
  });

  it.skip('error positions p', () => {
    const error: string[] = [];
    const parser = new DOMParserImpl({
      locator: {},
      errorHandler: function(msg) {
        error.push('@@' + msg);
      },
    });
    parser.parseFromString('<root>\n\t<err</root>', 'text/html');

    console.assert(/\n@#\[line\:2,col\:2\]/.test(error.join(' ')), 'line,col must record:' + error);
  });
});
