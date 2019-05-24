import { DOMHandler, ElementAttributes, EntityMap, EntityReplacer, ErrorHandler, Locator, NSMap } from '../types';
import { ElementAttributesImpl } from './element-attributes';

// S_TAG,	S_ATTR,	S_EQ,	S_ATTR_NOQUOT_VALUE
// S_ATTR_SPACE,	S_ATTR_END,	S_TAG_SPACE, S_TAG_CLOSE
const S_TAG = 0; // tag name offerring
const S_ATTR = 1; // attr name offerring
const S_ATTR_SPACE = 2; // attr name end and space offer
const S_EQ = 3; // =space?
const S_ATTR_NOQUOT_VALUE = 4; // attr value(no quot value only)
const S_ATTR_END = 5; // attr value end and no space(quot end)
const S_TAG_SPACE = 6; // (attr value end || tag end ) && (space offer)
const S_TAG_CLOSE = 7; // closed el<el />

export class XMLReader {
  domBuilder: DOMHandler;
  errorHandler: ErrorHandler;

  parse(source: string, defaultNSMap: NSMap, entityMap: EntityMap) {
    const domBuilder = this.domBuilder;
    domBuilder.startDocument();
    _copy(defaultNSMap, (defaultNSMap = {}));
    parse(source, defaultNSMap, entityMap, domBuilder, this.errorHandler);
    domBuilder.endDocument();
  }
}

function parse(
  source: string,
  defaultNSMapCopy: NSMap,
  entityMap: EntityMap,
  domBuilder: DOMHandler,
  errorHandler: ErrorHandler,
) {
  function fixedFromCharCode(code: number) {
    // String.prototype.fromCharCode does not supports
    // > 2 bytes unicode chars directly
    if (code > 0xffff) {
      code -= 0x10000;

      // tslint:disable-next-line: no-bitwise
      const surrogate1 = 0xd800 + (code >> 10);
      // tslint:disable-next-line: no-bitwise
      const surrogate2 = 0xdc00 + (code & 0x3ff);

      return String.fromCharCode(surrogate1, surrogate2);
    } else {
      return String.fromCharCode(code);
    }
  }
  function entityReplacer(a: string) {
    const k = a.slice(1, -1);
    if (k in entityMap) {
      return entityMap[k];
    } else if (k.charAt(0) === '#') {
      // tslint:disable-next-line: radix
      return fixedFromCharCode(parseInt(k.substr(1).replace('x', '0x')));
    } else {
      errorHandler.error('entity not found:' + a);
      return a;
    }
  }
  function appendText(e: number) {
    // has some bugs
    if (e > start) {
      const xt = source.substring(start, e).replace(/&#?\w+;/g, entityReplacer);
      if (locator) {
        position(start);
      }
      domBuilder.characters(xt, 0, e - start);
      start = e;
    }
  }

  interface StackItem {
    tagName?: string;
    uri: string;
    localName: string;
    currentNSMap: NSMap;
    localNSMap?: NSMap;
  }

  function position(p: number, m: RegExpExecArray | null = null) {
    // tslint:disable-next-line: no-conditional-assignment
    while (p >= lineEnd && (m = linePattern.exec(source))) {
      lineStart = m.index;
      lineEnd = lineStart + m[0].length;
      locator.lineNumber = locator.lineNumber || 0 + 1;
      // console.log('line++:',locator,startPos,endPos)
    }
    locator.columnNumber = p - lineStart + 1;
  }
  let lineStart = 0;
  let lineEnd = 0;
  const linePattern = /.*(?:\r\n?|\n)|.*$/g;
  const locator = domBuilder.locator;

  const parseStack: StackItem[] = [{ currentNSMap: defaultNSMapCopy } as StackItem];
  const closeMap = {};
  let start = 0;
  let end = 0;
  let tagStart = -1;

  while (true) {
    try {
      tagStart = source.indexOf('<', start);
      if (tagStart < 0) {
        if (!source.substr(start).match(/^\s*$/)) {
          const doc = domBuilder.doc;
          const text = doc.createTextNode(source.substr(start));
          doc.appendChild(text);
          domBuilder.currentElement = text;
        }
        return;
      }
      if (tagStart > start) {
        appendText(tagStart);
      }
      switch (source.charAt(tagStart + 1)) {
        case '/':
          end = source.indexOf('>', tagStart + 3);
          let tagName = source.substring(tagStart + 2, end);
          const config = parseStack.pop()!;
          if (end < 0) {
            tagName = source.substring(tagStart + 2).replace(/[\s<].*/, '');
            // console.error('#@@@@@@'+tagName)
            errorHandler.error('end tag name: ' + tagName + ' is not complete:' + config.tagName);
            end = tagStart + 1 + tagName.length;
          } else if (tagName.match(/\s</)) {
            tagName = tagName.replace(/[\s<].*/, '');
            errorHandler.error('end tag name: ' + tagName + ' maybe not complete');
            end = tagStart + 1 + tagName.length;
          }
          // console.error(parseStack.length,parseStack)
          // console.error(config);
          const localNSMap = config.localNSMap;
          const endMatch = config.tagName === tagName;
          const endIgnoreCaseMach =
            endMatch || (config.tagName && config.tagName.toLowerCase() === tagName.toLowerCase());
          if (endIgnoreCaseMach) {
            domBuilder.endElement(config.uri, config.localName, tagName);
            if (localNSMap) {
              for (const prefix of Object.keys(localNSMap)) {
                domBuilder.endPrefixMapping(prefix);
              }
            }
            if (!endMatch) {
              throw new Error('end tag name: ' + tagName + ' is not match the current start tagName:' + config.tagName);
            }
          } else {
            errorHandler.error(`closing tag '${tagName}' does not have a starting tag.`);
            parseStack.push(config);
          }

          end++;
          break;
        // end elment
        case '?': // <?...?>
          if (locator) {
            position(tagStart);
          }
          end = parseInstruction(source, tagStart, domBuilder);
          break;
        case '!': // <!doctype,<![CDATA,<!--
          if (locator) {
            position(tagStart);
          }
          end = parseDCC(source, tagStart, domBuilder, errorHandler);
          break;
        default:
          if (locator) {
            position(tagStart);
          }
          const el = new ElementAttributesImpl();
          const currentNSMap = parseStack[parseStack.length - 1].currentNSMap;
          // elStartEnd
          end = parseElementStartPart(source, tagStart, el, currentNSMap, entityReplacer, errorHandler);
          const len = el.length;

          if (!el.closed && fixSelfClosed(source, end, el.tagName, closeMap)) {
            el.closed = true;
            if (!entityMap.nbsp) {
              errorHandler.warning('unclosed xml element');
            }
          }
          if (locator && len) {
            const locator2 = copyLocator(locator, { lineNumber: 0, columnNumber: 0 });
            // try{// attribute position fixed
            for (let i = 0; i < len; i++) {
              const a = el[i];
              position(a.offset);
              a.locator = copyLocator(locator, { lineNumber: 0, columnNumber: 0 });
            }
            // }catch(e){console.error('@@@@@'+e)}
            domBuilder.locator = locator2;
            if (appendElement(el, domBuilder, currentNSMap)) {
              parseStack.push(el);
            }
            domBuilder.locator = locator;
          } else {
            if (appendElement(el, domBuilder, currentNSMap)) {
              parseStack.push(el);
            }
          }

          if (el.uri === 'http://www.w3.org/1999/xhtml' && !el.closed) {
            end = parseHtmlSpecialContent(source, end, el.tagName, entityReplacer, domBuilder);
          } else {
            end++;
          }
      }
    } catch (e) {
      errorHandler.fatalError('element parse error: ' + e);
      // errorHandler.error('element parse error: '+e);
      end = -1;
      throw e;
    }
    if (end > start) {
      start = end;
    } else {
      // tODO: 这里有可能sax回退，有位置错误风险
      appendText(Math.max(tagStart, start) + 1);
    }
  }
}
function copyLocator(f: Locator, t: Locator) {
  t.lineNumber = f.lineNumber;
  t.columnNumber = f.columnNumber;
  return t;
}

/**
 * @see #appendElement(source,elStartEnd,el,selfClosed,entityReplacer,domBuilder,parseStack);
 * @return end of the elementStartPart(end of elementEndPart for selfClosed el)
 */
function parseElementStartPart(
  source: string,
  start: number,
  el: ElementAttributes,
  currentNSMap: NSMap,
  entityReplacer: EntityReplacer,
  errorHandler: ErrorHandler,
) {
  let attrName: string = '';
  let value: string = '';
  let p = ++start;
  let s = S_TAG; // Status
  while (true) {
    let c = source.charAt(p);
    switch (c) {
      case '=':
        if (s === S_ATTR) {
          // attrName
          attrName = source.slice(start, p);
          s = S_EQ;
        } else if (s === S_ATTR_SPACE) {
          s = S_EQ;
        } else {
          // fatalError: equal must after attrName or space after attrName
          throw new Error('attribute equal must after attrName');
        }
        break;
      // tslint:disable-next-line: quotemark
      case "'":
      case '"':
        if (
          s === S_EQ ||
          s === S_ATTR // || s == S_ATTR_SPACE
        ) {
          // equal
          if (s === S_ATTR) {
            errorHandler.warning('attribute value must after "="');
            attrName = source.slice(start, p);
          }
          start = p + 1;
          p = source.indexOf(c, start);
          if (p > 0) {
            value = source.slice(start, p).replace(/&#?\w+;/g, entityReplacer);
            el.add(attrName, value, start - 1);
            s = S_ATTR_END;
          } else {
            // fatalError: no end quot match
            throw new Error(`attribute value no end '${c}' match`);
          }
        } else if (s === S_ATTR_NOQUOT_VALUE) {
          value = source.slice(start, p).replace(/&#?\w+;/g, entityReplacer);
          // console.log(attrName,value,start,p)
          el.add(attrName, value, start);
          // console.dir(el)
          errorHandler.warning('attribute "' + attrName + '" missed start quot(' + c + ')!!');
          start = p + 1;
          s = S_ATTR_END;
        } else {
          // fatalError: no equal before
          throw new Error('attribute value must folow after "="');
        }
        break;
      case '/':
        switch (s) {
          case S_TAG:
            el.setTagName(source.slice(start, p));
          case S_ATTR_END:
          case S_TAG_SPACE:
          case S_TAG_CLOSE:
            s = S_TAG_CLOSE;
            el.closed = true;
          case S_ATTR_NOQUOT_VALUE:
          case S_ATTR:
          case S_ATTR_SPACE:
            break;
          // case S_EQ:
          default:
            throw new Error(`attribute invalid close char('/')`);
        }
        break;
      case '': // end document
        // throw new Error('unexpected end of input')
        errorHandler.error('unexpected end of input');
        if (s === S_TAG) {
          el.setTagName(source.slice(start, p));
        }
        return p;
      case '>':
        switch (s) {
          case S_TAG:
            el.setTagName(source.slice(start, p));
          case S_ATTR_END:
          case S_TAG_SPACE:
          case S_TAG_CLOSE:
            break; // normal
          case S_ATTR_NOQUOT_VALUE: // compatible state
          case S_ATTR:
            value = source.slice(start, p);
            if (value.slice(-1) === '/') {
              el.closed = true;
              value = value.slice(0, -1);
            }
          case S_ATTR_SPACE:
            if (s === S_ATTR_SPACE) {
              value = attrName;
            }
            if (s === S_ATTR_NOQUOT_VALUE) {
              errorHandler.warning('attribute "' + value + '" missed quot(")!!');
              el.add(attrName, value.replace(/&#?\w+;/g, entityReplacer), start);
            } else {
              if (
                currentNSMap[''] !== 'http://www.w3.org/1999/xhtml' ||
                !value.match(/^(?:disabled|checked|selected)$/i)
              ) {
                errorHandler.warning('attribute "' + value + '" missed value!! "' + value + '" instead!!');
              }
              el.add(value, value, start);
            }
            break;
          case S_EQ:
            throw new Error('attribute value missed!!');
        }
        // console.log(tagName,tagNamePattern,tagNamePattern.test(tagName))
        return p;
      /*xml space '\x20' | #x9 | #xD | #xA; */
      case '\u0080':
        c = ' ';
      default:
        if (c <= ' ') {
          // Space
          switch (s) {
            case S_TAG:
              el.setTagName(source.slice(start, p)); // tagName
              s = S_TAG_SPACE;
              break;
            case S_ATTR:
              attrName = source.slice(start, p);
              s = S_ATTR_SPACE;
              break;
            case S_ATTR_NOQUOT_VALUE:
              value = source.slice(start, p).replace(/&#?\w+;/g, entityReplacer);
              errorHandler.warning('attribute "' + value + '" missed quot(")!!');
              el.add(attrName, value, start);
            case S_ATTR_END:
              s = S_TAG_SPACE;
              break;
            // case S_TAG_SPACE:
            // case S_EQ:
            // case S_ATTR_SPACE:
            // void();break;
            // case S_TAG_CLOSE:
            // ignore warning
          }
        } else {
          // not space
          // S_TAG,	S_ATTR,	S_EQ,	S_ATTR_NOQUOT_VALUE
          // S_ATTR_SPACE,	S_ATTR_END,	S_TAG_SPACE, S_TAG_CLOSE
          switch (s) {
            // case S_TAG:void();break;
            // case S_ATTR:void();break;
            // case S_ATTR_NOQUOT_VALUE:void();break;
            case S_ATTR_SPACE:
              // const tagName = el.tagName; // todo: not used
              if (
                currentNSMap[''] !== 'http://www.w3.org/1999/xhtml' ||
                !attrName.match(/^(?:disabled|checked|selected)$/i)
              ) {
                errorHandler.warning('attribute "' + attrName + '" missed value!! "' + attrName + '" instead2!!');
              }
              el.add(attrName, attrName, start);
              start = p;
              s = S_ATTR;
              break;
            case S_ATTR_END:
              errorHandler.warning('attribute space is required"' + attrName + '"!!');
            case S_TAG_SPACE:
              s = S_ATTR;
              start = p;
              break;
            case S_EQ:
              s = S_ATTR_NOQUOT_VALUE;
              start = p;
              break;
            case S_TAG_CLOSE:
              throw new Error(`elements closed character '/' and '>' must be connected to`);
          }
        }
    } // end outer switch
    // console.log('p++',p)
    p++;
  }
}
/**
 * @return true if has new namespace define
 */
function appendElement(el: ElementAttributes, domBuilder: DOMHandler, currentNSMap: NSMap) {
  const tagName = el.tagName;
  let prefix: string | null;
  let localName: string;
  let localNSMap: NSMap | null = null;
  let nsp: number;
  // const currentNSMap = parseStack[parseStack.length-1].currentNSMap;
  let i = el.length;
  while (i--) {
    const a = el[i];
    const qName = a.qName;
    const value = a.value;
    nsp = qName.indexOf(':');

    let nsPrefix: string | false;
    if (nsp > 0) {
      prefix = a.prefix = qName.slice(0, nsp);
      localName = qName.slice(nsp + 1);
      nsPrefix = prefix === 'xmlns' && localName;
    } else {
      localName = qName;
      prefix = null;
      nsPrefix = qName === 'xmlns' && '';
    }
    // can not set prefix,because prefix !== ''
    a.localName = localName;
    // prefix == null for no ns prefix attribute
    if (nsPrefix !== false) {
      // hack!!
      if (localNSMap == null) {
        localNSMap = {};
        // console.log(currentNSMap,0)
        _copy(currentNSMap, (currentNSMap = {}));
        // console.log(currentNSMap,1)
      }
      currentNSMap[nsPrefix] = localNSMap[nsPrefix] = value;
      a.uri = 'http://www.w3.org/2000/xmlns/';
      domBuilder.startPrefixMapping(nsPrefix, value);
    }
  }
  i = el.length;
  while (i--) {
    const a = el[i];
    prefix = a.prefix;
    if (prefix) {
      // no prefix attribute has no namespace
      if (prefix === 'xml') {
        a.uri = 'http://www.w3.org/XML/1998/namespace';
      }
      if (prefix !== 'xmlns') {
        a.uri = currentNSMap[prefix || ''];

        // {console.log('###'+a.qName,domBuilder.locator.systemId+'',currentNSMap,a.uri)}
      }
    }
  }
  nsp = tagName.indexOf(':');
  if (nsp > 0) {
    prefix = el.prefix = tagName.slice(0, nsp);
    localName = el.localName = tagName.slice(nsp + 1);
  } else {
    prefix = null; // important!!
    localName = el.localName = tagName;
  }
  // no prefix element has default namespace
  const ns = (el.uri = currentNSMap[prefix || '']);
  domBuilder.startElement(ns, localName, tagName, el);
  // endPrefixMapping and startPrefixMapping have not any help for dom builder
  // localNSMap = null
  if (el.closed) {
    domBuilder.endElement(ns, localName, tagName);
    if (localNSMap) {
      for (const p of Object.keys(localNSMap)) {
        domBuilder.endPrefixMapping(p);
      }
    }
  } else {
    el.currentNSMap = currentNSMap;
    el.localNSMap = localNSMap;
    // parseStack.push(el);
    return true;
  }
}
function parseHtmlSpecialContent(
  source: string,
  elStartEnd: number,
  tagName: string,
  entityReplacer: EntityReplacer,
  domBuilder: DOMHandler,
) {
  if (/^(?:script|textarea)$/i.test(tagName)) {
    const elEndStart = source.indexOf('</' + tagName + '>', elStartEnd);
    let text = source.substring(elStartEnd + 1, elEndStart);
    if (/[&<]/.test(text)) {
      if (/^script$/i.test(tagName)) {
        // if(!/\]\]>/.test(text)){
        // lexHandler.startCDATA();
        domBuilder.characters(text, 0, text.length);
        // lexHandler.endCDATA();
        return elEndStart;
        // }
      } // }else{// text area
      text = text.replace(/&#?\w+;/g, entityReplacer);
      domBuilder.characters(text, 0, text.length);
      return elEndStart;
      // }
    }
  }
  return elStartEnd + 1;
}
function fixSelfClosed(source: string, elStartEnd: number, tagName: string, closeMap: Record<string, number>) {
  // if(tagName in closeMap){
  let pos: number = closeMap[tagName];
  if (pos == null) {
    // console.log(tagName)
    pos = source.lastIndexOf('</' + tagName + '>');
    if (pos < elStartEnd) {
      // 忘记闭合
      pos = source.lastIndexOf('</' + tagName);
    }
    closeMap[tagName] = pos;
  }
  return pos < elStartEnd;
  // }
}
function _copy(source: Record<string, string>, target: Record<string, string>) {
  for (const n of Object.keys(source)) {
    target[n] = source[n];
  }
}
function parseDCC(source: string, start: number, domBuilder: DOMHandler, errorHandler: ErrorHandler) {
  // sure start with '<!'
  const next = source.charAt(start + 2);
  switch (next) {
    case '-':
      if (source.charAt(start + 3) === '-') {
        const end = source.indexOf('-->', start + 4);
        // append comment source.substring(4,end)//<!--
        if (end > start) {
          domBuilder.comment(source, start + 4, end - start - 4);
          return end + 3;
        } else {
          errorHandler.error('Unclosed comment');
        }
      } else {
        // error
        return -1;
      }
    default:
      if (source.substr(start + 3, 6) === 'CDATA[') {
        const end = source.indexOf(']]>', start + 9);
        domBuilder.startCDATA();
        domBuilder.characters(source, start + 9, end - start - 9);
        domBuilder.endCDATA();
        return end + 3;
      }
      // <!DOCTYPE
      // startDTD(java.lang.String name, java.lang.String publicId, java.lang.String systemId)
      const matchs = split(source, start);
      const len = matchs.length;
      if (len > 1 && /!doctype/i.test(matchs[0][0])) {
        const name = matchs[1][0];
        const pubid = len > 3 && /^public$/i.test(matchs[2][0]) && matchs[3][0];
        const sysid = len > 4 && matchs[4][0];
        const lastMatch = matchs[len - 1];
        domBuilder.startDTD(
          name,
          pubid ? pubid.replace(/^(['"])(.*?)\1$/, '$2') : '',
          sysid ? sysid.replace(/^(['"])(.*?)\1$/, '$2') : '',
        );
        domBuilder.endDTD();

        return lastMatch.index + lastMatch[0].length;
      }
  }
  return -1;
}

function parseInstruction(source: string, start: number, domBuilder: DOMHandler) {
  const end = source.indexOf('?>', start);
  if (end) {
    const match = source.substring(start, end).match(/^<\?(\S*)\s*([\s\S]*?)\s*$/);
    if (match) {
      // const len = match[0].length; // todo: unused
      domBuilder.processingInstruction(match[1], match[2]);
      return end + 2;
    } else {
      // error
      return -1;
    }
  }
  return -1;
}

function split(source: string, start: number) {
  let match: RegExpExecArray | null = null;
  const buf: RegExpExecArray[] = [];
  const reg = /'[^']+'|"[^"]+"|[^\s<>\/=]+=?|(\/?\s*>|<)/g;
  reg.lastIndex = start;
  reg.exec(source); // skip <
  // tslint:disable-next-line: no-conditional-assignment
  while ((match = reg.exec(source))) {
    buf.push(match);
    if (match[1]) {
      return buf;
    }
  }
  return [];
}
