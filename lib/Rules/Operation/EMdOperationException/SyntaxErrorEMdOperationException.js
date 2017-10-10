/*!
 * SyntaxErrorEMdException
 *
 * Exception used for syntax error
 * Extends eMdException
 *
 * Copyright(c) 20017 Jean-Luc Ranaivoarivao <ranaivoarivaojl@me.com>
 * MIT Licensed
 */

var EMdOperationException = require("./EMdOperationException");

class SyntaxErrorEMdOperationException extends EMdOperationException {

  constructor(message, number, line, column) {
    super(message, "fatal", number, line, column);
  }

}

module.exports = SyntaxErrorEMdOperationException;
