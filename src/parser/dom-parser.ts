import * as htmlEntity from '../entities';
import { DOMHandler, ErrorHandler, ExternalErrorHandler, Locator } from '../types';
import { DOMHandlerImpl } from './dom-handler';
import { XMLReader } from './sax';

export interface DOMParserOptions {
  locator?: Locator;
  domBuilder?: DOMHandler;
  errorHandler?: ExternalErrorHandler;
  xmlns?: Record<string, string>;
}

export class DOMParserImpl implements DOMParser {
  options: DOMParserOptions;

  constructor(options?: DOMParserOptions) {
    this.options = options || { locator: { lineNumber: 0, columnNumber: 0 } };
  }

  parseFromString(source: string, mimeType: string = '') {
    const options = this.options;
    const sax = new XMLReader();
    const domBuilder = options.domBuilder || new DOMHandlerImpl(); // contentHandler and LexicalHandler
    const errorHandler = options.errorHandler;
    const locator = options.locator;
    const defaultNSMap = options.xmlns || {};
    const isHTML = /\/x?html?$/.test(mimeType); // mimeType.toLowerCase().indexOf('html') > -1;
    const entityMap = isHTML ? htmlEntity.entityMap : { lt: '<', gt: '>', amp: '&', quot: '"', apos: `'` };
    if (locator) {
      domBuilder.setDocumentLocator(locator);
    }

    sax.errorHandler = this.buildErrorHandler(errorHandler, domBuilder, locator);
    sax.domBuilder = options.domBuilder || domBuilder;
    if (isHTML) {
      defaultNSMap[''] = 'http://www.w3.org/1999/xhtml';
    }
    defaultNSMap.xml = defaultNSMap.xml || 'http://www.w3.org/XML/1998/namespace';
    if (source) {
      sax.parse(source, defaultNSMap, entityMap);
    } else {
      sax.errorHandler.error('invalid doc source');
    }
    return domBuilder.doc;
  }

  private buildErrorHandler(
    errorImpl: ExternalErrorHandler | undefined,
    domBuilder: DOMHandler,
    locator: Locator = { lineNumber: 0, columnNumber: 0 },
  ): ErrorHandler {
    if (!errorImpl) {
      if (domBuilder instanceof DOMHandlerImpl) {
        return domBuilder;
      }
    }
    const errorHandler: ErrorHandler = {} as ErrorHandler;

    function build(key: 'warning' | 'error' | 'fatalError') {
      let fn = errorImpl && (errorImpl as any)[key];
      if (!fn && typeof errorImpl === 'function') {
        if (errorImpl.length === 2) {
          fn = (msg: string) => {
            if (typeof errorImpl === 'function') {
              errorImpl(key, msg);
            }
          };
        } else {
          fn = errorImpl;
        }
      }

      if (fn) {
        errorHandler[key] = (msg: string) => {
          fn('[xmldom ' + key + ']\t' + msg + _locator(locator));
        };
      } else {
        errorHandler[key] = (_msg: string) => {
          // empty
        };
      }
    }
    build('warning');
    build('error');
    build('fatalError');
    return errorHandler;
  }
}

function _locator(l: Locator) {
  if (l) {
    return '\n@' + (l.systemId || '') + '#[line:' + l.lineNumber + ',col:' + l.columnNumber + ']';
  }
}
