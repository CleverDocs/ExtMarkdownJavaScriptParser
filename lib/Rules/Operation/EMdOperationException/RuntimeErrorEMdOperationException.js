/*!
 * SyntaxErrorEMdException
 *
 * Exception used for syntax error
 * Extends eMdException
 *
 * @TODO And what about line/colum number etc ?
 * 
 * Copyright(c) 20017 Jean-Luc Ranaivoarivao <ranaivoarivaojl@me.com>
 * MIT Licensed
 */

var EMdOperationException = require("./EMdOperationException");

class RuntimeErrorEMdOperationException extends EMdOperationException {

  constructor(message, number) {
    super(message, "fatal", number);
  }

}

module.exports = RuntimeErrorEMdOperationException;
