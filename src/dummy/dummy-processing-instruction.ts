import '../types';

import { CharacterDataImpl } from '../character-data';

export abstract class DummyProcessingInstruction extends CharacterDataImpl implements ProcessingInstruction {
  abstract target: string;
}
