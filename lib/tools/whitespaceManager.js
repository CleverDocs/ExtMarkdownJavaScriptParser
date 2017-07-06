/*!
 * whitespaceManager
 *
 * This object is a set of function that manage whitespace after rules being applied
 *
 *
 * Copyright(c) 20017 Jean-Luc Ranaivoarivao <ranaivoarivaojl@me.com>
 * MIT Licensed
 */

function whitespaceManager() {

}

whitespaceManager.prototype = {

  /**
   * removeSimpleWhitespace()
   * Remove one of the before or after whitepace if replacer string is empty
   *
   * @return {String} stringToReturn Contatenation with beforeString and replacerString
   */
  removeSimpleWhitespace: function(beforeString, replacerString, afterString) {

    var stringToReturn = "";

    if (replacerString) {
      stringToReturn = beforeString + replacerString;
    } else {
      if (afterString) {
        var previousChar = beforeString.slice(-1);
        var nextChar = afterString.charAt(0);

        if (previousChar == " " && nextChar == " ") {
          stringToReturn = beforeString.substring(0, beforeString.length - 1);
        } else {
          stringToReturn = beforeString;
        }
      }
    }

    return stringToReturn;
  }

};

module.exports = whitespaceManager;
