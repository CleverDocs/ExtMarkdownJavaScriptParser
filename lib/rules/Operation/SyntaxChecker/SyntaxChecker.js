/*!
 * SyntaxChecker
 * Parent Object for Syntax checker Objects
 *
 * Copyright(c) 20017 Jean-Luc Ranaivoarivao <ranaivoarivaojl@me.com>
 * MIT Licensed
 */

class SyntaxChecker {

  constructor() {
    //This is an abstract class
    if (new.target === SyntaxChecker) {
      throw new Error("Cannot construct Abstract instances directly");
    }
  }

  /**
   * Main function
   * Handle operation and perform test
   * Intended to be overrided
   *
   * @param {EMdElementOperation} ope The object operation
   */
  test(ope) {}
}

module.exports = SyntaxChecker;
