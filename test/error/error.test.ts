import { expect } from 'chai';
import '../../src/index';
import { DOMParserImpl } from '../../src/parser/dom-parser';

describe('Error tests', () => {
  it('error function', () => {
    const error: string[] = [];
    const parser = new DOMParserImpl({
      locator: {},
      errorHandler: {
        error: function(msg) {
          error.push(msg);
          throw new Error(msg);
        },
      },
    });
    parser.parseFromString('<html><body title="1<2"><table>&lt;;test</body></html>', 'text/html');

    expect(() => {
      parser.parseFromString('<html><body title="1<2"><table>&lt;;test</body></body></html>', 'text/html');
    }).to.throw(Error);
    expect(error.join(' ')).to.match(/\n@#\[line\:\d+,col\:\d+\]/, 'line,col must record:' + error);
  });

  it('only function two args', () => {
    const error: Record<string, string> = {};
    const parser = new DOMParserImpl({
      errorHandler: function(key, msg) {
        error[key] = msg;
      },
    });

    expect(() => {
      parser.parseFromString('<html disabled></body><1 1="2"/></html>', 'text/xml');
    }).to.throw(Error);

    expect(error['warning']).exist;
    expect(error['error']).exist;
    expect(error['fatalError']).exist;
  });

  it('only function1', () => {
    const error: string[] = [];
    const parser = new DOMParserImpl({
      errorHandler: function(msg) {
        error.push(msg);
      },
    });

    expect(() => {
      parser.parseFromString('<html disabled></body><1 1="2"/></html>', 'text/xml');
    }).to.throw(Error);

    const errors = error.join(' ');
    expect(errors.includes('xmldom:warning'));
    expect(errors.includes('xmldom:error'));
    expect(errors.includes('xmldom:fatalError'));
  });

  it('only function2', () => {
    const error: string[] = [];
    const errorMap: Record<string, string[]> = {};
    new DOMParserImpl({
      errorHandler: function(msg) {
        error.push(msg);
      },
    }).parseFromString('<html><body title="1<2">test</body></html>', 'text/xml');

    const errorHandler: Record<string, any> = {};
    ['warning', 'error', 'fatalError'].forEach(function(k) {
      errorMap[k] = [];
      errorHandler[k] = function(msg: string) {
        errorMap[k].push(msg);
      };
    });

    new DOMParserImpl({ errorHandler: errorHandler }).parseFromString(
      '<html><body title="1<2">test</body></html>',
      'text/xml',
    );

    let error2: string[] = [];
    for (const n in errorMap) {
      error2 = error2.concat(errorMap[n]);
      //console.assert(error.length == errorMap[n].length)
    }

    expect(error2.sort().join(',')).to.eq(error.sort().join(','));
  });
});
