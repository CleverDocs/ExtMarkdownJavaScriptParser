var rules = [ "operation" ];

function ExtMarkdown(){
  this.rules = rules;
  
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