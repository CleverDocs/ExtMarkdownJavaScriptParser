/*!
 * runtimeErrorEMdException 
 * 
 * Exception used for runtime errors
 * Extends eMdException
 * Usually throwed by ../operationRunner.js
 * 
 * Copyright(c) 20017 Jean-Luc Ranaivoarivao <ranaivoarivaojl@me.com>
 * MIT Licensed
 */

var eMdException = require("../../../eMdException");
var severity = "fatal";

function runtimeErrorEMdException( message ){
  eMdException.apply(this, arguments);
  this.setSeverity( severity );
}

runtimeErrorEMdException.prototype = new eMdException();

module.exports = runtimeErrorEMdException;