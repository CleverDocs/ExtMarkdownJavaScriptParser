var ExtMarkdown = require('./lib/index');
var Remarkable = require('remarkable');
var Fs = require('fs');

var md = new Remarkable();
var eMd = new ExtMarkdown();
var fileWrite = "./index.html";

Fs.readFile( "./index.md", "utf-8", function( err, fileContent ){
  if(err){
    console.log(err);
  }
  var html = md.render( eMd.render( fileContent ) );
  if( typeof fileWrite !== 'undefined' && fileWrite ){
    Fs.writeFile( fileWrite, html, function(err) {
        if(err) {
            return console.log(err);
        }
    });
  }else{
    console.log(html);
  }
});