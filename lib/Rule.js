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
    var elementList = [];

    eMdElementList.map(function(eMdElement){
      //Skip if not type text

      if( eMdElement.getType() == "text" ){
        var loremFound = [];
        var eMdElmentList = [];

        var textsMatched = eMdElement.getOutput().match(regexPattern);
        var nextOutputToSplit = eMdElement.getOutput();

        if (textsMatched) {
          var matchedTextCounter = 0;

          while( matchedTextCounter < textsMatched.length+1 ) {

            if(nextOutputToSplit){

              let outputSplitted = nextOutputToSplit.split(textsMatched[matchedTextCounter]);
              if( outputSplitted.length == 1 ){
                elementList.push( {type: "string", content: nextOutputToSplit} );
              }else{
                elementList.push( {type: "string", content: outputSplitted[0]} );
                let elementToPush = {type: "self", content: textsMatched[matchedTextCounter]};
                elementList.push( elementToPush );

                //Concatenate the rest of the array splitted into a string
                var nextText = "";
                var restTextCounter = 1;
                while(outputSplitted[restTextCounter] !== undefined ){
                  if( outputSplitted[restTextCounter+1] !== undefined){
                    nextText += outputSplitted[restTextCounter]+textsMatched[matchedTextCounter];
                  }else{
                    nextText += outputSplitted[restTextCounter];
                  }
                  restTextCounter++;
                }
                nextOutputToSplit = nextText;
              }
            }

            matchedTextCounter++;
          }

        }else{
          elementList.push( {type: "string", content: eMdElement.getOutput()} );
        }
      }else{
        elementList.push( {type: "conserve", object: eMdElement} );
      }
    });

    var eMdElementListToReturn = [];
    var elementCounter = 0;
    elementList.map(function(element){
      if( element.type == "string" ){
        eMdElementListToReturn.push( new EMdElement(element.content, elementCounter) );
      }else if( element.type == "self" ){
        eMdElementListToReturn.push( getElementType(element.content, elementCounter) );
      }else if( element.type == "conserve" ){
        element.object.setElementNumber(elementCounter);
        eMdElementListToReturn.push( element.object );
      }
      elementCounter++;
    });

    return eMdElementListToReturn;
  }

}

module.exports = Rule;
