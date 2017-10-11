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
const EMdElement = require("../../EMdElement");
const ToolKit = require("../../ToolKit");
const Remarkable = require("remarkable");
const toolKit = new ToolKit();
const md = new Remarkable();

class EMdElementOperation extends EMdElement {

  constructor(originalOperationText, elementNumber, eMdDocument) {
    super(originalOperationText, elementNumber);

    this.type = "operation";
    this.eMdOperationExceptions = [];
    this.instructions = [];
    this.executed = false;
    this.syntaxCheckers = [new UnknowCharPreventSyntaxChecker()];

    this.processedText = originalOperationText;
    this.output = originalOperationText;

    this.removeSeparators();
    this.format(); //Will populate this.instructions

    //OK. Now perform syntax check
    var that = this;
    this.syntaxCheckers.map(function(syntaxChecker) {
      syntaxChecker.test(that);
    });

    this.translateInstructions();
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

    if (this.processedText) {
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
   * setOutput()
   * Set final output
   * Remove whitespace if output is empty. That's why we need full element list
   *
   * @param {String} output
   * @param {Array} eMdElementList List of eMdElement.
   */
  setOutput(output, eMdElementList){
    if( output === null ){
      output = "";
    }

    //@TODO Remove simple whitespace
    if( this.getElementNumber() > 0 ){
      var previousChar = eMdElementList[this.getElementNumber()-1].getOutput().slice(-1);
    }else{
      var previousChar = "";
    }
    if( this.getElementNumber() < eMdElementList.length ){
      var nextChar = eMdElementList[this.getElementNumber()+1].getOutput().charAt(0);
    }else{
      var nextChar = "";
    }

    /*console.log(this.getElementNumber());
    console.log("->"+previousChar+"<->"+nextChar+"<-");
    console.log(" ");*/

    //@TODO Remove Markdown whitespace

    this.output = output;
  }

  /**
   * getOutput()
   * Returns the text with rule applied
   *
   * @return {String} this.output
   */
  getOutput(){
    return this.output;
  }

  /**
   * translateInstructions()
   * Method that get the instruction and translate it to javascript
   *
   * Notes :
   * Call operation.addEMdExceptions( new SyntaxErrorEMdException("") ) if you want to declare exceptions
   *
   * @parameter {Array} instruction
   * @parameter {operation} operation
   */
  translateInstructions() {
    var that = this;
    this.instructions.map(function(instruction) {
      var translated = instruction.epuredInstruction;

      //Add coma at the end of the instruction
      if (!that.hasOutput()) {
        if (instruction.characters[instruction.characters.length - 2] != ";") {
          translated = translated + ";";
        }
      }

      instruction.translated = translated;
    });

  }

  /**
   * hasOutput()
   * Check if operation ask an output
   * Condition : 1 unique instruction and no assignation (no =)
   *
   * @return {Boolean} toReturn
   */
  hasOutput() {
    var toReturn = false;
    if (this.instructions.length == 1) {
      if (this.instructions[0].epuredInstruction.split("=").length == 1) {
        toReturn = true;
      }
    }
    return toReturn;
  }

  /**
   * isExecutionSuccess()
   * @TODO Set function docs
   */
  isExecutionSuccess() {
    if (this.eMdOperationExceptions.length == 0) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * isExecuted()
   * @TODO Set function docs
   */
  isExecuted() {
    return this.executed;
  }

  /**
   * setExecuted()
   * @TODO Set function docs
   */
  setExecuted() {
    this.executed = true;
  }

  /**
   * getInstructions()
   * Returns the list of instructions
   *
   * @return {Array} this.instructions
   */
  getInstructions() {
    return this.instructions;
  }

  /**
   * addException()
   * Add exception to current operation
   *
   * @param {EMdException}
   */
  addException(eMdException) {
    this.eMdOperationExceptions.push(eMdException);
  }

  /**
   * getExceptions()
   * Returns the list of exception
   *
   * @return {Array} this.eMdOperationExceptions
   */
  getExceptions() {
    return this.eMdOperationExceptions;
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
