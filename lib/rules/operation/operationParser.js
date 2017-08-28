/*!
 * OperationParser
 *
 * Object that brings methods to parse operation
 *
 * Copyright(c) 20017 Jean-Luc Ranaivoarivao <ranaivoarivaojl@me.com>
 * MIT Licensed
 */

var UnknowCharPreventSyntaxChecker = require("./syntaxChecker/unknowCharPreventSyntaxChecker" );
var VariableAssignFormatSyntaxChecker = require("./syntaxChecker/variableAssignFormatSyntaxChecker" );

class OperationParser {

  constructor(){
    this.syntaxCheckerList = [ new VariableAssignFormatSyntaxChecker(), new UnknowCharPreventSyntaxChecker() ];
  }

  /**
   * syntaxCheck()
   *
   * Method that get the operation (./operation.js) object and return exceptions
   *
   * @parameter {operation} operation
   */
   syntaxCheck( operation ){

     // Get syntax checkers
     var i = 0;
     for( var syntaxChecker of this.syntaxCheckerList ){
       operation.addEMdExceptions( syntaxChecker.test( operation.getInstructions() ) );
       i ++;
     }
   }
}

module.exports = OperationParser;
