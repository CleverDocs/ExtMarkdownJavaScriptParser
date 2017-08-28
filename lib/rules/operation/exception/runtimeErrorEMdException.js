/*!
 * RuntimeErrorEMdException
 *
 * Exception used for runtime errors
 * Extends eMdException
 * Usually throwed by ../operationRunner.js
 *
 * @param {String} message
 *
 * Copyright(c) 20017 Jean-Luc Ranaivoarivao <ranaivoarivaojl@me.com>
 * MIT Licensed
 */

var EMdException = require("../../../eMdException");

class RuntimeErrorEMdException extends EMdException {

  constructor(message) {
    this.severity = "fatal";
    super(message, this.severity);
  }

}

module.exports = RuntimeErrorEMdException;
