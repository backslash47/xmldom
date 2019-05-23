import { expect } from 'chai';
import { DOMParserImpl } from '../../src/parser/dom-parser';

describe('XML Error tests', () => {
  it('empty document', () => {
    const errors: string[] = [];
    const p = new DOMParserImpl({
      errorHandler: function(_key, msg) {
        errors.push(msg);
      },
    });
    p.parseFromString('', 'text/xml');

    expect(errors).to.not.have.length(0, 'empty document error unreported');
  });

  it('unclosed document', () => {
    const errors: string[] = [];
    const p = new DOMParserImpl({
      errorHandler: function(_key, msg) {
        errors.push(msg);
      },
    });
    p.parseFromString('<img>', 'text/xml');

    expect(errors).to.not.have.length(0, 'unclosed tag error unreported');
  });

  it('unclosed xml', () => {
    const errors: string[] = [];
    const p = new DOMParserImpl({
      errorHandler: function(_key, msg) {
        errors.push(msg);
      },
    });
    p.parseFromString('<img>', 'text/html');

    expect(errors).to.have.length(0, 'unclosed html tag not need report');
  });

  it('invalid xml node', () => {
    const errors: string[] = [];
    const p = new DOMParserImpl({
      errorHandler: function(_key, msg) {
        errors.push(msg);
      },
    });

    let dom = new DOMParserImpl({
      errorHandler: () => {},
    }).parseFromString('<test><!--', 'text/xml');
    expect(dom.documentElement.toString()).to.eq('<test/>');

    dom = p.parseFromString('<r', 'text/xml');
    expect(dom.documentElement.toString()).to.eq('<r/>');
  });

  it('invalid xml attribute(miss quote)', () => {
    const errors: string[] = [];
    const p = new DOMParserImpl({
      errorHandler: function(_key, msg) {
        errors.push(msg);
      },
    });

    p.parseFromString('<img attr=1/>', 'text/html');
    expect(errors).to.have.length(1, 'invalid xml attribute(miss qute)');
  });

  it('invalid xml attribute(<>&)', () => {
    const p = new DOMParserImpl({});
    const dom = p.parseFromString('<img attr="<>&"/>', 'text/html');

    expect(dom.toString()).to.eq(
      '<img attr="&lt;>&amp;" xmlns="http://www.w3.org/1999/xhtml"/>',
      'invalid xml attribute(<)',
    );
  });
});
