/*!
 * eMd (ExtMarkdown)
 *
 * This project extends markdown format to bring usefull features
 * Don't include classic-markdown parser. Use your own.
 *
 * Copyright(c) 20017 Jean-Luc Ranaivoarivao <ranaivoarivaojl@me.com>
 * MIT Licensed
 */

var ruleOperation = require("./rules/operation/ruleOperation");

function eMd() {
  this.rules = [new ruleOperation()];
}

eMd.prototype = {

  /**
   * Get a markdown string from parameter and apply all rules to it.
   * Apply this function to your string before applying classic-markdown parser
   *
   * @param {String} md String to convert
   * @return {String} md String converted
   */
  render: function(md) {
    for (var rule of this.rules) {
      md = rule.parse(md);
    }
    return md;
  }

};

module.exports = eMd;
