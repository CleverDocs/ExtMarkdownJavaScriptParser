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
   * processAndSetOutput()
   * Remove whitespace if output is empty. That's why we need full element list
   * After that, set final output
   *
   * @param {Array} eMdElementList List of eMdElement.
   */
  processAndSetOutput(eMdElementList) {

    /*if (toolKit.isBlank(this.getOutput())) {

      //@CONTINUE Il faut revoir cette partie car elle fait echouer beaucoup de tests
      //Le principe a l'air pourtant correct ...

      if( eMdElementList[this.getElementNumber() - 1] !== undefined ){
        var beforeString = eMdElementList[this.getElementNumber() - 1].getOutput();
      }else{
        var beforeString = "";
      }
      if( eMdElementList[this.getElementNumber() + 1] !== undefined ){
        var afterString = eMdElementList[this.getElementNumber() + 1].getOutput();
      }else{
        var afterString = "";
      }

      //Remove simple whitespace
      if (this.getElementNumber() > 0) {
        var previousChar = beforeString.slice(-1);
      } else {
        var previousChar = "";
      }
      if (this.getElementNumber() < eMdElementList.length-1) {
        var nextChar = afterString.charAt(0);
      } else {
        var nextChar = "";
      }

      if ((previousChar == " " && nextChar == " ") || (previousChar == " " && (nextChar == "" || nextChar == "\n"))) {
        eMdElementList[this.getElementNumber() - 1].setOutput( beforeString.substring(0, beforeString.length-1)  );
      } else if ((previousChar == "" || previousChar == "\n") && nextChar == " ") {
        eMdElementList[this.getElementNumber() + 1].setOutput( afterString.substr(1) );
      }

      //Remove Markdown whitespace

      var randomString = toolKit.generateRandomString(50);
      var tempString = beforeString + randomString + afterString;
      var renderedTempString = md.render(tempString);
      renderedTempString = renderedTempString.replace(/<(?:.|\n)*?>/gm, '');
      var splitedRenderedTempString = renderedTempString.split(randomString);

      if (splitedRenderedTempString[1] !== undefined ) {
        var previousChar = splitedRenderedTempString[0].slice(-1);
        var nextChar = splitedRenderedTempString[1].charAt(0);

        var beforeStringSplitted;
        var afterStringSplitted;
        var i;

        if ((previousChar == " " && nextChar == " ") || (previousChar == " " && (nextChar == "" || nextChar == "\n"))) {
          //In beforeString, this code will remove character by character backstep until the next after a space
          beforeStringSplitted = beforeString.split("");

          i = beforeString.length - 1;
          while (beforeStringSplitted[i] !== " " && i > 0) {
            eMdElementList[this.getElementNumber() - 1].setOutput( beforeString.substring(0, beforeString.length - 1) );
            i--;
          }
          if (beforeString.charAt(beforeString.length - 1) == " ") {
            eMdElementList[this.getElementNumber() - 1].setOutput( beforeString.substring(0, beforeString.length - 1) );
          }

          //In afterString, this code will remove character by character until a space
          afterStringSplitted = afterString.split("");

          i = 0;
          while (afterStringSplitted[i] !== " " && i <= afterString.length) {
            eMdElementList[this.getElementNumber() + 1].setOutput( afterString.substr(1) );
            i++;
          }

        } else if ((previousChar == "" || previousChar == "\n") && nextChar == " ") {
          beforeStringSplitted = beforeString.split("");

          i = beforeString.length - 1;
          while (beforeStringSplitted[i] !== " " && i >= 0) {
            eMdElementList[this.getElementNumber() - 1].setOutput( beforeString.substring(0, beforeString.length - 1));
            i--;
          }

          afterStringSplitted = afterString.split("");

          i = 0;
          while (afterStringSplitted[i] !== " " && i <= afterString.length) {
            eMdElementList[this.getElementNumber() + 1].setOutput( afterString.substr(1) );
            i++;
          }

          eMdElementList[this.getElementNumber() + 1].setOutput( afterString.substr(1));
        }
      }

    }*/
  }

  /**
   * getOutput()
   * Returns the text with rule applied
   *
   * @return {String} this.output
   */
  getOutput() {
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
