/*!
 * EMdException
 * Exception object found inside a EMd document
 *
 * @param {String} message
 * @param {String} Severity fatal | warning | notice | deprecated
 *
 * Copyright(c) 20017 Jean-Luc Ranaivoarivao <ranaivoarivaojl@me.com>
 * MIT Licensed
 */

class EMdException {

  constructor(message, severity) {
    this.message = message;
    this.severity = severity;
  }

}

module.exports = EMdException;
