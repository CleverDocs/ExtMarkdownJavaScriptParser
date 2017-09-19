/*!
 * ConcatenationManager
 *
 * This object is a set of function that manage document recomposition after rules being applied
 *
 * @param {String} beforeString
 * @param {String} replacerString
 * @param {String} afterString
 * @param {Rule}
 * @param {Integer} Operation number (used for tag id)
 * @param {Boolean} set if concatenationManager must add tags or not
 *
 * Copyright(c) 20017 Jean-Luc Ranaivoarivao <ranaivoarivaojl@me.com>
 * MIT Licensed
 */

var Remarkable = require("remarkable");
var Tools = require("./tools");
var Cheerio = require("cheerio");

class ConcatenationManager {

  constructor(currentArrayConcatenated, replacerString, afterString, rule, operationNumber, tagsEnabled) {
    this.tools = new Tools();
    this.md = new Remarkable();

    this.beforeString = "";
    for( var eMdObject of currentArrayConcatenated ){
      this.beforeString += eMdObject.content;
    }

    this.replacerString = replacerString;
    this.afterString = afterString;
    this.rule = rule;
    this.tagsEnabled = tagsEnabled;
    this.operationNumber = operationNumber;

    if (this.replacerString == null) {
      this.replacerString = "";
    }

    if (this.tools.isBlank(this.replacerString)) {
      this.removeSimpleWhitespace();
      this.removeMarkdownWhitespace();
    }
  }

  /**
   * removeSimpleWhitespace()
   * Remove one of the before or after whitepace if replacer string is empty
   *
   */
  removeSimpleWhitespace() {

    var previousChar = this.beforeString.slice(-1);
    var nextChar = this.afterString.charAt(0);

    if ((previousChar == " " && nextChar == " ") || (previousChar == " " && (nextChar == undefined || nextChar == "" || nextChar == "\n"))) {
      this.beforeString = this.beforeString.substring(0, this.beforeString.length - 1);
    } else if ((previousChar == "" || previousChar == "\n") && nextChar == " ") {
      this.afterString = this.afterString.substr(1);
    }
  }

  /**
   * removeMarkdownWhitespace()
   *
   */
  removeMarkdownWhitespace() {
    var randomString = this.tools.generateRandomString(50);

    var tempString = this.beforeString + randomString + this.afterString;

    var renderedTempString = this.md.render(tempString);
    renderedTempString = renderedTempString.replace(/<(?:.|\n)*?>/gm, '');
    var splitedRenderedTempString = renderedTempString.split(randomString);

    if (splitedRenderedTempString[1]) {

      var leftRenderedTempString = splitedRenderedTempString[0];
      var rightRenderedTempString = splitedRenderedTempString[1];

      var previousChar = leftRenderedTempString.slice(-1);
      var nextChar = rightRenderedTempString.charAt(0);

      var beforeStringSplitted;
      var afterStringSplitted;
      var i;

      if ((previousChar == " " && nextChar == " ") || (previousChar == " " && (nextChar == undefined || nextChar == "" || nextChar == "\n"))) {
        //In beforeString, this code will remove character by character backstep until the next after a space
        beforeStringSplitted = this.beforeString.split("");

        i = this.beforeString.length - 1;
        while (beforeStringSplitted[i] !== " " && i > 0) {
          this.beforeString = this.beforeString.substring(0, this.beforeString.length - 1);
          i--;
        }
        if (this.beforeString.charAt(this.beforeString.length - 1) == " ") {
          this.beforeString = this.beforeString.substring(0, this.beforeString.length - 1);
        }

        //In afterString, this code will remove character by character until a space
        afterStringSplitted = this.afterString.split("");

        i = 0;
        while (afterStringSplitted[i] !== " " && i <= this.afterString.length) {
          this.afterString = this.afterString.substr(1);
          i++;
        }
      } else if ((previousChar == "" || previousChar == "\n") && nextChar == " ") {
        beforeStringSplitted = this.beforeString.split("");

        i = this.beforeString.length - 1;
        while (beforeStringSplitted[i] !== " " && i >= 0) {
          this.beforeString = this.beforeString.substring(0, this.beforeString.length - 1);
          i--;
        }

        afterStringSplitted = this.afterString.split("");

        i = 0;
        while (afterStringSplitted[i] !== " " && i <= this.afterString.length) {
          this.afterString = this.afterString.substr(1);
          i++;
        }

        this.afterString = this.afterString.substr(1);

      }
    }
  }

  /**
   * get()
   *
   * Return the string
   *
   * @TODO I think tag must also be managed inside operation object
   *
   * @return {String} prependString
   */
  get() {

    var prependString = "";

    if (this.tagsEnabled && this.tools.isBlank(this.replacerString) == false) {
      //<span class=\"emd\" emd-id=\"1\" emd-type=\"operation\">2</span>
      var tempClass = this.tools.generateRandomString(10);

      var $ = Cheerio.load(prependString + "<" + this.rule.getTag() + " class=" + tempClass + ">" + this.replacerString + "</" + this.rule.getTag() + ">", {xmlMode:true});
      $('.' + tempClass).attr(this.rule.getIdAttribute(), this.operationNumber);

      for (var attribute of this.rule.getOtherAttributes()) {
        $('.' + tempClass).attr(attribute.attr, attribute.value);
      }

      for (var className of this.rule.getClasses()) {
        $('.' + tempClass).addClass(className);
      }

      $('.' + tempClass).removeClass(tempClass);
      return $.html();
    } else {
      return prependString + this.replacerString;
    }
  }

  /**
   * getAfterString()
   *
   * Return the after string
   *
   * @return {String} this.stringToReturn
   */
  getAfterString() {
    return this.afterString;
  }

  /**
   * getBeforeString()
   *
   * Return the before string
   *
   * @return {String} this.beforeString
   */
  getBeforeString() {
    return this.beforeString;
  }
}

module.exports = ConcatenationManager;
