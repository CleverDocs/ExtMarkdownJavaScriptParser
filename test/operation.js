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

  describe("Example of a simple operation", function() {

    it("should return 'Lorem Ipsum Dolor 2'", function() {

      md = `Lorem Ipsum Dolor {{1+1}}`;
      expect( eMd.render( md ) ).to.equal( `Lorem Ipsum Dolor 2` );

    });

  });

  describe("Example of empty inline operation, spaces in both sides must be erased", function() {

    it("should return 'Lorem Ipsum Dolor'", function() {

      md = `Lorem Ipsum {{}} Dolor`;
      expect( eMd.render( md ) ).to.equal( `Lorem Ipsum Dolor` );

    });

  });

  describe("Example of an empty inline operation wraped by styles chars, spaces in both sides must be erased", function() {

    it("should return 'Lorem Ipsum Dolor 2'", function() {

      md = `Lorem Ipsum **{{TEST=56+6}}** Dolor`;
      expect( eMd.render( md ) ).to.equal( `Lorem Ipsum Dolor` );

    });

  });
});
