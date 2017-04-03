/*!
 * unknowCharPreventSyntaxChecker 
 * 
 * Syntax checker for unkown string may be found in the operation
 * 
 * Copyright(c) 20017 Jean-Luc Ranaivoarivao <ranaivoarivaojl@me.com>
 * MIT Licensed
 */

var syntaxChecker = require("../syntaxChecker");
var syntaxErrorEMdException = require("../exception/syntaxErrorEMdException");

var acceptedCharsPattern = /[a-zA-Z0-9 \+\-\/\(\)\=\n\*]/g;


function unknowCharPreventSyntaxChecker(){
  syntaxChecker.apply(this, arguments);
}

unknowCharPreventSyntaxChecker.prototype = new syntaxChecker();

/**
 * Main function
 * 
 * @param {Array} splittedOpe Array that represent the operation, cf ../operationParser.js
 * @return {eMdExceptionCollection} eMdExceptionCollection A collection of exception found by the function
 */
unknowCharPreventSyntaxChecker.prototype.test = function( splittedOpe ){
  var eMdExceptionCollection = [];
  
  for( instructionsOpe of splittedOpe ) {
    
    for( charOpe of instructionsOpe.characters ){
      if( !charOpe.character.match(acceptedCharsPattern) ){
        eMdExceptionCollection.push( new syntaxErrorEMdException("Unknow character '"+charOpe.character+"' on operation "+charOpe.position.operationNumber+", line "+charOpe.position.line+" and column "+charOpe.position.column) );
      }
    }
  }
  console.log(eMdExceptionCollection);
  return eMdExceptionCollection;
}

module.exports = unknowCharPreventSyntaxChecker;