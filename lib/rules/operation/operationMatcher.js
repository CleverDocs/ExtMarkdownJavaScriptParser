/*!
 * operationMatcher
 *
 * Object that brings methods to match operations inside a string
 *
 * @param {String} md String which expected to contains eMd
 *
 * Copyright(c) 20017 Jean-Luc Ranaivoarivao <ranaivoarivaojl@me.com>
 * MIT Licensed
 */

var Operation = require("./operation");
var whitespaceManager = require("../../tools/whitespaceManager");

var operationPattern = /\{\{(.*?[\s\S]*?)\}\}/g;

function operationMatcher(md) {
  this.whitespaceManager = new whitespaceManager();
}

operationMatcher.prototype = {

  /**
   * matchAndGetOps()
   * Get a markdown string and returns found operations
   *
   * @return {Array} opsFound Returns array composed of operations
   */
  matchAndGetOps: function(md) {
    var opsFound = [];

    var opsMatched = md.match(operationPattern);

    var i = 0;
    if (opsMatched) {
      for (var ope of opsMatched) {
        opsFound.push(new Operation(ope, i));
        i++;
      }
    }

    return opsFound;
  },

  /**
   * finalReplace()
   * Get the array composed by the operation output, and the original string
   * and replace operations by outputs if not null
   *
   * @parameter {String} md Markdown string of the operation
   * @parameter {Array} operationsOutput Array composed with operation output
   * @return {String} md New md
   */
  finalReplace: function(md, operationsOutput) {
    var result = "";
    var splitedMd = md.split(operationPattern);
    var i = 1;
    var iOperations = 0;

    for (var mdPart of splitedMd) {
      if (i % 2 == 0) {
        result = this.whitespaceManager.removeSimpleWhitespace(result, operationsOutput[iOperations], splitedMd[i]);
        iOperations++;
      } else {
        result += mdPart;
      }
      i++;
    }
    return result;
  }

};

module.exports = operationMatcher;
