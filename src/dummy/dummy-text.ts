import '../types';

import { CharacterDataImpl } from '../character-data';

export abstract class DummyText extends CharacterDataImpl implements Text {
  abstract ownerDocument: Document;

  get assignedSlot(): HTMLSlotElement | null {
    throw new Error('Property not implemented.');
  }
  get wholeText(): string {
    throw new Error('Property not implemented.');
  }
  splitText(_offset: number): Text {
    throw new Error('Method not implemented.');
  }
}
