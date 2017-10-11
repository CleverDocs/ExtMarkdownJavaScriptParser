const ExtMarkdown = require('./lib/ExtMarkdown');
const Remarkable = require('remarkable');
const Fs = require('fs');

const md = new Remarkable({html: true});
const eMd = new ExtMarkdown();

Fs.readFile("./index.md", "utf-8", function(err, fileContent) {
  if (err) {
    console.log(err);
  }

  var html = md.render(eMd.render(fileContent));
    Fs.writeFile("./index.html", html, function(err) {
      if (err) {
        return console.log(err);
      }
    });
});
