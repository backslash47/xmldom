import '../types';

import { CharacterDataImpl } from '../character-data';

export class DummyCDATASection extends CharacterDataImpl implements CDATASection {
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
