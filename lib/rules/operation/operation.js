/*!
 * operation 
 * 
 * Parent Object for Rules
 * 
 * Copyright(c) 20017 Jean-Luc Ranaivoarivao <ranaivoarivaojl@me.com>
 * MIT Licensed
 */

var operationParser = require("./operationParser");

function operation( opeString, operationNumber ) {
  
  this.opeString = opeString;
  this.operationParser = new operationParser( this.opeString, operationNumber );
  this.instructions = this.operationParser.getSplited();
}

operation.prototype = {

  /**
   * Return the string of the operation
   * 
   * @return {String} this.opeString String of the operation
   */
  getString : function(){
    return this.opeString;
  }

}


module.exports = operation;