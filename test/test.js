/**
 * Tests for all document parsing
 *
 */

const ExtMarkdown = require("../lib/ExtMarkdown");
const EMdElement = require("../lib/EMdElement");
const EMdElementOperation = require("../lib/Rules/Operation/EMdElementOperation");
const EMdElementLorem = require("../lib/Rules/Lorem/EMdElementLorem");
const SyntaxErrorEMdOperationException = require("../lib/Rules/Operation/EMdOperationException/SyntaxErrorEMdOperationException");
const RuntimeErrorEMdOperationException = require("../lib/Rules/Operation/EMdOperationException/RuntimeErrorEMdOperationException");
const Chai = require('chai');
const expect = Chai.expect;
const eMd = new ExtMarkdown();

describe('Type mapping', function() {

  it("should return a map with EMdElement on index 0", function() {
    let eMdMap = eMd.map(`Lorem Ipsum`);
    expect(eMdMap.eMdElementList[0] instanceof EMdElement).to.equal(true);
    expect(eMdMap.eMdElementList[0].getOriginalText()).to.equal(`Lorem Ipsum`);
  });

  it("should return a map with 3 items (EMdElement, EMdElementOperation and EMdElement)", function() {
    let eMdMap = eMd.map(`Lorem Ipsum {{TEST=56+6}} Dolor`);
    expect(eMdMap.eMdElementList.length).to.equal(3);

    expect(eMdMap.eMdElementList[0] instanceof EMdElement).to.equal(true);
    expect(eMdMap.eMdElementList[0].getOriginalText()).to.equal(`Lorem Ipsum `);

    expect(eMdMap.eMdElementList[1] instanceof EMdElementOperation).to.equal(true);
    expect(eMdMap.eMdElementList[1].getOriginalText()).to.equal(`{{TEST=56+6}}`);

    expect(eMdMap.eMdElementList[2] instanceof EMdElement).to.equal(true);
    expect(eMdMap.eMdElementList[2].getOriginalText()).to.equal(` Dolor`);
  });

  it("should return a map with 5 items (EMdElement, EMdElementOperation, EMdElement, EMdElementOperation)", function() {
    let eMdMap = eMd.map(`Lorem Ipsum {{TEST=56+6}} **{{TEST}}** Dolor`);
    expect(eMdMap.eMdElementList.length).to.equal(5);

    expect(eMdMap.eMdElementList[0] instanceof EMdElement).to.equal(true);
    expect(eMdMap.eMdElementList[0].getOriginalText()).to.equal(`Lorem Ipsum `);

    expect(eMdMap.eMdElementList[1] instanceof EMdElementOperation).to.equal(true);
    expect(eMdMap.eMdElementList[1].getOriginalText()).to.equal(`{{TEST=56+6}}`);

    expect(eMdMap.eMdElementList[2] instanceof EMdElement).to.equal(true);
    expect(eMdMap.eMdElementList[2].getOriginalText()).to.equal(` **`);

    expect(eMdMap.eMdElementList[3] instanceof EMdElementOperation).to.equal(true);
    expect(eMdMap.eMdElementList[3].getOriginalText()).to.equal(`{{TEST}}`);

    expect(eMdMap.eMdElementList[4] instanceof EMdElement).to.equal(true);
    expect(eMdMap.eMdElementList[4].getOriginalText()).to.equal(`** Dolor`);
  });

  it("should return a map with 5 items (EMdElement, EMdElementOperation, EMdElement, EMdElementOperation). With same operations inside.", function() {
    let eMdMap = eMd.map(`Lorem Ipsum {{TEST=56+6}} {{TEST=56+6}} Dolor`);

    expect(eMdMap.eMdElementList.length).to.equal(5);

    expect(eMdMap.eMdElementList[0] instanceof EMdElement).to.equal(true);
    expect(eMdMap.eMdElementList[0].getOriginalText()).to.equal(`Lorem Ipsum `);

    expect(eMdMap.eMdElementList[1] instanceof EMdElementOperation).to.equal(true);
    expect(eMdMap.eMdElementList[1].getOriginalText()).to.equal(`{{TEST=56+6}}`);

    expect(eMdMap.eMdElementList[2] instanceof EMdElement).to.equal(true);
    expect(eMdMap.eMdElementList[2].getOriginalText()).to.equal(` `);

    expect(eMdMap.eMdElementList[3] instanceof EMdElementOperation).to.equal(true);
    expect(eMdMap.eMdElementList[3].getOriginalText()).to.equal(`{{TEST=56+6}}`);

    expect(eMdMap.eMdElementList[4] instanceof EMdElement).to.equal(true);
    expect(eMdMap.eMdElementList[4].getOriginalText()).to.equal(` Dolor`);
  });

  it("should return a map with 9 items with 2 element type", function() {
    let eMdMap = eMd.map(`Lorem Ipsum **{{TEST=56+6}}** Dolor {{TEST2=56+6}} {{TEST=56+6}} ss ~lorem3 ds`);
    expect(eMdMap.eMdElementList.length).to.equal(9);

    expect(eMdMap.eMdElementList[0] instanceof EMdElement).to.equal(true);
    expect(eMdMap.eMdElementList[0].getOriginalText()).to.equal(`Lorem Ipsum **`);

    expect(eMdMap.eMdElementList[1] instanceof EMdElementOperation).to.equal(true);
    expect(eMdMap.eMdElementList[1].getOriginalText()).to.equal(`{{TEST=56+6}}`);

    expect(eMdMap.eMdElementList[2] instanceof EMdElement).to.equal(true);
    expect(eMdMap.eMdElementList[2].getOriginalText()).to.equal(`** Dolor `);

    expect(eMdMap.eMdElementList[3] instanceof EMdElementOperation).to.equal(true);
    expect(eMdMap.eMdElementList[3].getOriginalText()).to.equal(`{{TEST2=56+6}}`);

    expect(eMdMap.eMdElementList[4] instanceof EMdElement).to.equal(true);
    expect(eMdMap.eMdElementList[4].getOriginalText()).to.equal(` `);

    expect(eMdMap.eMdElementList[5] instanceof EMdElementOperation).to.equal(true);
    expect(eMdMap.eMdElementList[5].getOriginalText()).to.equal(`{{TEST=56+6}}`);

    expect(eMdMap.eMdElementList[6] instanceof EMdElement).to.equal(true);
    expect(eMdMap.eMdElementList[6].getOriginalText()).to.equal(` ss `);

    expect(eMdMap.eMdElementList[7] instanceof EMdElementLorem).to.equal(true);
    expect(eMdMap.eMdElementList[7].getOriginalText()).to.equal(`~lorem3`);

    expect(eMdMap.eMdElementList[8] instanceof EMdElement).to.equal(true);
    expect(eMdMap.eMdElementList[8].getOriginalText()).to.equal(` ds`);
  });

});

describe('Operations Map Output', function() {

  it("should return an empty output", function() {
    let eMdMap = eMd.map(`Operation {{TEST=56+6}}`);
    expect(eMdMap.eMdElementList[1].getOutput()).to.equal(``);
  });

  it("should return an operation with 2 as output", function() {
    let eMdMap = eMd.map(`Result = **{{1+1}}**`);
    expect(eMdMap.eMdElementList[1].getOutput()).to.equal(`2`);
  });

  it("should return an operation with empty output", function() {
    let eMdMap = eMd.map(`Result = **{{TEST=1+1}}**`);
    expect(eMdMap.eMdElementList[1].getOutput()).to.equal(``);
  });

  it("should return an operation with fail status (Unknown variable)", function() {
    let eMdMap = eMd.map(`Result = **{{TEST}}**`);
    expect(eMdMap.eMdElementList[1].getOutput()).to.equal(`??`);
  });

});

describe('Exceptions', function() {

  it("should return a operation with Syntax Error exception", function() {
    let eMdMap = eMd.map(`Operation {{TEST$=56+6}}`);
    expect(eMdMap.eMdElementList[1].getExceptions()[0] instanceof SyntaxErrorEMdOperationException).to.equal(true);
    expect(eMdMap.eMdElementList[1].getExceptions()[0].number).to.equal(1);
    expect(eMdMap.eMdElementList[1].getExceptions()[0].line).to.equal(1);
    expect(eMdMap.eMdElementList[1].getExceptions()[0].column).to.equal(5);
  });

it("should return a operation with Runtime Error exception", function() {
    let eMdMap = eMd.map(`Operation {{TEST}}`);
    expect(eMdMap.eMdElementList[1].getExceptions()[0] instanceof RuntimeErrorEMdOperationException).to.equal(true);
    expect(eMdMap.eMdElementList[1].getExceptions()[0].number).to.equal(1);
  });

});

describe('Operations General Render', function() {

  it("should return 'Lorem Ipsum Dolor' (Example of markdown without operation)", function() {
    expect(eMd.render(`Lorem Ipsum Dolor`)).to.equal(`Lorem Ipsum Dolor`);
  });

  it("should return 'Lorem Ipsum Dolor 2' (Example of a simple operation)", function() {
    expect(eMd.render(`Lorem Ipsum Dolor {{1+1}}`)).to.equal(`Lorem Ipsum Dolor 2`);
  });

  /*describe('with whitespaces', function() {

    it("should return 'Lorem Ipsum Dolor' (Example of empty inline operation, spaces in both sides must be erased)", function() {
      expect(eMd.render(`Lorem Ipsum {{}} Dolor`)).to.equal(`Lorem Ipsum Dolor`);
    });

    it("should return 'Lorem Ipsum Dolor 2' (Example of an empty inline operation wraped by styles chars, spaces in both sides must be erased)", function() {
      expect(eMd.render(`Lorem Ipsum **{{TEST=56+6}}** Dolor`)).to.equal(`Lorem Ipsum Dolor`);
    });

    it("should return 'Lorem Ipsum Dolor' (Example of empty inline operation at a both side of a string)", function() {
      eMd.render(`{{TEST=56+6}} Lorem Ipsum Dolor {{TEST=56+6}}`);
      expect(eMd.render(`{{TEST=56+6}} Lorem Ipsum Dolor {{TEST=56+6}}`))
        .to.equal(`Lorem Ipsum Dolor`);
    });

    it("should return 'Lorem Ipsum Dolor' (Example of empty inline operation wraped by styles at a both side of a string)", function() {
      expect(eMd.render(`**{{TEST=56+6}}** Lorem Ipsum Dolor **{{TEST=56+6}}**`))
        .to.equal(`Lorem Ipsum Dolor`);
    });
  });*/
});
