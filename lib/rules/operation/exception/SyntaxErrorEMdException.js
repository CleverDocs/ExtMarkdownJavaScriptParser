/*!
 * syntaxErrorEMdException 
 * 
 * Exception used for syntax error
 * Extends eMdException
 * 
 * Copyright(c) 20017 Jean-Luc Ranaivoarivao <ranaivoarivaojl@me.com>
 * MIT Licensed
 */

var eMdException = require("../../../eMdException");
var severity = "fatal";

function syntaxErrorEMdException( message ){
  eMdException.apply(this, arguments);
  this.setSeverity( severity );
}

syntaxErrorEMdException.prototype = new eMdException();

module.exports = syntaxErrorEMdException;