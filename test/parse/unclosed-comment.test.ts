import { expect } from 'chai';
import { DOMParserImpl } from '../../src/parser/dom-parser';

describe('Unclosed comment tests', () => {
  it('unclosed comment', () => {
    const error: Record<string, string> = {};
    const parser = new DOMParserImpl({
      errorHandler: function(key, msg) {
        error[key] = msg;
      },
    });

    parser.parseFromString('<!--', 'text/xml');
    expect(error['error']).exist;
  });
});
