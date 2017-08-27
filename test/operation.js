var ExtMarkdown = require('../lib/eMd');

var eMd = new ExtMarkdown();
var Chai = require('chai');
var expect = Chai.expect;

describe('Operation', function() {

  describe("Example of markdown without operation", function() {

    it("should return 'Lorem Ipsum Dolor'", function() {

      var md = `Lorem Ipsum Dolor`;
      expect(eMd.render(md)).to.equal(`Lorem Ipsum Dolor`);

    });
  });

  describe("Example of a simple operation", function() {

    it("should return 'Lorem Ipsum Dolor 2'", function() {

      var md = `Lorem Ipsum Dolor {{1+1}}`;
      expect(eMd.render(md)).to.equal(`Lorem Ipsum Dolor 2`);
    });
  });

  describe("Example of empty inline operation, spaces in both sides must be erased", function() {

    it("should return 'Lorem Ipsum Dolor'", function() {

      var md = `Lorem Ipsum {{}} Dolor`;
      expect(eMd.render(md)).to.equal(`Lorem Ipsum Dolor`);

    });
  });

  describe("Example of an empty inline operation wraped by styles chars, spaces in both sides must be erased", function() {

    it("should return 'Lorem Ipsum Dolor 2'", function() {

      var md = `Lorem Ipsum **{{TEST=56+6}}** Dolor`;
      expect(eMd.render(md)).to.equal(`Lorem Ipsum Dolor`);

    });
  });

  describe("Example of empty inline operation at a both side of a string", function() {

    it("should return 'Lorem Ipsum Dolor'", function() {

      var md = `{{TEST=56+6}} Lorem Ipsum Dolor {{TEST=56+6}}`;
      expect(eMd.render(md)).to.equal(`Lorem Ipsum Dolor`);

    });
  });

  describe("Example of empty inline operation wraped by styles at a both side of a string", function() {

    it("should return 'Lorem Ipsum Dolor'", function() {

      md = `**{{TEST=56+6}}** Lorem Ipsum Dolor **{{TEST=56+6}}**`;
      expect(eMd.render(md)).to.equal(`Lorem Ipsum Dolor`);

    });
  });

  describe("Example of a undefined variable", function() {

    it("should return 'Lorem Ipsum Dolor ??' and not 'Lorem Ipsum Dolor 2' and not because scope unique by render", function() {
      var md1 = `Lorem Ipsum Dolor {{TEST=1+1}}`;
      var foo = eMd.render(md1);

      var md2 = `Lorem Ipsum Dolor {{TEST}}`;
      expect(eMd.render(md2)).to.equal(`Lorem Ipsum Dolor ??`);

    });
  });
});
