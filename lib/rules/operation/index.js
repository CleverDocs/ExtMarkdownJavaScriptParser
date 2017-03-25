var Rule = require("../../rule");
var OperationParser = require("./operationParser");
var OperationMatcher = require("./operationMatcher");

var RuleOperation = Object.create(Rule);

RuleOperation.parse = function( md ){
  var i = 0;
  
  if( opsFound ){
    for( opFound of new OperationMatcher( md ).getOps() ){
      ops[i] = {};
      ops[i].original = opFound;
      ops[i].parsed = new OperationParser( opFound ).get();
      i++
    }
  }
  
  return md;
}

module.exports = RuleOperation;