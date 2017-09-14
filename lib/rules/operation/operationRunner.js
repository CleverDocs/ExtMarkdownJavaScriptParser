/*!
 * OperationRunner
 *
 * Object that receive operations on constructor, run all of them consecutively and set all output
 *
 * @param {Array} ops Array composed by operations object
 *
 * Copyright(c) 20017 Jean-Luc Ranaivoarivao <ranaivoarivaojl@me.com>
 * MIT Licensed
 */

var Tools = require("../../tools/tools");
var RuntimeErrorEMdException = require("./exception/RuntimeErrorEMdException" );
var tools = new Tools();

class OperationRunner {

  constructor() {
    this.varPattern = /[A-Za-z-_]{1,}\=/g;
    this.chainUndefined = "??";
  }

  /**
   * prepareForDisplay()
   * Prepare a value for display
   *
   * @parameter {Mixed} val
   * @return {Mixed} val
   */
  prepareForDisplay(val) {

    //Round
    if (tools.isFloat(val)) {
      val = Math.round(val * 100) / 100;
    }

    //Convert to string
    if (val) {
      val = val.toString();
    }

    return val;
  }

  /**
   * run()
   * Get an array composed of operations and execute
   * Will return an array of output
   *
   * @return {Array}
   */
  run(ops) {

    var code = "";
    var varToReturnList = [];

    //variables collector

    var varStack = [];
    for (var op of ops) {

      for (var instruction of op.instructions) {
        var varStackInst = instruction.translated.match(this.varPattern);
        if (varStackInst) {
          var varStackInstWithoutAssign = []
          for (var varStackList  of varStackInst) {
            var varStackListArray = varStackList.split("=");
            varStackInstWithoutAssign.push( varStackListArray[0] );
          }

          varStack = varStack.concat(varStackInstWithoutAssign);
        }
      }

    }

    varStack = varStack.filter(tools.arrayUnique);

    for (var variable of varStack) {
      code = code + "\nvar " + variable + ";";
    }

    code = code + "\n";

    for (op of ops) {

      /*
       * Notes :
       * Call  if you want to declare exceptions
       */

      var hasOutput = op.hasOutput();
      var codeTest = code;

      for (var inst of op.instructions) {
        if (!hasOutput) {
          codeTest += inst.translated + "\n";
        }else{
          codeTest += "var "+tools.generateRandomString(50) + "=" + inst.translated + "\n";
        }
      }

      var executionWithoutException = true;

      try {
        var testResult = new Function(codeTest)();
        executionWithoutException = true;
      } catch (e) {
        op.addEMdExceptions( [ new RuntimeErrorEMdException( e.message ) ] );
        executionWithoutException = false;
      }

      if( executionWithoutException ){
        for (var inst of op.instructions) {
          if (!hasOutput) {
            code += inst.translated + "\n";
            varToReturnList.push( null );
          }else{
            code += "return " + inst.translated + "\n";
            varToReturnList.push( new Function(code)() );
          }
        }

      }else{
        varToReturnList.push( false );
      }
    }

    var i = 0;
    for (var res of varToReturnList) {
      if (res === false ) {
        varToReturnList[i] = this.chainUndefined;
      } else {
        varToReturnList[i] = this.prepareForDisplay(res);
      }
      i++;
    }

    return varToReturnList;
  }
}

module.exports = OperationRunner;
