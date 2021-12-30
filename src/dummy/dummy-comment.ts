import { CharacterDataImpl } from '../character-data';
import '../types';

export abstract class DummyComment extends CharacterDataImpl implements Comment {
    abstract ownerDocument: Document;
}
