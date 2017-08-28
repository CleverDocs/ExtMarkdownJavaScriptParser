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
var tools = new Tools();

class OperationRunner {

  constructor() {
    this.varPattern = /[A-Za-z-_]{1,}/g;
    this.undefinedChain = "??";
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

    var varToReturnName = tools.generateRandomString(10);
    var code = "var " + varToReturnName + " = [];\n";

    //variables collector

    var varStack = [];
    for (var op of ops) {

      for (var instruction of op.instructions) {
        var varStackInst = instruction.translated.match(this.varPattern);
        if (varStackInst) {
          varStack = varStack.concat(varStackInst);
        }
      }

    }

    varStack = varStack.filter(tools.arrayUnique);

    for (var variable of varStack) {
      code = code + "\nvar " + variable + ";";
    }

    for (op of ops) {

      /*
       * Notes :
       * Call op.RuntimeErrorEMdException( new syntaxErrorEMdException("") ) if you want to declare exceptions
       */

      var hasOutput = op.hasOutput();

      for (var inst of op.instructions) {
        if (!hasOutput) {
          code += inst.translated + "\n";
        }
      }

      if (hasOutput) {
        code += varToReturnName + ".push(" + instruction.translated + ");\n";
      } else {
        code += varToReturnName + ".push(null);\n";
      }

    }

    code += "return " + varToReturnName + ";";

    var result;

    try {
      result = new Function(code)();
    } catch (e) {
      result = false;
    }

    if (result) {
      var i = 0;
      for (var res of result) {
        if (res === undefined) {
          result[i] = this.undefinedChain;
        } else {
          result[i] = this.prepareForDisplay(res);
        }
        i++;
      }
    }

    return result;
  }
}

module.exports = OperationRunner;
