/*!
 * operationTranslator
 *
 * Object that brings methods to translate operations to JavaScript executable code strings
 *
 * Copyright(c) 20017 Jean-Luc Ranaivoarivao <ranaivoarivaojl@me.com>
 * MIT Licensed
 */

var syntaxErrorEMdException = require("./exception/syntaxErrorEMdException");

function operationTranslator() {

}

operationTranslator.prototype = {

  /**
   * translate()
   *
   * Method that get the operation (./operation.js) object and set translated string
   *
   * @parameter {operation} operation
   */
  translate: function(operation) {

    for (var instruction of operation.instructions) {
      this.translateInstruction(instruction, operation);
    }

  },

  /**
   * translateInstruction()
   *
   * Method that get the instruction and translate it to javascript
   *
   * Notes :
   * Call operation.addEMdExceptions( new syntaxErrorEMdException("") ) if you want to declare exceptions
   *
   * @parameter {Array} instruction
   * @parameter {operation} operation
   */
  translateInstruction: function(instruction, operation) {
    var translated = instruction.epuredInstruction;

    //Add coma at the end of the instruction
    if (!operation.hasOutput()) {
      if (instruction.characters[instruction.characters.length - 2] != ";") {
        translated = translated + ";";
      }
    }

    instruction.translated = translated;
  }
}

module.exports = operationTranslator;
