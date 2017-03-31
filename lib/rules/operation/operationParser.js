var unknowCharPreventSyntaxChecker = require("./syntaxChecker/unknowCharPreventSyntaxChecker" );
var variableAssignFormatSyntaxChecker = require("./syntaxChecker/variableAssignFormatSyntaxChecker" );

var syntaxCheckerList = [ new unknowCharPreventSyntaxChecker(), 
                          new variableAssignFormatSyntaxChecker() ];

/*!
 * operationParser 
 * 
 * Object that brings methods to parse operation
 * 
 * @param {String} ope String of the operation
 * @param {Interger} operationNumber Position of the operation (Error reporting needs this)
 * 
 * Copyright(c) 20017 Jean-Luc Ranaivoarivao <ranaivoarivaojl@me.com>
 * MIT Licensed
 */
function operationParser( ope, operationNumber ){
  this.syntaxCheckerList = syntaxCheckerList;
  this.ope = ope;
  this.eMdExceptions = [];
  this.splited = [];
  
  ope = removeSeparators( ope );
  this.split = split( ope, operationNumber );
  this.syntaxCheck();
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
  
  console.log(JSON.stringify(splitedOpe, null, 2));
  return splitedOpe;
}

operationParser.prototype = {

  /**
   * syntaxCheck()
   * 
   * Method that pass the splited operation by all syntax check object defined in syntaxCheckerList
   *
   */
   syntaxCheck : function(){
     // Get syntax checkers
     var i = 0;
     for( syntaxChecker of this.syntaxCheckerList ){
       this.eMdExceptions = this.eMdExceptions.concat( syntaxChecker.test( this.splited ) );
       i ++;
     }
   },
   
   /**
    * getEMdExceptions()
    * 
    * Getter that returns all exceptions found in all syntax check done
    * Call after syntaxCheck()
    * 
    * @return {Array} md Returns found (in constructor) eMd strings inside an array
    */
   getEMdExceptions : function(){
     return this.eMdExceptions;
   },
   
   /**
    * getSplited()
    * 
    * Get splitted version of the operation
    * 
    * @return {Array} this.splited
    */
   getSplited : function(){
     return this.splited;
   }
}

module.exports = operationParser;