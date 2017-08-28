/*!
 * SyntaxErrorEMdException
 *
 * Exception used for syntax error
 * Extends eMdException
 *
 * Copyright(c) 20017 Jean-Luc Ranaivoarivao <ranaivoarivaojl@me.com>
 * MIT Licensed
 */

var EMdException = require("../../../eMdException");

class SyntaxErrorEMdException extends EMdException {

  constructor(message) {
    this.severity = "fatal";
    super(message, this.severity);
  }

}

module.exports = SyntaxErrorEMdException;
