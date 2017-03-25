var OperationParser = require('../lib/rules/operation/operationParser');
var assert = require('assert');

describe('OperationParser.get()', function() {

  describe("Case Empty Operation", function() {
    it("should return empty string", function() {
      assert.equal( "", new OperationParser( "{{}}" ).get() );
      assert.equal( "", new OperationParser( `{{

}}` ).get() );
    });
  });
  
  describe("Case One Variable Operation", function() {
    it("should return \"R\"", function() {
      assert.equal( "R", new OperationParser( "{{R}}" ).get() );
      assert.equal( "R", new OperationParser( `{{
R
}}` ).get() );
      });
    });
  
  describe("Case Simple Operation", function() {
    it("should return \"R+5=4\"", function() {
      assert.equal( "R=4+5", new OperationParser( "{{ R = 4 + 5 }}" ).get() );
      assert.equal( "R=4+5", new OperationParser( `{{
  R=4+5
  }}` ).get() );
    });
  });
  
  describe("Case Complex Operation", function() {
    it("should return \"R+5=4\"", function() {
      assert.deepEqual( [ 'R=4+5', 'IF(R<10){', 'G=1', '}' ], new OperationParser( `{{
  R = 4 + 5
  IF( R < 10 ){
    G=1
  }
}}` ).get() );
    });
  });
  
});