/*!
 * RefOutputReferenceOnlySyntaxChecker
 *
 * Syntax checker for unkown string may be found in the operation
 *
 * Copyright(c) 20017 Jean-Luc Ranaivoarivao <ranaivoarivaojl@me.com>
 * MIT Licensed
 */

const SyntaxChecker = require("./SyntaxChecker");
var SyntaxErrorEMdOperationException = require("../EMdOperationException/SyntaxErrorEMdOperationException");

class RefOutputReferenceOnlySyntaxChecker extends SyntaxChecker {

  constructor() {
    super();
    this.acceptedCharsPattern = /^[a-zA-Z0-9]{1,}$/g;
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
    if( ope.getOperationType() == "ref-output" ){
      var opeInstructions = ope.getInstructions();
      if (!opeInstructions[0].epuredInstruction.match(this.acceptedCharsPattern)) {
        ope.addException(new SyntaxErrorEMdOperationException("Reference output must only have the reference name to output", ope.getElementNumber(), 0, 0 ));
      }
    }
  }
}

module.exports = RefOutputReferenceOnlySyntaxChecker;
