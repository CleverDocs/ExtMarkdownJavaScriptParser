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

function syntaxErrorEMdException(){
  eMdException.apply(this, arguments);
}

syntaxErrorEMdException.prototype = eMdException.prototype;
syntaxErrorEMdException.prototype.constructor = syntaxErrorEMdException;

module.exports = syntaxErrorEMdException;