var Rule = require("../../rule");
var OperationParser = require("./operationParser");
var OperationMatcher = require("./operationMatcher");

var RuleOperation = Object.create(Rule);

RuleOperation.parse = function( md ){
  var i = 0;
  
  if( opsFound ){
    for( opFound of new OperationMatcher( md ).getOps() ){
      ops.push( new OperationParser( opFound ) );
      i++
    }
  }
  
  return md;
}

module.exports = RuleOperation;