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
    let md = `Lorem Ipsum`;
    expect(eMd.map(md).eMdElementList[0] instanceof EMdElement).to.equal(true);
    expect(eMd.map(md).eMdElementList[0].getOriginalText()).to.equal(`Lorem Ipsum`);
  });

  it("should return a map with 3 items (EMdElement, EMdElementOperation and EMdElement)", function() {
    let md = `Lorem Ipsum {{TEST=56+6}} Dolor`;
    expect(eMd.map(md).eMdElementList.length).to.equal(3);

    expect(eMd.map(md).eMdElementList[0] instanceof EMdElement).to.equal(true);
    expect(eMd.map(md).eMdElementList[0].getOriginalText()).to.equal(`Lorem Ipsum `);

    expect(eMd.map(md).eMdElementList[1] instanceof EMdElementOperation).to.equal(true);
    expect(eMd.map(md).eMdElementList[1].getOriginalText()).to.equal(`{{TEST=56+6}}`);

    expect(eMd.map(md).eMdElementList[2] instanceof EMdElement).to.equal(true);
    expect(eMd.map(md).eMdElementList[2].getOriginalText()).to.equal(` Dolor`);
  });

  it("should return a map with 5 items (EMdElement, EMdElementOperation, EMdElement, EMdElementOperation)", function() {
    let md = `Lorem Ipsum {{TEST=56+6}} **{{TEST}}** Dolor`;
    expect(eMd.map(md).eMdElementList.length).to.equal(5);

    expect(eMd.map(md).eMdElementList[0] instanceof EMdElement).to.equal(true);
    expect(eMd.map(md).eMdElementList[0].getOriginalText()).to.equal(`Lorem Ipsum `);

    expect(eMd.map(md).eMdElementList[1] instanceof EMdElementOperation).to.equal(true);
    expect(eMd.map(md).eMdElementList[1].getOriginalText()).to.equal(`{{TEST=56+6}}`);

    expect(eMd.map(md).eMdElementList[2] instanceof EMdElement).to.equal(true);
    expect(eMd.map(md).eMdElementList[2].getOriginalText()).to.equal(` **`);

    expect(eMd.map(md).eMdElementList[3] instanceof EMdElementOperation).to.equal(true);
    expect(eMd.map(md).eMdElementList[3].getOriginalText()).to.equal(`{{TEST}}`);

    expect(eMd.map(md).eMdElementList[4] instanceof EMdElement).to.equal(true);
    expect(eMd.map(md).eMdElementList[4].getOriginalText()).to.equal(`** Dolor`);
  });

  it("should return a map with 5 items (EMdElement, EMdElementOperation, EMdElement, EMdElementOperation). With same operations inside.", function() {
    let md = `Lorem Ipsum {{TEST=56+6}} {{TEST=56+6}} Dolor`;
    expect(eMd.map(md).eMdElementList.length).to.equal(5);

    expect(eMd.map(md).eMdElementList[0] instanceof EMdElement).to.equal(true);
    expect(eMd.map(md).eMdElementList[0].getOriginalText()).to.equal(`Lorem Ipsum `);

    expect(eMd.map(md).eMdElementList[1] instanceof EMdElementOperation).to.equal(true);
    expect(eMd.map(md).eMdElementList[1].getOriginalText()).to.equal(`{{TEST=56+6}}`);

    expect(eMd.map(md).eMdElementList[2] instanceof EMdElement).to.equal(true);
    expect(eMd.map(md).eMdElementList[2].getOriginalText()).to.equal(` `);

    expect(eMd.map(md).eMdElementList[3] instanceof EMdElementOperation).to.equal(true);
    expect(eMd.map(md).eMdElementList[3].getOriginalText()).to.equal(`{{TEST=56+6}}`);

    expect(eMd.map(md).eMdElementList[4] instanceof EMdElement).to.equal(true);
    expect(eMd.map(md).eMdElementList[4].getOriginalText()).to.equal(` Dolor`);
  });

  it("should return a map with 9 items with a ", function() {
    let md = `Lorem Ipsum **{{TEST=56+6}}** Dolor {{TEST2=56+6}} {{TEST=56+6}} ss ~lorem3 ds`;

    expect(eMd.map(md).eMdElementList.length).to.equal(9);

    expect(eMd.map(md).eMdElementList[0] instanceof EMdElement).to.equal(true);
    expect(eMd.map(md).eMdElementList[0].getOriginalText()).to.equal(`Lorem Ipsum **`);

    expect(eMd.map(md).eMdElementList[1] instanceof EMdElementOperation).to.equal(true);
    expect(eMd.map(md).eMdElementList[1].getOriginalText()).to.equal(`{{TEST=56+6}}`);

    expect(eMd.map(md).eMdElementList[2] instanceof EMdElement).to.equal(true);
    expect(eMd.map(md).eMdElementList[2].getOriginalText()).to.equal(`** Dolor `);

    expect(eMd.map(md).eMdElementList[3] instanceof EMdElementOperation).to.equal(true);
    expect(eMd.map(md).eMdElementList[3].getOriginalText()).to.equal(`{{TEST2=56+6}}`);

    expect(eMd.map(md).eMdElementList[4] instanceof EMdElement).to.equal(true);
    expect(eMd.map(md).eMdElementList[4].getOriginalText()).to.equal(` `);

    expect(eMd.map(md).eMdElementList[5] instanceof EMdElementOperation).to.equal(true);
    expect(eMd.map(md).eMdElementList[5].getOriginalText()).to.equal(`{{TEST=56+6}}`);

    expect(eMd.map(md).eMdElementList[6] instanceof EMdElement).to.equal(true);
    expect(eMd.map(md).eMdElementList[6].getOriginalText()).to.equal(` ss `);

    expect(eMd.map(md).eMdElementList[7] instanceof EMdElementLorem).to.equal(true);
    expect(eMd.map(md).eMdElementList[7].getOriginalText()).to.equal(`~lorem3`);

    expect(eMd.map(md).eMdElementList[8] instanceof EMdElement).to.equal(true);
    expect(eMd.map(md).eMdElementList[8].getOriginalText()).to.equal(` ds`);
  });

});

describe('Operations Output', function() {

  it("should return an empty output", function() {
    let md = `Operation {{TEST=56+6}}`;
    expect(eMd.map(md).eMdElementList[1].getOutput()).to.equal(``);
  });

  it("should return an operation with 2 as output", function() {
    let md = `Result = **{{1+1}}**`;
    expect(eMd.map(md).eMdElementList[1].getOutput()).to.equal(`2`);
  });

  it("should return an operation with empty output", function() {
    let md = `Result = **{{TEST=1+1}}**`;
    expect(eMd.map(md).eMdElementList[1].getOutput()).to.equal(``);
  });

  /*it("should return an operation with fail status (Unknown variable)", function() {
    let md = `Result = **{{TEST}}**`;
    expect(eMd.map(md).eMdElementList[1].getOutput()).to.equal(`??`);
    expect(eMd.map(md).eMdElementList[1].getStatus()).to.equal(false);
  });*/

});

describe('Exceptions', function() {

  it("should return a operation with Syntax Error exception", function() {
    let md = `Operation {{TEST$=56+6}}`;
    expect(eMd.map(md).eMdElementList[1].getExceptions()[0] instanceof SyntaxErrorEMdOperationException).to.equal(true);
    expect(eMd.map(md).eMdElementList[1].getExceptions()[0].number).to.equal(0);
    expect(eMd.map(md).eMdElementList[1].getExceptions()[0].line).to.equal(1);
    expect(eMd.map(md).eMdElementList[1].getExceptions()[0].column).to.equal(5);
  });

it("should return a operation with Runtime Error exception", function() {
    let md = `Operation {{TEST}}`;
    expect(eMd.map(md).eMdElementList[1].getExceptions()[0] instanceof RuntimeErrorEMdOperationException).to.equal(true);
    expect(eMd.map(md).eMdElementList[1].getExceptions()[0].number).to.equal(0);
  });

});
