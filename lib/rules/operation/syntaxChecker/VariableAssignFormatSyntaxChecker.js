/*!
 * variableAssignFormatSyntaxChecker
 *
 * Syntax checker for inverted assignation error
 * Expl = 3 + 1 = Test,  3 + Test = 0
 * There must be only variable name before the = sign
 *
 * Copyright(c) 20017 Jean-Luc Ranaivoarivao <ranaivoarivaojl@me.com>
 * MIT Licensed
 */

var syntaxChecker = require("../syntaxChecker");
var syntaxErrorEMdException = require("../exception/syntaxErrorEMdException");


function variableAssignFormatSyntaxChecker() {
  syntaxChecker.apply(this, arguments);
}

variableAssignFormatSyntaxChecker.prototype = new syntaxChecker();

/**
 * Main function
 *
 * @param {Array} splittedOpe Array that represent the operation, cf ../operationParser.js
 * @return {eMdExceptionCollection} eMdExceptionCollection A collection of exception found by the function
 */
variableAssignFormatSyntaxChecker.prototype.test = function(splittedOpe) {
  var eMdExceptionCollection = [];

  for (var instructionsOpe of splittedOpe) {
    //
  }

  return eMdExceptionCollection;
};

module.exports = variableAssignFormatSyntaxChecker;
