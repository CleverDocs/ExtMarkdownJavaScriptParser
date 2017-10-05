/*!
 * EMdElementOperation
 *
 * Parent object that defines an operation element inside a document
 *
 * @param {String} text
 *
 * Copyright(c) 20017 Jean-Luc Ranaivoarivao <ranaivoarivaojl@me.com>
 * MIT Licensed
 */

class EMdElementOperation extends require("../../EMdElement") {

  constructor(text) {
    super(text);
    this.type = "operation";
  }
}

module.exports = EMdElementOperation;
