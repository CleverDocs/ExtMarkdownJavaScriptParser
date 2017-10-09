/*!
 * UnknowCharPreventSyntaxChecker
 *
 * Syntax checker for unkown string may be found in the operation
 *
 * Copyright(c) 20017 Jean-Luc Ranaivoarivao <ranaivoarivaojl@me.com>
 * MIT Licensed
 */

const SyntaxChecker = require("../SyntaxChecker");
var SyntaxErrorEMdException = require("../exception/syntaxErrorEMdException");

class UnknowCharPreventSyntaxChecker extends SyntaxChecker {

  constructor() {
    super();
    this.acceptedCharsPattern = /[a-zA-Z0-9 \+\-\/\(\)\=\n\*]/g;
  }

  /**
   * Main function
   *
   * @param {Array} splittedOpe Array that represent the operation, cf ../operationParser.js
   * @return {eMdExceptionCollection} eMdExceptionCollection A collection of exception found by the function
   */
  test(splittedOpe) {
    var eMdExceptionCollection = [];

    for (var instructionsOpe of splittedOpe) {

      for (var charOpe of instructionsOpe.characters) {
        if (!charOpe.character.match(this.acceptedCharsPattern)) {
          eMdExceptionCollection.push(new SyntaxErrorEMdException("Unknow character '" + charOpe.character + "' on operation " + charOpe.position.operationNumber + ", line " + charOpe.position.line + " and column " + charOpe.position.column));
        }
      }
    }

    return eMdExceptionCollection;
  }
}

module.exports = UnknowCharPreventSyntaxChecker;
