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
   * Intended to be overriden by class inheritance
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
   * @CONTINUE There is an issue on the operation number given for constructors. elementNumber are irregulars (and this raise issue on output whitespace processing) !
   * clear && npm test
   * [ EMdElement { type: 'text', originalText: '', output: '', elementNumber: 0 },
  EMdElementOperation {
    type: 'operation',
    originalText: '{{TEST=56+6}}',
    output: '',
    elementNumber: 1,
    eMdOperationExceptions: [],
    instructions: [ [Object] ],
    executed: true,
    syntaxCheckers: [ [Object] ],
    processedText: { character: '6', position: [Object] } },
  EMdElement {
    type: 'text',
    originalText: ' Lorem Ipsum Dolor ',
    output: ' Lorem Ipsum Dolor ',
    elementNumber: 1 },
  EMdElementOperation {
    type: 'operation',
    originalText: '{{TEST=56+6}}',
    output: '',
    elementNumber: 2,
    eMdOperationExceptions: [],
    instructions: [ [Object] ],
    executed: true,
    syntaxCheckers: [ [Object] ],
    processedText: { character: '6', position: [Object] } },
  EMdElement { type: 'text', originalText: '', output: '', elementNumber: 3 } ]
   *
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
        var elementCounter = newEMdElementList.length;

        if (textsMatched) {
          for (var text of textsMatched) {
            if(nextOutputToSplit){
              let outputSplitted = nextOutputToSplit.split(text);

              eMdElmentList[nextIterator] = new EMdElement(outputSplitted[0], elementCounter);
              eMdElmentList[nextIterator + 1] = getElementType(text, elementCounter+1);

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

              eMdElmentList[nextIterator + 2] = new EMdElement(nextText, elementCounter+2);

              nextIterator = nextIterator + 2;
              nextOutputToSplit = nextText;
              elementCounter++;
            }
          }

          newEMdElementList = newEMdElementList.concat( eMdElmentList );
        }else{
          //Set the new element number (This value can be affected by parsing)
          eMdElement.setElementNumber(newEMdElementList.length);
          newEMdElementList.push( eMdElement );
        }
      }else{
        //Set the new element number (This value can be affected by parsing)
        eMdElement.setElementNumber(newEMdElementList.length);
        newEMdElementList.push( eMdElement );
      }
    });

    return newEMdElementList;
  }

}

module.exports = Rule;
