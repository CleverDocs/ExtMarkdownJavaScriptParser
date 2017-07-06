/*!
 * operationRunner
 *
 * Object that receive operations on constructor, run all of them consecutively and set all output
 *
 * @param {Array} ops Array composed by operations object
 *
 * Copyright(c) 20017 Jean-Luc Ranaivoarivao <ranaivoarivaojl@me.com>
 * MIT Licensed
 */

var runtimeErrorEMdException = require("./exception/runtimeErrorEMdException");

function operationRunner(){

}

/**
 * generateRandomString()
 * Generate random string with given length
 *
 * @source http://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
 * @return {Integer} len
 */
function generateRandomString( len ){
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    for( var i=0; i < len; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

/**
 * isFloat()
 * Is float
 *
 * @source http://stackoverflow.com/questions/3885817/how-do-i-check-that-a-number-is-float-or-integer
 * @parameter {Mixed} n
 * @return {Boolean}
 */
function isFloat(n){
    return Number(n) === n && n % 1 !== 0;
}

/**
 * prepareForDisplay()
 * Prepare a value for display
 *
 * @parameter {Mixed} val
 * @return {Mixed} val
 */
function prepareForDisplay( val ){

  //Round
  if( isFloat( val ) ){
    val = Math.round(val * 100) / 100;
  }

  //Convert to string
  if( val ){
    val = val.toString();
  }

  return val;
}

operationRunner.prototype = {

  /**
   * run()
   * Get an array composed of operations and execute
   * Will return an array of output
   *
   * @return {Array}
   */
  run: function( ops ){

    var varToReturnName = generateRandomString(10);
    var code = "var "+varToReturnName+" = [];\n";

    for( var op of ops ){

      /*
      * Notes :
      * Call op.runtimeErrorEMdException( new syntaxErrorEMdException("") ) if you want to declare exceptions
      */

      var hasOutput = op.hasOutput();

      for( var instruction of op.instructions ){
        if( !hasOutput ){
          code += instruction.translated+"\n";
        }
      }

      if( hasOutput ){
        code += varToReturnName+".push("+instruction.translated+");\n";
      }else{
        code += varToReturnName+".push(null);\n";
      }

    }

    code += "return "+varToReturnName+";";

    var result;

    try{
      result = new Function(code)();
    }catch( e ){
      result = false;
    }

    if( result ){
      var i=0;
      for( var res of result ){
        result[i] = prepareForDisplay( res );
        i++;
      }
    }

    return result;
  }

};

module.exports = operationRunner;
