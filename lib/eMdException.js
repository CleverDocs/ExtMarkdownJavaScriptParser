function EMdException( message ) {
  this.message = message;
}

EMdException.prototype = new EMdException;

module.exports = EMdException;