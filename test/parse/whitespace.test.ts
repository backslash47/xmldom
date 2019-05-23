import { expect } from 'chai';
import '../../src/index';

describe('Whitespace parse tests', () => {
  it('unclosed tag', () => {
    new DOMParser().parseFromString('<foo', 'text/xml');
  });

  it('document source', () => {
    const testSource = '<?xml version="1.0"?>\n<!--test-->\n<xml/>';
    const dom = new DOMParser().parseFromString(testSource, 'text/xml');
    expect(new XMLSerializer().serializeToString(dom)).to.eq(testSource);
  });

  it.skip('test', () => {
    const description = '<p>populaciji (< 0.1%), te se</p>';
    new DOMParser().parseFromString(description, 'text/html');
  });
});
