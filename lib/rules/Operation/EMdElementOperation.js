/*!
 * EMdElementOperation
 *
 * Parent object that defines an operation element inside a document
 *
 * @param {String} originalOperationText
 * @param {Integer} operationNumber Order of the operation inside document
 * @param {String} eMdDocument Full document
 *
 * Copyright(c) 20017 Jean-Luc Ranaivoarivao <ranaivoarivaojl@me.com>
 * MIT Licensed
 */

const UnknowCharPreventSyntaxChecker = require("./SyntaxChecker/PreventUnknowCharSyntaxChecker");

class EMdElementOperation extends require("../../EMdElement") {

  constructor(originalOperationText, operationNumber, eMdDocument) {
    super(originalOperationText);

    this.type = "operation";
    this.eMdOperationExceptions = [];
    this.instructions = [];
    this.operationNumber = operationNumber;
    this.syntaxCheckers = [ new UnknowCharPreventSyntaxChecker() ];

    this.processedText = originalOperationText;
    this.removeSeparators();
    this.format(); //Will populate this.instructions

    //OK. Now perform syntax check
    var that = this;
    this.syntaxCheckers.map(function(syntaxChecker) {
      syntaxChecker.test(that);
    });
  }

  /**
   * format()
   * Core function that split an operation into an array with a defined format
   */
  format() {
    var i = 0;
    var instructionCounter = 0;
    var columnCounter = 0;
    var lineCounter = 0;

    if( this.processedText ){
      var opeSlitted = this.processedText.split('');

      //Iterates every character od the operation
      for (var charOpe of opeSlitted) {
        if (opeSlitted[i - 1] === undefined || this.isLineBreak(opeSlitted[i - 1])) {
          // New line in the operation
          if (this.instructions.length > 0) {
            instructionCounter++;
          }

          lineCounter++;
          columnCounter = 1;

          this.instructions[instructionCounter] = {};
          this.instructions[instructionCounter].characters = [];
        }

        //Set positions of the char
        var characterToPush = {};
        characterToPush.character = charOpe;
        characterToPush.position = {};

        characterToPush.position.line = lineCounter;
        characterToPush.position.column = columnCounter;
        this.instructions[instructionCounter].characters.push(characterToPush);

        columnCounter++;
        i++;
      }
    }

    var splitedOpeWithoutBlank = [];
    var i = 0;
    for (var instructionOpe of this.instructions) {
      var mergedOpe = '';
      for (this.processedText of instructionOpe.characters) {
        mergedOpe += this.processedText.character;
      }

      //Remove blank
      var epuredInstruction = this.removeWhitespaces(mergedOpe);
      if (epuredInstruction != '') {
        instructionOpe.epuredInstruction = epuredInstruction;
        splitedOpeWithoutBlank.push(instructionOpe);
      }

      i++;
    }
    this.instructions = splitedOpeWithoutBlank;
  }

  /**
   * getInstructions()
   * Returns the list of instructions
   *
   * @return {Array} this.instructions
   */
  getInstructions(){
    return this.instructions;
  }

  /**
   * addException()
   * Add exception to current operation
   *
   * @param {EMdException}
   */
  addException( eMdException ){
    this.eMdOperationExceptions.push(eMdException);
  }

  /**
   * getExceptions()
   * Returns the list of exception
   *
   * @return {Array} this.eMdOperationExceptions
   */
  getExceptions(){
    return this.eMdOperationExceptions;
  }

  /**
   * getOperationNumber()
   * Returns the number of the operation inside the document
   *
   * @return {Integer} this.operationNumber
   */
  getOperationNumber(){
    return this.operationNumber;
  }

  /**
   * removeSeparators()
   * Remove eMd open {{ and close tag }}
   */
  removeSeparators() {
    //Remove {{ }}
    this.processedText = this.processedText.replace(/\{\{/g, "");
    this.processedText = this.processedText.replace(/\}\}/g, "");
  }

  /**
   * isLineBreak()
   * Detect if the caracter given inside a variable in parameter is a line break
   *
   * @parameter {String} chr Character
   * @return {Boolean}
   */
  isLineBreak(chr) {
    if (chr.match(/\n/g)) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * removeWhitespaces()
   * Remove whitespace from string
   *
   * @parameter {String} ope
   * @return {String} ope Returns '' if no whitespace
   */
  removeWhitespaces(ope) {

    //Remove all Whitespace
    ope = ope.replace(/\s/g, '');

    if (ope) {
      return ope;
    } else {
      return '';
    }
  }
}

module.exports = EMdElementOperation;
