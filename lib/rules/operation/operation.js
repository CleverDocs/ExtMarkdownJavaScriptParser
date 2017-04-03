/*!
 * operation 
 * 
 * Parent Object for Rules
 * 
 * @param {String} opeString 
 * @param {Interger} operationNumber Position of the operation (Error reporting needs this)
 * 
 * Copyright(c) 20017 Jean-Luc Ranaivoarivao <ranaivoarivaojl@me.com>
 * MIT Licensed
 */

var operationParser = require("./operationParser");
var operationTranslator = require("./operationTranslator");

function operation( opeString, operationNumber ) {
  
  this.eMdExceptions = [];
  
  this.opeString = opeString;
  this.operationNumber = operationNumber;
  this.operationParser = new operationParser();
  this.operationTranslator = new operationTranslator();
  this.instructions = split( removeSeparators( this.opeString ), this.operationNumber );
  
  this.eMdExceptions = this.operationParser.syntaxCheck( this );
  this.operationTranslator.translate( this );
}

/**
 * isLineBreak()
 * 
 * Detect if the variable given in parameter is a line break
 * 
 * @parameter {String} chr 
 * @return {Boolean} 
 */
function isLineBreak( chr ){
  if( chr.match(/\n/g) ){
    return true;
  }else{
    return false;
  }
}

/**
 * removeWhitespaces()
 * 
 * Remove whitespace from string
 * 
 * @parameter {String} ope 
 * @return {String} ope Returns '' if no whitespace
 */
function removeWhitespaces( ope ){
  //Remove all Whitespace
  ope = ope.replace(/\s/g,'');

  if( ope ){
    return ope;
  }else{
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
function removeSeparators ( ope ){
  //Remove {{ }}
  ope = ope.replace(/\{\{/g, "");
  ope = ope.replace(/\}\}/g, "");

  return ope;
}

/**
 * split()
 * 
 * Core function that split an operation into an array with a defined format
 * 
 * @parameter {String} ope String of the operation
 * * @parameter {String} operationNumber Position of the operation (Error reporting needs this)
 * @return {Array} splitedOpe
 */
function split( ope, operationNumber ){
  var splitedOpe = [];
  var i = 0;
  var instructionCounter = 0;
  var columnCounter = 0;
  var lineCounter = 0;

  if( ope ){
    opeSlitted = ope.split('');
    for( charOpe of opeSlitted ){
      if( opeSlitted[ i-1 ] === undefined || isLineBreak( opeSlitted[ i-1 ] )  ){
        if( splitedOpe.length > 0 ){
          instructionCounter++;
        }

        lineCounter++;
        columnCounter=1;

        splitedOpe[instructionCounter] = {};
        splitedOpe[instructionCounter].characters = [];
      }

      //Set positions of the char
      var characterToPush = {};
      characterToPush.character = charOpe;
      characterToPush.position = {};

      characterToPush.position.line = lineCounter;
      characterToPush.position.column = columnCounter;
      characterToPush.position.operationNumber = operationNumber+1;
      splitedOpe[instructionCounter].characters.push( characterToPush );

      columnCounter++;
      i++;
    }
  }

  var splitedOpeWithoutBlank = [];
  var i = 0;
  for( instructionOpe of splitedOpe ){
    var mergedOpe = '';
    for( ope of instructionOpe.characters ){
      mergedOpe += ope.character;
    }

    //Remove blank 
    var epuredInstruction = removeWhitespaces( mergedOpe );
    if( epuredInstruction != '' ){
      instructionOpe.epuredInstruction = epuredInstruction;
      splitedOpeWithoutBlank.push( instructionOpe );
    }

    i++;
  }
  splitedOpe = splitedOpeWithoutBlank;

  //console.log(JSON.stringify(splitedOpe, null, 2));
  return splitedOpe;
}

operation.prototype = {

  /**
   * Return the string of the operation
   * 
   * @return {String} this.opeString String of the operation
   */
  getString : function(){
    return this.opeString;
  },
  
  /**
   * Return the operation position given in constructor
   * 
   * @return {Interger}
   */
  getOperationNumber : function(){
    return this.operationNumber;
  },
  
  /**
   * getInstructions()
   *
   * Return instructions array
   * 
   * @return {Array}
   */
  getInstructions : function(){
    return this.instructions;
  }
  
}


module.exports = operation;