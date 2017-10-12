/*!
 * EMdDocument
 *
 * Parent object represents a EMdDocument
 *
 * Copyright(c) 20017 Jean-Luc Ranaivoarivao <ranaivoarivaojl@me.com>
 * MIT Licensed
 */

const EMdElement = require("./EMdElement");

class EMdDocument {

  constructor(){
    this.eMdElementList = [];
  }

  /**
   * initWithText()
   * Set the object with a string
   *
   * @param  {String} documentText
   */
  setWithText( documentText ){
    this.eMdElementList = [new EMdElement(documentText, 0)];
    return this;
  }

  /**
   * setWithEMdElementList()
   * Set the object with a list of EMdElements
   * @TODO
   *
   * @param  {Array} eMdElementList List composed with EMdElements
   */
  setWithEMdElementList( eMdElementList ){
    this.eMdElementList = eMdElementList;
    return this;
  }

  /**
   * getFullOutput()
   * Get full output of the document
   *
   * @return {String} output
   */
  getFullOutput(){
    var output = "";
    this.eMdElementList.map(function(element){
      output += element.getOutput();
    });

    return output;
  }

  /**
   * getFullOriginalText()
   * Get full original document
   *
   * @return {String} originalText
   */
  getFullOriginalText(){
    var originalText = "";
    this.eMdElementList.map(function(element){
      originalText += element.getOriginalText();
    });

    return originalText;
  }

  /**
   * getEMdElementList()
   * Get EMdElement list as an array
   *
   * @return {Array} this.eMdElementList
   */
  getEMdElementList(){
    return this.eMdElementList;
  }
}

module.exports = EMdDocument;
