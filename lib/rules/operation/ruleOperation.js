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
var operationRunner = require("./operationRunner");

function ruleOperation(){
  rule.apply(this, arguments);
  this.operationMatcher = new operationMatcher();
  this.operationRunner = new operationRunner();
}

ruleOperation.prototype = new rule();

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
  var opsFound = this.operationMatcher.matchAndGetOps( md );
  var output = this.operationRunner.run( opsFound );
  md = this.operationMatcher.finalReplace( md, output );
  
  return md;
}

module.exports = ruleOperation;