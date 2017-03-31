/*!
 * operationParser 
 * 
 * Object that brings methods to parse operation
 * 
 * @param {Interger} operationNumber Position of the operation (Error reporting needs this)
 * 
 * Copyright(c) 20017 Jean-Luc Ranaivoarivao <ranaivoarivaojl@me.com>
 * MIT Licensed
 */

var unknowCharPreventSyntaxChecker = require("./syntaxChecker/unknowCharPreventSyntaxChecker" );
var variableAssignFormatSyntaxChecker = require("./syntaxChecker/variableAssignFormatSyntaxChecker" );

var syntaxCheckerList = [ new unknowCharPreventSyntaxChecker(), 
                          new variableAssignFormatSyntaxChecker() ];


function operationParser(){
  this.syntaxCheckerList = syntaxCheckerList;
}



operationParser.prototype = {

  /**
   * syntaxCheck()
   * 
   * Method that get the operation (./operation.js) object and return exceptions
   *
   * @return {Array} eMdExceptions List of operation's exception
   */
   syntaxCheck : function( operation ){
     
     var eMdExceptions = [];
     
     // Get syntax checkers
     var i = 0;
     for( syntaxChecker of this.syntaxCheckerList ){
       eMdExceptions.push( syntaxChecker.test( operation.getInstructions() ) );
       i ++;
     }
     
     return eMdExceptions;
   }
}

module.exports = operationParser;