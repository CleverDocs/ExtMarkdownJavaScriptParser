/*!
 * UnknowCharPreventSyntaxChecker
 *
 * Syntax checker for unkown string may be found in the operation
 *
 * Copyright(c) 20017 Jean-Luc Ranaivoarivao <ranaivoarivaojl@me.com>
 * MIT Licensed
 */

const SyntaxChecker = require("./SyntaxChecker");
var SyntaxErrorEMdOperationException = require("../EMdOperationException/SyntaxErrorEMdOperationException");

class PreventUnknowCharSyntaxChecker extends SyntaxChecker {

  constructor() {
    super();
    this.acceptedCharsPattern = /[a-zA-Z0-9 \+\-\/\(\)\=\n\*]/g;
  }

  /**
   * Main function
   * Handle operation and perform test
   * Intended to be overrided
   *
   * @param {EMdElementOperation} ope The object operation
   */
  test(ope) {
    var eMdExceptionCollection = [];

    for (var instructionsOpe of ope.getInstructions()) {

      for (var charOpe of instructionsOpe.characters) {
        if (!charOpe.character.match(this.acceptedCharsPattern)) {
          ope.addException(new SyntaxErrorEMdOperationException("Unknow character '" + charOpe.character + "' on operation " + charOpe.position.operationNumber + ", line " + charOpe.position.line + " and column " + charOpe.position.column, ope.getElementNumber(), charOpe.position.line, charOpe.position.column ));
        }
      }
    }
  }
}

module.exports = PreventUnknowCharSyntaxChecker;
