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
   * Get a markdown string and returns rule
   * Overrides rule.parse()
   *
   * @param {String} md String to convert
   * @return {String} md String converted with the operation rule applyed
   */
  parse(md) {
    var i = 0;
    var ops = [];
    var opsFound = this.operationMatcher.matchAndGetOps(md);

    var output = this.operationRunner.run(opsFound);
    md = this.operationMatcher.finalReplace(md, output, this, this.tagsEnabled);

    //Show encountered exceptions
    for (var op of opsFound) {
      var eMdExceptions = op.getEMdExceptions();
      if (eMdExceptions.length > 0) {
        for (eMdExceptions of eMdExceptions) {
          console.log(eMdExceptions);
        }
      }
    }

    return md;
  }

}

module.exports = RuleOperation;
