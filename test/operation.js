var ExtMarkdown = require('../lib/eMd');

var eMd = new ExtMarkdown();
var Chai = require('chai');
var expect = Chai.expect;

describe('Operation', function() {
  
  describe("Example of markdown without operation", function() {
    
    it("should return 'Lorem Ipsum Dolor'", function() {
      
      md = `Lorem Ipsum Dolor`;
      expect( eMd.render( md ) ).to.equal( `Lorem Ipsum Dolor` );
      
    });
    
  });
  
  describe("Example of empty inline operation", function() {
    
    it("should return 'Lorem Ipsum Dolor'", function() {
      
      md = `Lorem Ipsum {{}} Dolor`;
      expect( eMd.render( md ) ).to.equal( `Lorem Ipsum Dolor` );
      
    });
    
  });
});