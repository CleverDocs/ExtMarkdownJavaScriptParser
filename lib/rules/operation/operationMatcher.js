var operationPattern = /\{\{(.*?[\s\S]*?)\}\}/g;
var md;

function OperationMatcher( md ){
  this.opsFound = md.match(operationPattern);
  if( !this.opsFound ){
    this.opsFound = [];
  }
}

OperationMatcher.prototype.getOps = function(){
  return this.opsFound;
}

module.exports = OperationMatcher;
