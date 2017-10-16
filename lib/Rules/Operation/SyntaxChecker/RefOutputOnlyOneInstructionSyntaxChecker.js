/*!
 * RefOutputOnlyOneInstructionSyntaxChecker
 *
 * Syntax checker for unkown string may be found in the operation
 *
 * Copyright(c) 20017 Jean-Luc Ranaivoarivao <ranaivoarivaojl@me.com>
 * MIT Licensed
 */

const SyntaxChecker = require("./SyntaxChecker");
var SyntaxErrorEMdOperationException = require("../EMdOperationException/SyntaxErrorEMdOperationException");

class RefOutputOnlyOneInstructionSyntaxChecker extends SyntaxChecker {

  constructor() {
    super();
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
      var instructionCounter = 0;
      for (var instructionsOpe of ope.getInstructions()) {
        if( instructionCounter > 0){
          ope.addException(new SyntaxErrorEMdOperationException("Reference output accept only one instruction", ope.getElementNumber(), instructionCounter, 0 ));
        }
        instructionCounter++;
      }
    }
  }
}

module.exports = RefOutputOnlyOneInstructionSyntaxChecker;
