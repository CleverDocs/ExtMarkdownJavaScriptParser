var SyntaxChecker = require("../syntaxChecker");
var SyntaxErrorEMdException = require("../exception/SyntaxErrorEMdException");

var VariableAssignFormatSyntaxChecker = Object.create(SyntaxChecker);

VariableAssignFormatSyntaxChecker.test = function( ope ){
  return [ new SyntaxErrorEMdException("Error") ];
}

module.exports = VariableAssignFormatSyntaxChecker;