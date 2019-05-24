import '../types';

import { NodeImpl } from '../node';

export abstract class DummyCharacterData extends NodeImpl implements CharacterData {
  abstract data: string;
  abstract length: number;
  appendData(_data: string): void {
    throw new Error('Method not implemented.');
  }
  deleteData(_offset: number, _count: number): void {
    throw new Error('Method not implemented.');
  }
  insertData(_offset: number, _data: string): void {
    throw new Error('Method not implemented.');
  }
  replaceData(_offset: number, _count: number, _data: string): void {
    throw new Error('Method not implemented.');
  }
  substringData(_offset: number, _count: number): string {
    throw new Error('Method not implemented.');
  }
  get nextElementSibling(): Element | null {
    throw new Error('Property not implemented.');
  }
  get previousElementSibling(): Element | null {
    throw new Error('Property not implemented.');
  }
}
