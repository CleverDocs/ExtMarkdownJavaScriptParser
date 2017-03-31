/*!
 * rule 
 * 
 * Parent Object for Rules
 * 
 * Copyright(c) 20017 Jean-Luc Ranaivoarivao <ranaivoarivaojl@me.com>
 * MIT Licensed
 */
 
function rule(){
  
}

rule.prototype = {
  
  /**
   * Get a markdown string and returns rule
   * This method is destined to be overriden
   * 
   * @param {String} md String to convert
   * @return {String} md String converted with the rule applyed
   */
  parse : function( md ){
    return md;
  }
  
}

module.exports = rule;