var OperationMatcher = require('../lib/rules/operation/operationMatcher');
var assert = require('assert');

describe('OperationMatcher.getOps()', function() {
  
  describe("Case No Operation", function() {
    it("should return empty array", function() {
      assert.deepEqual( [], new OperationMatcher( "Lorem Ipsum" ).getOps() );
    });
  });
  
  describe("Case Many Inline Operations", function() {
    it("should return 3 indexes array", function() {
      assert.deepEqual( [ "{{}}", "{{ }}", "{{ R = 12 + 2 }}" ], new OperationMatcher( "Lorem {{}} Ipsum{{ }} dolor {{ R = 12 + 2 }}" ).getOps() );
    });
  });
  
  describe("Case Many Block Operations", function() {
    it("should return 4 indexes array", function() {
      assert.deepEqual( [ `{{
}}`, `{{

}}`, `{{ 
  R = 12 + 2 
}}`, `{{ 
  R = 12 + 2 
  IF ( R > 10 ){
    J = 1
  }
}}` ], new OperationMatcher( `Lorem 
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
` ).getOps() );
    });
  });
  
  describe("Case Many Block and Inline Operations", function() {
      it("should return 4 indexes array", function() {
        assert.deepEqual( [ `{{
}}`, "{{}}", "{{ R = 12 + 2 }}", `{{ 
  R = 12 + 2 
  IF ( R > 10 ){
    J = 1
  }
}}` ], new OperationMatcher( `Lorem 
{{
}} Ipsum{{}} dolor {{ R = 12 + 2 }}
  sit amet
{{ 
  R = 12 + 2 
  IF ( R > 10 ){
    J = 1
  }
}}
  ` ).getOps() );
      });
    });
  
});