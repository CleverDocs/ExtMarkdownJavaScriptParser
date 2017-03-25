var OperationParser = require('../lib/rules/operation/operationParser');
//var EMdException = require('../lib/eMdException');
var SyntaxErrorEMdException = require('../lib/rules/operation/exception/SyntaxErrorEMdException');
var Chai = require('chai');
var expect = Chai.expect;

console.log( new OperationParser( "Lorem {{ Test + 3 = Test }}Ipsum" ).getEMdExceptions() );

describe('OperationParser.syntaxCheck()', function() {
  describe("Case Inversed Assign (Test + 3 = Test) ", function() {
    
    it("should return an array with 1 index and eMdException inside", function() {
      
      md = "Lorem {{ Test + 3 = Test }}Ipsum";
      expect( new OperationParser( md ).getEMdExceptions() )
        .to.have.lengthOf(1);
      expect( new OperationParser( md ).getEMdExceptions()[0] )
        .to.be.an.instanceof(SyntaxErrorEMdException);
      
    });
    
    it("should return no EMdException", function() {
      
      md = "Lorem {{ Test = Test + 3 }}Ipsum";
      expect( new OperationParser( md ).getEMdExceptions() )
        .to.have.lengthOf(0);
      
    });
    
  });
});