/*!
 * Operation
 *
 * Parent Object for Rules
 *
 * @TODO Rename this class for more coherence in accordance to his heritage
 *
 * @param {String} opeString
 * @param {Interger} operationNumber Position of the operation (Error reporting needs this)
 *
 * Copyright(c) 20017 Jean-Luc Ranaivoarivao <ranaivoarivaojl@me.com>
 * MIT Licensed
 */


var ExtMarkdownObject = require("../../eMdObject");
var OperationParser = require("./operationParser");
var OperationTranslator = require("./operationTranslator");

class Operation extends ExtMarkdownObject {

  constructor(opeString, operationNumber, allString) {
    super();
    
    this.eMdExceptions = [];
    this.eMdExceptionsJSon = [];

    this.opeString = opeString;
    this.operationNumber = operationNumber;
    this.operationParser = new OperationParser();
    this.operationTranslator = new OperationTranslator();
    this.instructions = this.split(this.removeSeparators(this.opeString), this.operationNumber);
    this.contentResult = null;

    this.operationParser.syntaxCheck(this);
    this.operationTranslator.translate(this);

    this.executed = false;

    //Save the string before and after the matched string
    //Support when there's more than 1 match
    //For isInLine() purposes
    var allStringSplited = allString.split(opeString);
    if (allStringSplited.length == 2) {
      this.beforeString = allStringSplited[0];
      this.afterString = allStringSplited[1];
    } else {
      this.beforeString = "";
      var i = 0;
      while (i <= operationNumber) {
        this.beforeString = this.beforeString + allStringSplited[i];
        if (i != operationNumber) {
          this.beforeString = this.beforeString + opeString;
        }
        i++;
      }
      this.afterString = "";
      while (i <= allStringSplited.length - 1) {
        this.afterString = this.afterString + allStringSplited[i];
        if (i < allStringSplited.length - 1) {
          this.afterString = this.afterString + opeString;
        }
        i++;
      }
    }
    //
  }

  toJSON() {
    return {
      type: "operation",
      original: this.opeString,
      content: this.contentResult,
      exceptions: this.getEMdExceptions(true),
      isInline: this.isInLine()
    };
  }

  /**
   * isLineBreak()
   *
   * Detect if the variable given in parameter is a line break
   *
   * @parameter {String} chr
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
   * isInline()
   * Returns true if operation is inline.
   *
   * @return {Boolean}
   */
  isInLine() {
    var isInline = false;

    //Check if there is a character which is not a whitespace before previous line break
    var splitedBeforeString = this.beforeString.split('');
    var i = splitedBeforeString.length-1;
    while ( i > 0 && splitedBeforeString[i] != "\n") {
      if( /^\s+$/.test( splitedBeforeString[i] ) == false ){
        isInline = true;
      }
      i--;
    }
    //

    //Do the same thing in the other side
    var splitedAfterString = this.afterString.split('');
    var i = 0;
    while ( i < splitedAfterString.length-1 && splitedAfterString[i] != "\n") {
      if( /^\s+$/.test( splitedAfterString[i] ) == false ){
        isInline = true;
      }
      i++;
    }
    //
    //
    return isInline;
  }

  /**
   * removeWhitespaces()
   *
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

  /**
   * removeSeparators()
   *
   * Remove eMd open {{ and close tag }}
   *
   * @parameter {String} ope String that represent the operation, with open and close tag
   * @return {String|null} ope
   */
  removeSeparators(ope) {
    //Remove {{ }}
    ope = ope.replace(/\{\{/g, "");
    ope = ope.replace(/\}\}/g, "");

    return ope;
  }

  /**
   * split()
   * Core function that split an operation into an array with a defined format
   *
   * @parameter {String} ope String of the operation
   * @parameter {String} operationNumber Position of the operation (Error reporting needs this)
   * @return {Array} splitedOpe
   */
  split(ope, operationNumber) {
    var splitedOpe = [];
    var i = 0;
    var instructionCounter = 0;
    var columnCounter = 0;
    var lineCounter = 0;

    if (ope) {
      var opeSlitted = ope.split('');
      for (var charOpe of opeSlitted) {
        if (opeSlitted[i - 1] === undefined || this.isLineBreak(opeSlitted[i - 1])) {
          if (splitedOpe.length > 0) {
            instructionCounter++;
          }

          lineCounter++;
          columnCounter = 1;

          splitedOpe[instructionCounter] = {};
          splitedOpe[instructionCounter].characters = [];
        }

        //Set positions of the char
        var characterToPush = {};
        characterToPush.character = charOpe;
        characterToPush.position = {};

        characterToPush.position.line = lineCounter;
        characterToPush.position.column = columnCounter;
        characterToPush.position.operationNumber = operationNumber + 1;
        splitedOpe[instructionCounter].characters.push(characterToPush);

        columnCounter++;
        i++;
      }
    }

    var splitedOpeWithoutBlank = [];
    var i = 0;
    for (var instructionOpe of splitedOpe) {
      var mergedOpe = '';
      for (ope of instructionOpe.characters) {
        mergedOpe += ope.character;
      }

      //Remove blank
      var epuredInstruction = this.removeWhitespaces(mergedOpe);
      if (epuredInstruction != '') {
        instructionOpe.epuredInstruction = epuredInstruction;
        splitedOpeWithoutBlank.push(instructionOpe);
      }

      i++;
    }
    splitedOpe = splitedOpeWithoutBlank;

    //console.log(JSON.stringify(splitedOpe, null, 2));
    return splitedOpe;
  }

  /**
   * Return the string of the operation
   *
   * @return {String} this.opeString String of the operation
   */
  getString() {
    return this.opeString;
  }

  /**
   * Return the operation position given in constructor
   *
   * @return {Interger}
   */
  getOperationNumber() {
    return this.operationNumber;
  }

  /**
   * getInstructions()
   *
   * Return instructions array
   *
   * @return {Array}
   */
  getInstructions() {
    return this.instructions;
  }

  /**
   * hasOutput()
   *
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
   * getEMdExceptions()
   *
   * Get all eMdExceptions collected
   *
   * @return {Array} this.eMdExceptions array containing eMdExceptions
   */
  getEMdExceptions(json=false) {
    if( json ){
      return this.eMdExceptionsJSon;
    }else{
      return this.eMdExceptions;
    }
  }

  /**
   * addEMdExceptions()
   *
   * Add exceptions to eMdExceptions stack
   *
   * @parameter {Array} eMdExceptions array containing eMdExceptions to add
   */
  addEMdExceptions(eMdExceptions) {
    if (eMdExceptions.length > 0) {
      this.eMdExceptions = this.eMdExceptions.concat(eMdExceptions);
      var allException = [];
      for (var eMdException of eMdExceptions) {
        allException.push( eMdException.toJSON() );
      }
      this.eMdExceptionsJSon = this.eMdExceptionsJSon.concat(allException);
    }
  }

  /**
   * setContent()
   * @TODO Set function docs
   */
  setContent( contentResult ){
    this.contentResult = contentResult;
  }

  /**
   * getContent()
   * @TODO Set function docs
   */
  getContent(){
    return this.contentResult;
  }

  /**
   * isExecuted()
   * @TODO Set function docs
   */
  isExecuted(){
    return this.executed;
  }

  /**
   * setExecuted()
   * @TODO Set function docs
   */
  setExecuted(){
    this.executed = true;
  }

  /**
   * isExecutionSuccess()
   * @TODO Set function docs
   */
  isExecutionSuccess(){
    if( this.eMdExceptions.length == 0 ){
      return true;
    }else{
      return false;
    }
  }
}

module.exports = Operation;
