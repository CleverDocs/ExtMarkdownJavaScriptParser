/*!
 * RuleOperation
 *
 * Rule that in charge of all operations
 * Extends Rule
 *
 * For example, this rule can converts {{1+1}} syntax to "2"
 *
 * Copyright(c) 20017 Jean-Luc Ranaivoarivao <ranaivoarivaojl@me.com>
 * MIT Licensed
 */

const EMdElement = require("../../EMdElement");
const EMdElementOperation = require("./EMdElementOperation");

class RuleOperation extends require("../../Rule") {

  constructor() {
    super();
    this.operationPattern = /\{\{(.*?[\s\S]*?)\}\}/g;
  }

  /**
   * parse()
   * Entrypoint of the rule
   * This method get a EMdDocument and split this in parts with EMdElement
   * and return another EMdDocument
   *
   * @param  {EMdDocument} eMdDocument
   * @return {Array} eMdElmentList Array composed with list of new EMdElement
   */
  parse(eMdDocument) {
    return this.matchAndSplit(eMdDocument, this.operationPattern, function(text){
      return new EMdElementOperation(text);
    });
  }

}

module.exports = RuleOperation;
