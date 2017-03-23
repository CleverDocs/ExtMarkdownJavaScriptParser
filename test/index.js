var ExtMarkdown = require('../lib/index');
var assert = require('assert');

var eMd = new ExtMarkdown();

describe('Operation Parser', function() {
  
  describe("No Operation", function() {
    it("should return \'Lorem Ipsum\'", function() {
      assert.equal("Lorem Ipsum", eMd.render( "Lorem Ipsum" ));
    });
  });
  
});