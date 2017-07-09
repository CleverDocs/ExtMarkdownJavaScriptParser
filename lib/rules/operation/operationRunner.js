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
var Tools = require("../../tools/tools");

var tools = new Tools();

function operationRunner() {

}

/**
 * prepareForDisplay()
 * Prepare a value for display
 *
 * @parameter {Mixed} val
 * @return {Mixed} val
 */
function prepareForDisplay(val) {

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

operationRunner.prototype = {

  /**
   * run()
   * Get an array composed of operations and execute
   * Will return an array of output
   *
   * @return {Array}
   */
  run: function(ops) {

    var varToReturnName = tools.generateRandomString(10);
    var code = "var " + varToReturnName + " = [];\n";

    for (var op of ops) {

      /*
       * Notes :
       * Call op.runtimeErrorEMdException( new syntaxErrorEMdException("") ) if you want to declare exceptions
       */

      var hasOutput = op.hasOutput();

      for (var instruction of op.instructions) {
        if (!hasOutput) {
          code += instruction.translated + "\n";
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
        result[i] = prepareForDisplay(res);
        i++;
      }
    }

    return result;
  }

};

module.exports = operationRunner;
