/*!
 * RuleOperation 
 * 
 * Rule that in charge of all operations
 * Extends Rule
 * 
 * Copyright(c) 20017 Jean-Luc Ranaivoarivao <ranaivoarivaojl@me.com>
 * MIT Licensed
 */

var rule = require("../../rule");
var operationMatcher = require("./operationMatcher");

function ruleOperation(){
  rule.apply(this, arguments)
}

ruleOperation.prototype = rule.prototype;
ruleOperation.prototype.constructor = ruleOperation;

/**
 * Get a markdown string and returns rule
 * Overrides rule.parse()
 * 
 * @param {String} md String to convert
 * @return {String} md String converted with the operation rule applyed
 */
ruleOperation.prototype.parse = function( md ){
  var i = 0;
  var ops = [];
  var opsFound = new operationMatcher( md ).getOps();
  
  return md;
}

module.exports = ruleOperation;