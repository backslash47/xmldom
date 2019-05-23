import { expect } from 'chai';
import '../../src/index';

describe('Document tests', () => {
  it('getElementsByTagName', () => {
    const doc = new DOMParser().parseFromString('<a><b/></a>', 'text/xml');

    expect(doc.getElementsByTagName('*')).to.have.length(2);
    expect(doc.documentElement.getElementsByTagName('*')).to.have.length(1);
  });
});
