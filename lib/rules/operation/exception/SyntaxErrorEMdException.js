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
    var severity = "fatal";
    super(message, severity);
    this.severity = severity;
  }

}

module.exports = SyntaxErrorEMdException;
