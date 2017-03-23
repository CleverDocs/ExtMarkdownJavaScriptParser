var Rule = require("../../rule");
var OperationParser = require("./operationParser");

var RuleOperation = Object.create(Rule);
var operationPattern = /\{\{(.*?[\s\S]*?)\}\}/g

RuleOperation.parse = function( md ){
  var opsFound = md.match(operationPattern);
  var ops = [];
  var i = 0;
  
  if( opsFound ){
    for( opFound of opsFound ){
      ops[i] = {};
      ops[i].original = opFound;
      ops[i].parsed = new OperationParser( opFound ).get( opFound );
      i++
    }
  }
  
  return md;
}

module.exports = RuleOperation;