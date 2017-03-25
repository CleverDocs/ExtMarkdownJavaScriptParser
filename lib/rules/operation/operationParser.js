function OperationParser( ope ){
  
  this.syntaxCheckerList = [ "VariableAssignFormatSyntaxChecker" ];
  this.ope = ope;
  this.eMdExceptions = [];
  
  ope = removeSeparators( ope );
  this.syntaxCheck();
  
}

var removeSeparators = function( ope ){
  //Remove {{ }}
  ope = ope.replace(/\{\{/g, "");
  ope = ope.replace(/\}\}/g, "");
  
  if( ope ){
    return ope;
  }else{
    return null;
  }
}

var removeWhitespaces = function( ope ){
  //Remove all Whitespace
  ope = ope.replace(/\s/g,'');

  if( ope ){
    return ope;
  }else{
    return null;
  }
}

OperationParser.prototype.syntaxCheck = function(){
  // Get syntax checkers
  var i = 0;
  for( syntaxChecker of this.syntaxCheckerList ){
    var SyntaxChecker = require("./syntaxChecker/" + syntaxChecker );
    this.eMdExceptions = this.eMdExceptions.concat( SyntaxChecker.test( this.ope ) );
    i ++;
  }
}

OperationParser.prototype.getEMdExceptions = function(){
  return this.eMdExceptions;
}

module.exports = OperationParser;