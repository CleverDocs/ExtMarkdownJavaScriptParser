var ExtMarkdown = require('./lib/eMd');
var Remarkable = require('remarkable');
var Fs = require('fs');

var md = new Remarkable({html: true});
var eMd = new ExtMarkdown({tagsEnabled: true});
var fileWrite = "./index.html";

Fs.readFile( "./index.md", "utf-8", function( err, fileContent ){
  if(err){
    console.log(err);
  }
  console.log( eMd.getObjectMap( fileContent ) );

  /*var html = md.render( eMd.getObjectMap( fileContent ) );
  /*if( typeof fileWrite !== 'undefined' && fileWrite ){
    Fs.writeFile( fileWrite, html, function(err) {
        if(err) {
            return console.log(err);
        }
    });
  }else{
    console.log(html);
  }*/
});
