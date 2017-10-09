/*!
 * Rule
 *
 * Parent Object for Rules that defines exmardown format
 *
 * Copyright(c) 20017 Jean-Luc Ranaivoarivao <ranaivoarivaojl@me.com>
 * MIT Licensed
 */

const EMdElement = require("./EMdElement");

class Rule {

  constructor() {
    //This is an abstract class
    if (new.target === Rule) {
      throw new Error("Cannot construct Abstract instances directly");
    }
  }

  /**
   * parse()
   * Entrypoint of the rule
   * Destined to be overriden by class inheritance
   *
   * @param {EMdDocument}
   */
  parse(eMdDocument) {
    return eMdDocument;
  }

  /**
   * matchAndSplit()
   * Match by regular expression and split considering EMdElement given in parameters
   *
   * @param {EMdDocument} eMdDocument
   * @param {Regex} regexPattern
   * @param {Function} getElementType Function that construct childs of EMdElement
   * @return {Array} eMdElmentList
   */
  matchAndSplit( EMdDocument, regexPattern, getElementType ){
    //Get all element list
    var eMdElementList = EMdDocument.getEMdElementList();
    var newEMdElementList = [];
    eMdElementList.map(function(eMdElement){

      //Skip if not type text
      if( eMdElement.getType() == "text" ){
        var loremFound = [];
        var eMdElmentList = [];

        var textsMatched = eMdElement.getOutput().match(regexPattern);
        var nextOutputToSplit = eMdElement.getOutput();
        var nextIterator = 0;
        if (textsMatched) {
          for (var text of textsMatched) {
            if(nextOutputToSplit){
              let outputSplitted = nextOutputToSplit.split(text);

              eMdElmentList[nextIterator] = new EMdElement(outputSplitted[0]);
              eMdElmentList[nextIterator + 1] = getElementType(text);

              //Concatenate the rest of the array splitted into a string
              var nextText = "";
              var i = 1;
              while(outputSplitted[i]){
                if( outputSplitted[i+1] ){
                  nextText += outputSplitted[i]+text;
                }else{
                  nextText += outputSplitted[i];
                }
                i++;
              }

              eMdElmentList[nextIterator + 2] = new EMdElement(nextText);

              nextIterator = nextIterator + 2;
              nextOutputToSplit = nextText;
            }
          }
        }else{
          //Case if no pattern similarity found
          eMdElmentList.push( new EMdElement(eMdElement.getOutput()) );
        }

        newEMdElementList = newEMdElementList.concat( eMdElmentList );
      }else{
        newEMdElementList.push( eMdElement );
      }
    });

    return newEMdElementList;
  }

}

module.exports = Rule;
