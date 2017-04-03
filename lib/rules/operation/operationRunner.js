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

function operationRunner( ops ){
  for( op of ops ){
    for( instruction of op.instructions ){
      console.log(instruction.translated);
    }
  }
}

operationRunner.prototype = {
  
}

module.exports = operationRunner;
