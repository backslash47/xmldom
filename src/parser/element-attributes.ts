import { ElementAttributes, Locator, NSMap } from '../types';

// tslint:disable-next-line: max-line-length
const nameStartChar = /[A-Z_a-z\xC0-\xD6\xD8-\xF6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/; // \u10000-\uEFFFF
const nameChar = new RegExp(
  '[\\-\\.0-9' + nameStartChar.source.slice(1, -1) + '\\u00B7\\u0300-\\u036F\\u203F-\\u2040]',
);
const tagNamePattern = new RegExp(
  '^' + nameStartChar.source + nameChar.source + '*(?::' + nameStartChar.source + nameChar.source + '*)?$',
);

export interface Attribute {
  localName?: string;
  locator?: Locator;
  qName: string;
  uri?: string;
  value: string;
  offset: number;
}

export class ElementAttributesImpl implements ElementAttributes {
  [index: number]: Attribute;

  tagName: string;
  prefix: string;
  localName: string;
  uri: string;
  closed: boolean = false;
  currentNSMap: NSMap;
  localNSMap: NSMap;

  length = 0;

  setTagName(tagName: string) {
    if (!tagNamePattern.test(tagName)) {
      throw new Error('invalid tagName:' + tagName);
    }
    this.tagName = tagName;
  }
  add(qName: string, value: string, offset: number) {
    if (!tagNamePattern.test(qName)) {
      throw new Error('invalid attribute:' + qName);
    }
    this[this.length++] = { qName, value, offset };
  }

  getLocalName(i: number) {
    return this[i].localName;
  }
  getLocator(i: number) {
    return this[i].locator;
  }
  getQName(i: number) {
    return this[i].qName;
  }
  getURI(i: number) {
    return this[i].uri;
  }
  getValue(i: number) {
    return this[i].value;
  }

  // ,getIndex:function(uri, localName)){
  //   if(localName){
  //
  //   }else{
  //     const qName = uri
  //   }
  // },
  // getValue:function(){return this.getValue(this.getIndex.apply(this,arguments))},
  // getType:function(uri,localName){}
  // getType:function(i){},
}
