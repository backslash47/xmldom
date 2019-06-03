import '../types';

export class MutationObserverImpl implements MutationObserver {
  callback: MutationCallback;
  nodeList: Node[];
  queue: MutationRecord[];

  constructor(callback: MutationCallback) {
    this.callback = callback;
    this.nodeList = [];
    this.queue = [];
  }

  disconnect() {
    for (const node of this.nodeList) {
      node.delObserver(this);
    }

    this.nodeList = [];
    this.queue = [];
  }

  observe(target: Node, options: MutationObserverInit = {}) {
    options = { childList: false, subtree: false, ...options };

    if (
      (options.attributeOldValue !== undefined || options.attributeFilter !== undefined) &&
      options.attributes === undefined
    ) {
      options.attributes = true;
    }

    if (options.characterDataOldValue !== undefined && options.characterData === undefined) {
      options.characterData = true;
    }

    if (!options.childList && !options.attributes && !options.characterData) {
      throw new TypeError(
        `The options object must set at least one of 'attributes', 'characterData', or 'childList' to true.`,
      );
    }

    if (!options.attributes && options.attributeOldValue) {
      throw new TypeError(
        `The options object may only set 'attributeOldValue' to true when 'attributes' is true or not present.`,
      );
    }

    if (!options.attributes && options.attributeFilter !== undefined) {
      throw new TypeError(
        `The options object may only set 'attributeFilter' when 'attributes' is true or not present.`,
      );
    }

    if (!options.characterData && options.characterDataOldValue) {
      throw new TypeError('Character data is not observed but oldValue option is specified');
    }

    const alreadyRegistered = target.addObserver(this, options);

    if (!alreadyRegistered) {
      this.nodeList.push(target);
    }
  }

  takeRecords(): MutationRecord[] {
    return [...this.queue];
  }

  queueRecord(record: MutationRecord) {
    this.queue.push(record);
  }

  notify() {
    if (this.queue.length > 0) {
      this.callback(this.queue, this);
      this.queue = [];
    }
  }
}
