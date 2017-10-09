/**
 * Tests for all document parsing
 *
 */

const ExtMarkdown = require('../lib/ExtMarkdown');
const EMdElement = require('../lib/EMdElement');
const EMdElementOperation = require('../lib/rules/Operation/EMdElementOperation');
const EMdElementLorem = require('../lib/rules/Lorem/EMdElementLorem');

const Chai = require('chai');
const expect = Chai.expect;
const eMd = new ExtMarkdown();

describe('Operation ', function() {

  describe("About generating object with right types", function() {

    it("should return a map with EMdElement on index 0", function() {
      var md = `Lorem Ipsum`;
      expect((eMd.map(md).eMdElementList[0] instanceof EMdElement)).to.equal(true);
      expect((eMd.map(md).eMdElementList[0].getOriginalText())).to.equal(`Lorem Ipsum`);
    });

    it("should return a map with 3 items (EMdElement, EMdElementOperation and EMdElement)", function() {
      var md = `Lorem Ipsum {{TEST=56+6}} Dolor`;
      expect((eMd.map(md).eMdElementList.length)).to.equal(3);

      expect((eMd.map(md).eMdElementList[0] instanceof EMdElement)).to.equal(true);
      expect((eMd.map(md).eMdElementList[0].getOriginalText())).to.equal(`Lorem Ipsum `);

      expect((eMd.map(md).eMdElementList[1] instanceof EMdElementOperation)).to.equal(true);
      expect((eMd.map(md).eMdElementList[1].getOriginalText())).to.equal(`{{TEST=56+6}}`);

      expect((eMd.map(md).eMdElementList[2] instanceof EMdElement)).to.equal(true);
      expect((eMd.map(md).eMdElementList[2].getOriginalText())).to.equal(` Dolor`);
    });

    it("should return a map with 5 items (EMdElement, EMdElementOperation, EMdElement, EMdElementOperation)", function() {
      var md = `Lorem Ipsum {{TEST=56+6}} **{{TEST}}** Dolor`;
      expect((eMd.map(md).eMdElementList.length)).to.equal(5);

      expect((eMd.map(md).eMdElementList[0] instanceof EMdElement)).to.equal(true);
      expect((eMd.map(md).eMdElementList[0].getOriginalText())).to.equal(`Lorem Ipsum `);

      expect((eMd.map(md).eMdElementList[1] instanceof EMdElementOperation)).to.equal(true);
      expect((eMd.map(md).eMdElementList[1].getOriginalText())).to.equal(`{{TEST=56+6}}`);

      expect((eMd.map(md).eMdElementList[2] instanceof EMdElement)).to.equal(true);
      expect((eMd.map(md).eMdElementList[2].getOriginalText())).to.equal(` **`);

      expect((eMd.map(md).eMdElementList[3] instanceof EMdElementOperation)).to.equal(true);
      expect((eMd.map(md).eMdElementList[3].getOriginalText())).to.equal(`{{TEST}}`);

      expect((eMd.map(md).eMdElementList[4] instanceof EMdElement)).to.equal(true);
      expect((eMd.map(md).eMdElementList[4].getOriginalText())).to.equal(`** Dolor`);
    });

    it("should return a map with 5 items (EMdElement, EMdElementOperation, EMdElement, EMdElementOperation). With same operations inside.", function() {
      var md = `Lorem Ipsum {{TEST=56+6}} {{TEST=56+6}} Dolor`;
      expect((eMd.map(md).eMdElementList.length)).to.equal(5);

      expect((eMd.map(md).eMdElementList[0] instanceof EMdElement)).to.equal(true);
      expect((eMd.map(md).eMdElementList[0].getOriginalText())).to.equal(`Lorem Ipsum `);

      expect((eMd.map(md).eMdElementList[1] instanceof EMdElementOperation)).to.equal(true);
      expect((eMd.map(md).eMdElementList[1].getOriginalText())).to.equal(`{{TEST=56+6}}`);

      expect((eMd.map(md).eMdElementList[2] instanceof EMdElement)).to.equal(true);
      expect((eMd.map(md).eMdElementList[2].getOriginalText())).to.equal(` `);

      expect((eMd.map(md).eMdElementList[3] instanceof EMdElementOperation)).to.equal(true);
      expect((eMd.map(md).eMdElementList[3].getOriginalText())).to.equal(`{{TEST=56+6}}`);

      expect((eMd.map(md).eMdElementList[4] instanceof EMdElement)).to.equal(true);
      expect((eMd.map(md).eMdElementList[4].getOriginalText())).to.equal(` Dolor`);
    });

    it("should return a map with 9 items with a ", function() {
      var md = `Lorem Ipsum **{{TEST=56+6}}** Dolor {{TEST2=56+6}} {{TEST=56+6}} ss ~lorem3 ds`;

      expect((eMd.map(md).eMdElementList.length)).to.equal(9);

      expect((eMd.map(md).eMdElementList[0] instanceof EMdElement)).to.equal(true);
      expect((eMd.map(md).eMdElementList[0].getOriginalText())).to.equal(`Lorem Ipsum **`);

      expect((eMd.map(md).eMdElementList[1] instanceof EMdElementOperation)).to.equal(true);
      expect((eMd.map(md).eMdElementList[1].getOriginalText())).to.equal(`{{TEST=56+6}}`);

      expect((eMd.map(md).eMdElementList[2] instanceof EMdElement)).to.equal(true);
      expect((eMd.map(md).eMdElementList[2].getOriginalText())).to.equal(`** Dolor `);

      expect((eMd.map(md).eMdElementList[3] instanceof EMdElementOperation)).to.equal(true);
      expect((eMd.map(md).eMdElementList[3].getOriginalText())).to.equal(`{{TEST2=56+6}}`);

      expect((eMd.map(md).eMdElementList[4] instanceof EMdElement)).to.equal(true);
      expect((eMd.map(md).eMdElementList[4].getOriginalText())).to.equal(` `);

      expect((eMd.map(md).eMdElementList[5] instanceof EMdElementOperation)).to.equal(true);
      expect((eMd.map(md).eMdElementList[5].getOriginalText())).to.equal(`{{TEST=56+6}}`);

      expect((eMd.map(md).eMdElementList[6] instanceof EMdElement)).to.equal(true);
      expect((eMd.map(md).eMdElementList[6].getOriginalText())).to.equal(` ss `);

      expect((eMd.map(md).eMdElementList[7] instanceof EMdElementLorem)).to.equal(true);
      expect((eMd.map(md).eMdElementList[7].getOriginalText())).to.equal(`~lorem3`);

      expect((eMd.map(md).eMdElementList[8] instanceof EMdElement)).to.equal(true);
      expect((eMd.map(md).eMdElementList[8].getOriginalText())).to.equal(` ds`);
    });

  });

});
