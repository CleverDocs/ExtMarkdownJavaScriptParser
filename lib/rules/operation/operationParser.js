function OperationParser( ope ){
  this.ope = ope;
}

var clean = function( opeLine ){
  //Remove {{ }}
  opeLine = opeLine.replace(/\{\{/g, "");
  opeLine = opeLine.replace(/\}\}/g, "");
  
  //Remove all Whitespace
  opeLine = opeLine.replace(/\s/g,'');
  
  if( opeLine ){
    return opeLine;
  }else{
    return null;
  }
}

var translate = function( ope ){
  
  return ope;
}

OperationParser.prototype.get = function(){
  
  var opeLines = [];
  
  for ( opeLine of this.ope.match(/[^\r\n]+/g) ){
    
    var opeLine = clean( opeLine );
    opeLine = translate( opeLine );
    
    if( opeLine ){
      opeLines.push( opeLine );
    }
  }
  
  return opeLines;
}

module.exports = OperationParser;