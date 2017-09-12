/*!
 * ExtMarkdown
 *
 * This project extends markdown format to bring usefull features
 * Don't include classic-markdown parser. Use your own.
 *
 * Copyright(c) 20017 Jean-Luc Ranaivoarivao <ranaivoarivaojl@me.com>
 * MIT Licensed
 */

var RuleOperation = require("./rules/operation/ruleOperation");

class ExtMarkdown {

  constructor(options = {}) {
    if (options.tagsEnabled !== undefined && options.tagsEnabled == true) {
      this.tagsEnabled = true;
    } else {
      this.tagsEnabled = false;
    }

    //Be careful! Rule order matters .
    this.rules = [new RuleOperation({tagsEnabled: this.tagsEnabled})];
  }

  /**
   * Get a markdown string from parameter and apply all rules to it.
   * Apply this function to your string before applying classic-markdown parser
   *
   * @param {String} md String to convert
   * @return {String} md String converted
  */
  render(md) {
    for (var rule of this.rules) {
      md = rule.parse(md);
    }
    return md;
  }

  /**
   * getObjectMap()
   * Get an object representing the md document
   *
   * @param {String} md String to convert
   * @return {Object} objectToReturn The JS object representing the md string
   */
  getObjectMap(md){
    var objectList = []

    for (var rule of this.rules) {
      objectList = rule.parseAndGetObjects(md);
    }

    var objectToReturn = { objects: objectList };
    return objectToReturn;
  }

}

module.exports = ExtMarkdown;
