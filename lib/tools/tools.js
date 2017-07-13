/*!
 * tools
 *
 * Set of functions utilities
 *
 * Copyright(c) 20017 Jean-Luc Ranaivoarivao <ranaivoarivaojl@me.com>
 * MIT Licensed
 */

function tools() {

}

tools.prototype = {

  /**
   * generateRandomString()
   * Generate random string with given length
   *
   * @source http://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
   * @return {Integer} len
   */
  generateRandomString: function(len) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    for (var i = 0; i < len; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  },

  /**
   * isFloat()
   * Is float
   *
   * @source http://stackoverflow.com/questions/3885817/how-do-i-check-that-a-number-is-float-or-integer
   * @parameter {Mixed} n
   * @return {Boolean}
   */
  isFloat: function(n) {
    return Number(n) === n && n % 1 !== 0;
  },

  /**
   * isBlank()
   *
   * Determine if the string is blank string
   * https://stackoverflow.com/questions/154059/how-do-you-check-for-an-empty-string-in-javascript
   *
   * @param  {String}  str
   * @return {Boolean}
   */
  isBlank: function(str) {
    return (!str || /^\s*$/.test(str));
  },

  /**
   * arrayUnique()
   *
   * Get an array and erase duplicates.
   * Use it as a filter a.filter( onlyUnique );
   * https://stackoverflow.com/questions/1960473/unique-values-in-an-array
   * 
   * @param value
   * @param index
   * @param self
   * @return
   */
  arrayUnique: function(value, index, self) {
    return self.indexOf(value) === index;
  }

};

module.exports = tools;
