/*!
 * operationTranslator
 * 
 * Object that brings methods to translate operations to JavaScript executable code strings
 * 
 * Copyright(c) 20017 Jean-Luc Ranaivoarivao <ranaivoarivaojl@me.com>
 * MIT Licensed
 */

function operationTranslator(){
  
}

operationTranslator.prototype = {

  /**
   * translate()
   * 
   * Method that get the operation (./operation.js) object and set translated string 
   *
   * @parameter {operation} operation 
   */
   translate : function( operation ){
     for( instruction of operation.instructions ){
       this.translateInstruction( instruction );
     }
   },
   
   /**
    * translateInstruction()
    * 
    * Method that get the instruction and translate it to javascript
    *
    * @parameter {Array} instruction 
    */
   translateInstruction : function( instruction ){
     var translated = instruction.epuredInstruction;
     
     //Add coma at the end of the instruction
     if( instruction.characters[ instruction.characters.length-2 ] != ";" ){
       translated = translated+";";
     }
     
     instruction.translated = translated;
   }
}

module.exports = operationTranslator;