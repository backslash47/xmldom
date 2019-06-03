import '../../src/index';

import { expect } from 'chai';

describe('Mutation observer tests', () => {
  function observerHelper() {
    const records: MutationRecord[] = [];
    const observer = new MutationObserver((rs) => {
      records.push(...rs);
    });

    return { records, observer };
  }

  it('new attribute', async () => {
    const root = new DOMParser().parseFromString('<xml/>', 'text/xml').documentElement;
    const { records, observer } = observerHelper();
    observer.observe(root, { attributes: true, attributeOldValue: true });
    root.setAttribute('a', '1');

    await Promise.resolve();

    expect(records).to.have.length(1);
    expect(records[0].type).to.eq('attributes');
    expect(records[0].attributeName).to.eq('a');
  });

  it('attribute change', async () => {
    const root = new DOMParser().parseFromString('<xml/>', 'text/xml').documentElement;
    const { records, observer } = observerHelper();
    root.setAttribute('a', '1');
    observer.observe(root, { attributes: true, attributeOldValue: true });
    root.setAttribute('a', '2');

    await Promise.resolve();

    expect(records).to.have.length(1);
    expect(records[0].type).to.eq('attributes');
    expect(records[0].attributeName).to.eq('a');
    expect(records[0].oldValue).to.eq('1');
  });

  it('attribute remove', async () => {
    const root = new DOMParser().parseFromString('<xml/>', 'text/xml').documentElement;
    const { records, observer } = observerHelper();
    root.setAttribute('a', '1');
    observer.observe(root, { attributes: true, attributeOldValue: true });
    root.removeAttribute('a');

    await Promise.resolve();

    expect(records).to.have.length(1);
    expect(records[0].type).to.eq('attributes');
    expect(records[0].attributeName).to.eq('a');
    expect(records[0].oldValue).to.eq('1');
  });

  it('text change', async () => {
    const root = new DOMParser().parseFromString('<xml/>', 'text/xml').documentElement;
    const { records, observer } = observerHelper();

    const node = root.ownerDocument!.createTextNode('1');
    root.appendChild(node);

    observer.observe(node, { characterData: true, characterDataOldValue: true });
    node.data = '2';

    await Promise.resolve();

    expect(records).to.have.length(1);
    expect(records[0].type).to.eq('characterData');
    expect(records[0].oldValue).to.eq('1');
  });

  it('text node add', async () => {
    const root = new DOMParser().parseFromString('<xml/>', 'text/xml').documentElement;
    const { records, observer } = observerHelper();
    observer.observe(root, { childList: true });

    const node = root.ownerDocument!.createTextNode('1');
    root.appendChild(node);

    await Promise.resolve();

    expect(records).to.have.length(1);
    expect(records[0].type).to.eq('childList');
    expect(records[0].addedNodes).to.have.length(1);
    expect(records[0].addedNodes[0]).to.eq(node);
  });

  it('element node add', async () => {
    const root = new DOMParser().parseFromString('<xml/>', 'text/xml').documentElement;
    const { records, observer } = observerHelper();
    observer.observe(root, { childList: true });

    const node = root.ownerDocument!.createElement('div');
    root.appendChild(node);

    await Promise.resolve();

    expect(records).to.have.length(1);
    expect(records[0].type).to.eq('childList');
    expect(records[0].addedNodes).to.have.length(1);
    expect(records[0].addedNodes[0]).to.eq(node);
  });

  it('attribute node add', async () => {
    // todo: don't know if it is the correct way to report Attr addition
    const root = new DOMParser().parseFromString('<xml/>', 'text/xml').documentElement;
    const { records, observer } = observerHelper();
    observer.observe(root, { childList: true });

    const node = root.ownerDocument!.createAttribute('div');
    root.appendChild(node);

    await Promise.resolve();

    expect(records).to.have.length(1);
    expect(records[0].type).to.eq('childList');
    expect(records[0].addedNodes).to.have.length(1);
    expect(records[0].addedNodes[0]).to.eq(node);
  });

  it('element node remove', async () => {
    const root = new DOMParser().parseFromString('<xml/>', 'text/xml').documentElement;
    const { records, observer } = observerHelper();

    const node = root.ownerDocument!.createElement('div');
    root.appendChild(node);

    observer.observe(root, { childList: true });

    root.removeChild(node);

    await Promise.resolve();

    expect(records).to.have.length(1);
    expect(records[0].type).to.eq('childList');
    expect(records[0].removedNodes).to.have.length(1);
    expect(records[0].removedNodes[0]).to.eq(node);
  });

  it('element node insertBefore', async () => {
    const root = new DOMParser().parseFromString('<xml/>', 'text/xml').documentElement;
    const { records, observer } = observerHelper();

    const node = root.ownerDocument!.createElement('div');
    root.appendChild(node);

    observer.observe(root, { childList: true });

    const node2 = root.ownerDocument!.createElement('span');
    root.insertBefore(node2, node);

    await Promise.resolve();

    expect(records).to.have.length(1);
    expect(records[0].type).to.eq('childList');
    expect(records[0].addedNodes).to.have.length(1);
    expect(records[0].addedNodes[0]).to.eq(node2);
  });

  it('element node replace', async () => {
    const root = new DOMParser().parseFromString('<xml/>', 'text/xml').documentElement;
    const { records, observer } = observerHelper();

    const node = root.ownerDocument!.createElement('div');
    root.appendChild(node);

    observer.observe(root, { childList: true });

    const node2 = root.ownerDocument!.createElement('span');
    root.replaceChild(node2, node);

    await Promise.resolve();

    expect(records).to.have.length(2);
    expect(records[0].type).to.eq('childList');
    expect(records[0].addedNodes).to.have.length(1);
    expect(records[0].addedNodes[0]).to.eq(node2);

    expect(records[1].type).to.eq('childList');
    expect(records[1].removedNodes).to.have.length(1);
    expect(records[1].removedNodes[0]).to.eq(node);
  });

  it('nested attribute change', async () => {
    const root = new DOMParser().parseFromString('<xml/>', 'text/xml').documentElement;
    const { records, observer } = observerHelper();

    const node = root.ownerDocument!.createElement('div');
    root.appendChild(node);
    node.setAttribute('a', '1');

    observer.observe(root, { attributes: true, attributeOldValue: true, subtree: true });
    node.setAttribute('a', '2');

    await Promise.resolve();

    expect(records).to.have.length(1);
    expect(records[0].type).to.eq('attributes');
    expect(records[0].target).to.eq(node);
    expect(records[0].attributeName).to.eq('a');
    expect(records[0].oldValue).to.eq('1');
  });

  it('subtree text change', async () => {
    const root = new DOMParser().parseFromString('<xml/>', 'text/xml').documentElement;
    const { records, observer } = observerHelper();

    const node = root.ownerDocument!.createTextNode('1');
    root.appendChild(node);

    observer.observe(root, { characterData: true, characterDataOldValue: true, subtree: true });
    node.data = '2';

    await Promise.resolve();

    expect(records).to.have.length(1);
    expect(records[0].type).to.eq('characterData');
    expect(records[0].oldValue).to.eq('1');
  });

  it('subtree element node add', async () => {
    const root = new DOMParser().parseFromString('<xml/>', 'text/xml').documentElement;
    const { records, observer } = observerHelper();

    const node = root.ownerDocument!.createElement('div');
    root.appendChild(node);

    observer.observe(root, { childList: true, subtree: true });

    const node2 = root.ownerDocument!.createElement('span');
    node.appendChild(node2);

    await Promise.resolve();

    expect(records).to.have.length(1);
    expect(records[0].type).to.eq('childList');
    expect(records[0].addedNodes).to.have.length(1);
    expect(records[0].addedNodes[0]).to.eq(node2);
  });
});
