/*!
 * EMdOperationException
 * Exception object parent for operation exception
 *
 * @param {String} message
 * @param {String} Severity fatal | warning | notice | deprecated
 *
 * Copyright(c) 20017 Jean-Luc Ranaivoarivao <ranaivoarivaojl@me.com>
 * MIT Licensed
 */

var EMdException = require("../../../EMdException");

class EMdOperationException extends EMdException {

  constructor(message, severity, number) {
    super(message, severity);
    this.number = number;
  }

}

module.exports = EMdOperationException;
