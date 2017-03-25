function ExtMarkdown(){
  
  this.rules = [ "operation" ];
  
  var i = 0;
  for( rule of this.rules ){
    this.rules[i] = require("./rules/" + rule );
    i ++;
  }
}

ExtMarkdown.prototype.render = function( md ){
  for( rule of this.rules ){
    md = rule.parse( md );
  }
  return md;
};

module.exports = ExtMarkdown;