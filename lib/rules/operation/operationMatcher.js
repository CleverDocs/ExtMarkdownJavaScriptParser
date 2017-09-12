/*!
 * OperationMatcher
 *
 * Object that brings methods to match operations inside a string
 *
 * @param {String} md String which expected to contains eMd
 *
 * Copyright(c) 20017 Jean-Luc Ranaivoarivao <ranaivoarivaojl@me.com>
 * MIT Licensed
 */

const cheerio = require('cheerio')
var Operation = require("./operation");
var ConcatenationManager = require("./../../tools/concatenationManager");

class OperationMatcher {

  constructor(md) {
    this.operationPattern = /\{\{(.*?[\s\S]*?)\}\}/g;
  }

  /**
   * matchAndGetOps()
   * Get a markdown string and returns found operations
   *
   * @return {Array} opsFound Returns array composed of operations
   */
  matchAndGetOps(md) {
    var opsFound = [];

    var opsMatched = md.match(this.operationPattern);

    var i = 0;
    if (opsMatched) {
      for (var ope of opsMatched) {
        opsFound.push(new Operation(ope, i, md));
        i++;
      }
    }

    return opsFound;
  }

  /**
   * finalReplace()
   * Get the array composed by the operation output, and the original string
   * and replace operations by outputs if not null
   *
   * @parameter {String} md Markdown string of the operation
   * @parameter {Array} operationsOutput Array composed with operation output
   * @parameter {Rule}
   * @parameter {Bool} set if concatenationManager must add tags or not
   * @return {String} md New md
   */
  finalReplace(md, operationsOutput, rule, tagsEnabled) {
    var result = "";
    var splitedMd = md.split(this.operationPattern);
    var i = 1;
    var iOperations = 0;

    for (var mdPart of splitedMd) {
      if (i % 2 == 0) {
        var concatenationManager = new ConcatenationManager(result, operationsOutput[iOperations], splitedMd[i], rule, iOperations+1, tagsEnabled);
        result = concatenationManager.get();
        splitedMd[i] = concatenationManager.getAfterString();
        iOperations++;
      } else {
        result += mdPart;
      }
      i++;
    }
    return result;
  }


  /**
   * finalGetObjects()
   *
   * @parameter {String} md Markdown string of the operation
   * @parameter {Array} operationsOutput Array composed with operation output
   * @parameter {Rule}
   * @parameter {Bool} set if concatenationManager must add tags or not
   * @return {String} md New md
   */
  finalGetObjects(md, operationsOutput, rule, tagsEnabled){
    var arrayToReturn = [];
    var splitedMd = md.split(this.operationPattern);
    var i = 1;
    var iOperations = 0;

    for (var mdPart of splitedMd) {
      if (i % 2 == 0) {
        var concatenationManager = new ConcatenationManager(arrayToReturn.join(), operationsOutput[iOperations], splitedMd[i], rule, iOperations+1, tagsEnabled);
        arrayToReturn.push( this.setObject( mdPart, concatenationManager.get(true), true ) );
        splitedMd[i] = concatenationManager.getAfterString();
        iOperations++;
      } else {
        arrayToReturn.push( this.setObject( mdPart, null, false, null ) );
      }
      i++;
    }

    return arrayToReturn;
  }

  /**
   * setObject()
   * Method that set the item that will be pushed into the array as result of
   * finalGetObjects()
   *
   * @param {String}  originalString
   * @param {String}  resultString
   * @param {Boolean} isOperation
   */
  setObject( originalString, resultString, isOperation, isInline ){
    var objectToReturn;

    if( isOperation ){
      objectToReturn = {
        type: "operation",
        original: originalString,
        content: resultString
      };
    }else{
      objectToReturn = {
        type: "string",
        content: originalString
      };
    }

    return objectToReturn;
  }
}

module.exports = OperationMatcher;
