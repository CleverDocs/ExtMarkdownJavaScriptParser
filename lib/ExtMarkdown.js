/*!
 * ExtMarkdown
 *
 * This project brings a parser written in JavaScript to ExtMardown format.
 * Exmarkdown is a format wich extends classic Markdown format to bring usefull document formating features :
 * - Document Inline Operations
 * - Spreadsheet Tables
 * - ...
 *
 * Don't include classic-markdown parser. Use your own.
 * @TODO Maybe will include, finally ...
 *
 * @param {Object} options Default Parameters
 *
 * Copyright(c) 20017 Jean-Luc Ranaivoarivao <ranaivoarivaojl@me.com>
 * MIT Licensed
 */

const EMdDocument = require("./EMdDocument");
const RuleOperation = require("./Rules/Operation/RuleOperation");
const RuleLorem = require("./Rules/Lorem/RuleLorem");

class ExtMarkdown {

  constructor(options) {
    //Be careful! Rules order matters .
    this.ruleList = [new RuleOperation(), new RuleLorem()];
  }

  /**
   * Get a markdown string from parameter and apply all rules to it.
   * Apply this function to your string before applying classic-markdown parser
   *
   * @param {String} md String to convert
   * @return {String} this.map(md).getFullOutput() String converted
  */
  render(md) {
    return this.map(md).getFullOutput();
  }

  /**
   * map()
   * Get an object map representing the md document
   *
   * @param {String} md String to convert
   * @return {Object} objectToReturn The JS object representing the md string
   */
  map(md) {
    //Above all, create a string EMdElement that represent all the document
    //This will be splitted by other EMdElement type after rule parsing
    var eMdMap = new EMdDocument().setWithText(md);

    //Apply parse method for every registred rules
    this.ruleList.map(function(rule) {
      eMdMap = new EMdDocument().setWithEMdElementList( rule.parse(eMdMap) );
    });

    return eMdMap;
  }

}

module.exports = ExtMarkdown;
