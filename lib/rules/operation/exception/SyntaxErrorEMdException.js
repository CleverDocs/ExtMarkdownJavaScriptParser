var EMdException = require("../../../eMdException");

function SyntaxErrorEMdException(){
  EMdException.apply(this, arguments);
}

module.exports = SyntaxErrorEMdException;