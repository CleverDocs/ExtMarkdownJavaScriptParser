/*!
 * RuleOperation
 *
 * Rule that in charge of all operations
 * Extends Rule
 *
 * Copyright(c) 20017 Jean-Luc Ranaivoarivao <ranaivoarivaojl@me.com>
 * MIT Licensed
 */

var Rule = require("../../rule");
var OperationMatcher = require("./operationMatcher");
var OperationRunner = require("./operationRunner");

class RuleOperation extends Rule {

  constructor(options = {}){
    super(options);

    this.operationMatcher = new OperationMatcher();
    this.operationRunner = new OperationRunner();

    this.typeAttribute = "emd-type";
    this.typeAttributeValue = "operation";
  }

  /**
   * parse()
   * Get a markdown string and returns result (String parsed by the rule)
   * Show Exceptions on standard output
   * Overrides rule.parse()
   *
   * @param {String} md String to convert
   * @return {String} md String converted with the operation rule applyed
   */
  parse(md) {
    var eMdObjects = this.parseAndGetObjects(md, this);
    var stringToReturn = "";
    var exceptionCollector = [];

    for(var eMdObject of eMdObjects){
      if( eMdObject.type == "string" ){
        stringToReturn += eMdObject.content;
      }else{
        if( eMdObject.hasOutput() ){
          stringToReturn += eMdObject.getContent();
        }

        var exceptionCollector = exceptionCollector.concat(eMdObject.getEMdExceptions());
      }
    }

    //Show encountered exceptions
    for( var ex of exceptionCollector ){
      console.log(ex);
    }

    return stringToReturn;
  }

  /**
   * parseAndGetObjects()
   * Get a markdown string and returns rule
   * Overrides rule.parse()
   *
   * @param {String} md String to convert
   */
  parseAndGetObjects(md){
    return this.operationMatcher.process(md, this);
  }

  /**
   * getExceptions()
   * Get found operations
   * and return array of exceptions
   *
   * @param {Array} opsFound
   * @return {Array} exceptionList
   */
  getExceptions( opsFound ){
    var exceptionList = [];

    for (var op of opsFound) {
      var eMdExceptions = op.getEMdExceptions();
      if (eMdExceptions.length > 0) {
        for (eMdExceptions of eMdExceptions) {
          exceptionList.push(eMdExceptions);
        }
      }
    }

    return exceptionList;
  }

}

module.exports = RuleOperation;
