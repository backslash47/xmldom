/*
 * DOM Level 2
 * Object DOMException
 * @see http://www.w3.org/TR/REC-DOM-Level-1/ecma-script-language-binding.html
 * @see http://www.w3.org/TR/2000/REC-DOM-Level-2-Core-20001113/ecma-script-binding.html
 */

export class DOMExceptionImpl extends Error implements DOMException {
  static readonly INDEX_SIZE_ERR = 1;
  readonly INDEX_SIZE_ERR = DOMExceptionImpl.INDEX_SIZE_ERR;
  static readonly DOMSTRING_SIZE_ERR = 2;
  readonly DOMSTRING_SIZE_ERR = DOMExceptionImpl.DOMSTRING_SIZE_ERR;
  static readonly HIERARCHY_REQUEST_ERR = 3;
  readonly HIERARCHY_REQUEST_ERR = DOMExceptionImpl.HIERARCHY_REQUEST_ERR;
  static readonly WRONG_DOCUMENT_ERR = 4;
  readonly WRONG_DOCUMENT_ERR = DOMExceptionImpl.WRONG_DOCUMENT_ERR;
  static readonly INVALID_CHARACTER_ERR = 5;
  readonly INVALID_CHARACTER_ERR = DOMExceptionImpl.INVALID_CHARACTER_ERR;
  static readonly NO_DATA_ALLOWED_ERR = 6;
  readonly NO_DATA_ALLOWED_ERR = DOMExceptionImpl.NO_DATA_ALLOWED_ERR;
  static readonly NO_MODIFICATION_ALLOWED_ERR = 7;
  readonly NO_MODIFICATION_ALLOWED_ERR = DOMExceptionImpl.NO_MODIFICATION_ALLOWED_ERR;
  static readonly NOT_FOUND_ERR = 8;
  readonly NOT_FOUND_ERR = DOMExceptionImpl.NOT_FOUND_ERR;
  static readonly NOT_SUPPORTED_ERR = 9;
  readonly NOT_SUPPORTED_ERR = DOMExceptionImpl.NOT_SUPPORTED_ERR;
  static readonly INUSE_ATTRIBUTE_ERR = 10;
  readonly INUSE_ATTRIBUTE_ERR = DOMExceptionImpl.INUSE_ATTRIBUTE_ERR;
  //level2
  static readonly INVALID_STATE_ERR = 11;
  readonly INVALID_STATE_ERR = DOMExceptionImpl.INVALID_STATE_ERR;
  static readonly SYNTAX_ERR = 12;
  readonly SYNTAX_ERR = DOMExceptionImpl.SYNTAX_ERR;
  static readonly INVALID_MODIFICATION_ERR = 13;
  readonly INVALID_MODIFICATION_ERR = DOMExceptionImpl.INVALID_MODIFICATION_ERR;
  static readonly NAMESPACE_ERR = 14;
  readonly NAMESPACE_ERR = DOMExceptionImpl.NAMESPACE_ERR;
  static readonly INVALID_ACCESS_ERR = 15;
  readonly INVALID_ACCESS_ERR = DOMExceptionImpl.INVALID_ACCESS_ERR;
  static readonly VALIDATION_ERR = 16;
  readonly VALIDATION_ERR = DOMExceptionImpl.VALIDATION_ERR;
  static readonly TYPE_MISMATCH_ERR = 17;
  readonly TYPE_MISMATCH_ERR = DOMExceptionImpl.TYPE_MISMATCH_ERR;
  static readonly SECURITY_ERR = 18;
  readonly SECURITY_ERR = DOMExceptionImpl.SECURITY_ERR;
  static readonly NETWORK_ERR = 19;
  readonly NETWORK_ERR = DOMExceptionImpl.NETWORK_ERR;
  static readonly ABORT_ERR = 20;
  readonly ABORT_ERR = DOMExceptionImpl.ABORT_ERR;
  static readonly URL_MISMATCH_ERR = 21;
  readonly URL_MISMATCH_ERR = DOMExceptionImpl.URL_MISMATCH_ERR;
  static readonly QUOTA_EXCEEDED_ERR = 22;
  readonly QUOTA_EXCEEDED_ERR = DOMExceptionImpl.QUOTA_EXCEEDED_ERR;
  static readonly TIMEOUT_ERR = 23;
  readonly TIMEOUT_ERR = DOMExceptionImpl.TIMEOUT_ERR;
  static readonly INVALID_NODE_TYPE_ERR = 24;
  readonly INVALID_NODE_TYPE_ERR = DOMExceptionImpl.INVALID_NODE_TYPE_ERR;
  static readonly DATA_CLONE_ERR = 25;
  readonly DATA_CLONE_ERR = DOMExceptionImpl.DATA_CLONE_ERR;

  code: number;

  constructor(code: number, message?: string) {
    super();
    this.code = code;
    if (message === undefined) {
      message = this.translateMessage(code);
    }
  }

  private translateMessage(code: number) {
    switch (code) {
      case DOMExceptionImpl.INDEX_SIZE_ERR:
        return 'Index size error';
      case DOMExceptionImpl.DOMSTRING_SIZE_ERR:
        return 'DOMString size error';
      case DOMExceptionImpl.HIERARCHY_REQUEST_ERR:
        return 'Hierarchy request error';
      case DOMExceptionImpl.WRONG_DOCUMENT_ERR:
        return 'Wrong document';
      case DOMExceptionImpl.INVALID_CHARACTER_ERR:
        return 'Invalid character';
      case DOMExceptionImpl.NO_DATA_ALLOWED_ERR:
        return 'No data allowed';
      case DOMExceptionImpl.NO_MODIFICATION_ALLOWED_ERR:
        return 'No modification allowed';
      case DOMExceptionImpl.NOT_FOUND_ERR:
        return 'Not found';
      case DOMExceptionImpl.NOT_SUPPORTED_ERR:
        return 'Not supported';
      case DOMExceptionImpl.INUSE_ATTRIBUTE_ERR:
        return 'Attribute in use';
      //level2
      case DOMExceptionImpl.INVALID_STATE_ERR:
        return 'Invalid state';
      case DOMExceptionImpl.SYNTAX_ERR:
        return 'Syntax error';
      case DOMExceptionImpl.INVALID_MODIFICATION_ERR:
        return 'Invalid modification';
      case DOMExceptionImpl.NAMESPACE_ERR:
        return 'Invalid namespace';
      case DOMExceptionImpl.INVALID_ACCESS_ERR:
        return 'Invalid access';
      case DOMExceptionImpl.VALIDATION_ERR:
        return 'Validation error';
      case DOMExceptionImpl.TYPE_MISMATCH_ERR:
        return 'The type of the object does not match the expected type';
      case DOMExceptionImpl.SECURITY_ERR:
        return 'The operation is insecure';
      case DOMExceptionImpl.NETWORK_ERR:
        return 'A network error occurred';
      case DOMExceptionImpl.ABORT_ERR:
        return 'A network error occurred';
      case DOMExceptionImpl.URL_MISMATCH_ERR:
        return 'The given URL does not match another URL';
      case DOMExceptionImpl.QUOTA_EXCEEDED_ERR:
        return 'The quota has been exceeded';
      case DOMExceptionImpl.TIMEOUT_ERR:
        return 'The quota has been exceeded';
      case DOMExceptionImpl.INVALID_NODE_TYPE_ERR:
        return 'The node is incorrect or has an incorrect ancestor for this operation';
      case DOMExceptionImpl.DATA_CLONE_ERR:
        return 'The object can not be cloned';
    }
  }
}
