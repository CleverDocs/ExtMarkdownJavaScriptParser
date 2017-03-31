var Operation = require("./operation");

var operationPattern = /\{\{(.*?[\s\S]*?)\}\}/g;

/*!
 * operationMatcher 
 * 
 * Object that brings methods to match operations inside a string
 * 
 * @param {String} md String which expected to contains eMd
 * 
 * Copyright(c) 20017 Jean-Luc Ranaivoarivao <ranaivoarivaojl@me.com>
 * MIT Licensed
 */
function operationMatcher( md ){
  this.opsFound = [];
  
  var opsFound = md.match(operationPattern);
  
  var i = 0;
  if( opsFound ){
    for( ope of opsFound ){
      this.opsFound.push( new Operation( ope, i ) );
      i++;
    }
  }
}

operationMatcher.prototype = {
  
  /**
   * getOps()
   * Get a markdown string and returns rule
   * This method is destined to be overriden
   * 
   * @return {Array} md Returns found (in constructor) eMd strings inside an array
   */
  getOps : function(){
    return this.opsFound;
  }
}

module.exports = operationMatcher;
