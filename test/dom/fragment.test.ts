import { expect } from 'chai';
import '../../src/index';

describe('Fragment tests', () => {
  it('append empty fragment', () => {
    const document = new DOMParser().parseFromString('<p id="p"/>', 'text/xml');
    const fragment = document.createDocumentFragment();
    document.getElementById('p')!.insertBefore(fragment, null);
    fragment.appendChild(document.createTextNode('a'));
    document.getElementById('p')!.insertBefore(fragment, null);
    expect(document.toString()).to.eq('<p id="p">a</p>', document.toString());
  });
});
