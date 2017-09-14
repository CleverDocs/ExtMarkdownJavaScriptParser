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
var RuntimeErrorEMdException = require("./exception/RuntimeErrorEMdException");
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

    /*var varStack = [];
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

    code = code + "\n";*/

    var opCounter = 0;

    for (var op of ops) {

      var hasOutput = op.hasOutput();

      //Variable collector

      var varStack = [];

      var varCollectorCounter = 0;
      while (varCollectorCounter <= opCounter) {

        if (ops[varCollectorCounter].isExecutionSuccess() || ops[varCollectorCounter].isExecuted() == false) {
          for (var instruction of ops[varCollectorCounter].instructions) {
            var varStackInst = instruction.translated.match(this.varPattern);
            if (varStackInst) {
              var varStackInstWithoutAssign = []
              for (var varStackList of varStackInst) {
                var varStackListArray = varStackList.split("=");
                varStackInstWithoutAssign.push(varStackListArray[0]);
              }

              varStack = varStack.concat(varStackInstWithoutAssign);
            }
          }
        }

        varCollectorCounter++;
      }

      var codeTest = "";

      varStack = varStack.filter(tools.arrayUnique);
      var varStackString = "";
      for (var variable of varStack) {
        varStackString = varStackString + "\nvar " + variable + ";";
      }
      varStackString = varStackString + "\n";

      var codeTest = varStackString + code;

      for (var inst of op.instructions) {
        if (!hasOutput) {
          codeTest += inst.translated + "\n";
        } else {
          codeTest += "var " + tools.generateRandomString(50) + "=" + inst.translated + "\n";
        }
      }

      op.setExecuted();
      try {
        var testResult = new Function(codeTest)();
      } catch (e) {
        op.addEMdExceptions([new RuntimeErrorEMdException(e.message)]);
      }
      if (op.isExecutionSuccess()) {

        var newCode = ""

        for (var inst of op.instructions) {
          newCode += inst.translated + "\n";
        }

        if (!hasOutput) {
          varToReturnList.push(null);
          code += newCode;
        } else {
          varToReturnList.push(new Function(varStackString + code + "return " + newCode + "\n")());
        }

      } else {
        varToReturnList.push(false);
      }

      opCounter++;
    }

    var i = 0;
    for (var res of varToReturnList) {
      if (res === false) {
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
