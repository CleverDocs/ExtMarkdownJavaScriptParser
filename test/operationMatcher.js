var OperationMatcher = require('../lib/rules/operation/operationMatcher');
var Chai = require('chai');
var expect = Chai.expect;

describe('OperationMatcher.getOps()', function() {
  
  describe("Case No Operation", function() {
    it("should return empty array", function() {
      
      expect( new OperationMatcher( "Lorem Ipsum" ).getOps() ).to.deep.equal( [] );
      
    });
    
  });
  
  describe("Case Many Inline Operations", function() {
    it("should return 3 indexes array", function() {
      
      expect( new OperationMatcher( "Lorem {{}} Ipsum{{ }} dolor {{ R = 12 + 2 }}" ).getOps() ).to.deep.equal( [ "{{}}", "{{ }}", "{{ R = 12 + 2 }}" ] );
      
    });
  });
  
  describe("Case Many Block Operations", function() {
    it("should return 4 indexes array", function() {
      
      expect( new OperationMatcher( `Lorem 
{{
}} Ipsum
{{

}} dolor 
{{ 
  R = 12 + 2 
}}
sit amet
{{ 
  R = 12 + 2 
  IF ( R > 10 ){
    J = 1
  }
}}
` ).getOps() ).to.deep.equal( [ `{{
}}`, `{{

}}`, `{{ 
  R = 12 + 2 
}}`, `{{ 
  R = 12 + 2 
  IF ( R > 10 ){
    J = 1
  }
}}` ] );

    });
  });
  
  describe("Case Many Block and Inline Operations", function() {
    it("should return 4 indexes array", function() {
      
      expect( new OperationMatcher( `Lorem 
{{
}} Ipsum{{}} dolor {{ R = 12 + 2 }}
  sit amet
{{ 
  R = 12 + 2 
  IF ( R > 10 ){
    J = 1
  }
}}
  ` ).getOps() ).to.deep.equal( [ `{{
}}`, "{{}}", "{{ R = 12 + 2 }}", `{{ 
  R = 12 + 2 
  IF ( R > 10 ){
    J = 1
  }
}}` ] );
  
    });
  });
});