/*!
 * EMdElement
 *
 * Parent object that defines an element inside a EMd document
 * This element can represent an operation or simply a string ...
 *
 * @param {String} text
 *
 * Copyright(c) 20017 Jean-Luc Ranaivoarivao <ranaivoarivaojl@me.com>
 * MIT Licensed
 */

class EMdElement {

  constructor( text, elementNumber ){
    this.type = "text";
    this.originalText = text;
    this.elementNumber = elementNumber;
  }

  /**
   * getType()
   * Return the type of EMdElement
   *
   * @return {String} this.type
   */
  getType(){
    return this.type;
  }

  /**
   * getOriginalText()
   * Simply returns the original text passed on constructor
   *
   * @return {String} this.originalText
   */
  getOriginalText(){
    return this.originalText;
  }

  /**
   * getOutput()
   * Returns the text with rule applied
   *
   * @return {String} this.originalText
   */
  getOutput(){
    return this.originalText;
  }

  /**
   * setElementNumber()
   * Give the element number inside the list
   * Keep in mind that constructor can also set this variable
   *
   * @return {Integer} number
   */
  setElementNumber(number){
    this.elementNumber = number;
  }

  /**
   * getElementNumber()
   * Returns the number of the current element
   *
   * @return {Integer} this.elementNumber
   */
  getElementNumber(){
    return this.elementNumber;
  }

}

module.exports = EMdElement;
