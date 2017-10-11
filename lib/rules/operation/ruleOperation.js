/*!
 * RuleOperation
 *
 * Rule that in charge of all operations
 * Extends Rule
 *
 * For example, this rule can converts {{1+1}} syntax to "2"
 *
 * Copyright(c) 20017 Jean-Luc Ranaivoarivao <ranaivoarivaojl@me.com>
 * MIT Licensed
 */

const EMdElement = require("../../EMdElement");
const EMdElementOperation = require("./EMdElementOperation");
const RuntimeErrorEMdOperationException = require("./EMdOperationException/RuntimeErrorEMdOperationException");
const ToolKit = require("../../ToolKit");
const toolKit = new ToolKit();

class RuleOperation extends require("../../Rule") {

  constructor() {
    super();
    this.operationPattern = /\{\{(.*?[\s\S]*?)\}\}/g;
    this.varPattern = /[A-Za-z-_0-9]{1,}\=/g;
    this.chainUndefined = "??";
  }

  /**
   * parse()
   * Entrypoint of the rule
   * This method get a EMdDocument and split this in parts with EMdElement
   * and return another EMdDocument
   *
   * @param  {EMdDocument} eMdDocument
   * @return {Array} eMdElmentList Array composed with list of new EMdElement
   */
  parse(eMdDocument) {
    var operationCounter = 0;
    let newEMdElementList = this.matchAndSplit(eMdDocument, this.operationPattern, function(text) {
      return new EMdElementOperation(text, operationCounter, eMdDocument.getFullOriginalText());
    });

    return this.execute(newEMdElementList);
  }

  /**
   * execute()
   * This function iterates on EMdElementOperation inside an array and makes operations
   *
   * @TODO Change all these ugly loops to map
   *
   * @param {Array} eMdElementList Array composed with EMdElementOperation
   * @return {Array} eMdElementList Returns the same array as parameter
   */
  execute(eMdElementList) {

    var code = "";
    var varToReturnList = [];
    var elementCounter = 0;

    for (var op of eMdElementList) {
      if (op instanceof EMdElementOperation) {
        var hasOutput = op.hasOutput();

        //Variable collector
        var varStack = [];

        var varCollectorCounter = 0;
        while (varCollectorCounter <= elementCounter) {
          if (eMdElementList[varCollectorCounter]instanceof EMdElementOperation) {
            if (eMdElementList[varCollectorCounter].isExecutionSuccess() || eMdElementList[varCollectorCounter].isExecuted() == false) {
              for (var instruction of eMdElementList[varCollectorCounter].instructions) {
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
          }
          varCollectorCounter++;
        }

        //Preserve variable list from doublons
        varStack = varStack.filter(toolKit.arrayUnique);

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
            codeTest += "var " + toolKit.generateRandomString(50) + "=" + inst.translated + "\n";
          }
        }

        op.setExecuted();
        try {
          var testResult = new Function(codeTest)();
        } catch (e) {
          //@TODO Find a way to get line/colum number
          op.addException(new RuntimeErrorEMdOperationException(e.message, op.getOperationNumber()));
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
      }

      elementCounter++;
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

    var i = 0;
    for (var op of eMdElementList) {
      if (op instanceof EMdElementOperation) {
        op.setOutput( varToReturnList[i] );
        i++;
      }
    }

    return eMdElementList;
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
    if (toolKit.isFloat(val)) {
      val = Math.round(val * 100) / 100;
    }

    //Convert to string
    if (val) {
      val = val.toString();
    }

    return val;
  }

}

module.exports = RuleOperation;
