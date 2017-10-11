/*!
 * RuleLorem
 *
 * Rule for test purpose
 * Extends Rule
 *
 * Converts "~lorem10" to a random lorem text with 10 words
 * 99 words maximum
 *
 * Copyright(c) 20017 Jean-Luc Ranaivoarivao <ranaivoarivaojl@me.com>
 * MIT Licensed
 */

const EMdElementLorem = require("./EMdElementLorem");

class RuleLorem extends require("../../Rule") {

  constructor() {
    super();
    this.loremPattern = /\~lorem[0-9]{1,2}/g;
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
    return this.matchAndSplit(eMdDocument, this.loremPattern, function(text, elementNumber){
      let howManyWords = text.match(/[0-9]{1,2}/);
      return new EMdElementLorem(text, elementNumber, parseInt( howManyWords[0] ));
    });
  }

}

module.exports = RuleLorem;
