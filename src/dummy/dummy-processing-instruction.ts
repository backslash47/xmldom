import '../types';

import { CharacterDataImpl } from '../character-data';

export abstract class DummyProcessingInstruction extends CharacterDataImpl implements ProcessingInstruction {
  abstract target: string;

  get sheet(): CSSStyleSheet | null {
    throw new Error('Property not implemented.');
  }
}
