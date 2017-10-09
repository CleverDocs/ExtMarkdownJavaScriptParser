/*!
 * EMdElementLorem
 *
 * Parent object that defines an lorem element inside a document
 * This Object if for test purposes
 *
 * @param {String} text
 * @param {Integer} howManyWords
 *
 * Copyright(c) 20017 Jean-Luc Ranaivoarivao <ranaivoarivaojl@me.com>
 * MIT Licensed
 */

class EMdElementLorem extends require("../../EMdElement") {

  constructor(text, howManyWords) {
    super(text);
    this.type = "lorem";

    //Generate the output text
    let loremBaseText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam tristique leo egestas diam placerat dapibus. Etiam et lobortis enim. Phasellus quis odio ultricies, maximus lectus ut, pulvinar quam. Nam neque orci, tempus iaculis ligula sed, accumsan dapibus nisi. Nulla varius lectus nec lorem mattis, non euismod nulla fringilla. Aliquam erat volutpat. Curabitur posuere vestibulum nunc eu maximus. Ut id odio placerat, tristique turpis ac, hendrerit tortor. Ut id vulputate erat. Duis rhoncus mauris id varius tempus. Phasellus vestibulum magna nec ante tristique varius. Mauris ut dolor eu quam euismod suscipit id sed justo. Proin in risus lectus. Proin condimentum, tortor vel malesuada tincidunt, neque nunc euismod ex, at gravida lorem nisl vel ligula. Fusce in sem eu mi sodales condimentum sed vitae lorem. Pellentesque ultricies, massa interdum placerat congue, enim purus egestas neque, a lobortis ligula libero et ipsum. Vestibulum dictum lectus in bibendum tempus. Nunc imperdiet nunc ut interdum mattis. Phasellus sollicitudin ex a ligula aliquet fringilla. Cras sit amet sodales eros. In lorem metus, malesuada non maximus eget, semper sed enim. Nam sodales finibus fringilla. Nam quam tortor, sagittis at tempor at, venenatis vel ligula. In scelerisque ante et odio convallis, interdum euismod sem lacinia. Curabitur eget dui in erat vehicula tempor. Aliquam imperdiet nibh sit amet dui lobortis tempor. Morbi sit amet mi quam. Ut id scelerisque nibh. Mauris et orci dui. Sed sollicitudin semper efficitur. Suspendisse nec ligula in elit tristique ultrices et non ipsum. Aenean id magna id quam imperdiet lacinia at euismod nulla. Integer dapibus metus nec metus porttitor, nec feugiat magna blandit. Phasellus fringilla congue consectetur. Cras lobortis ut metus vel sodales. Nullam odio lorem, egestas at orci sit amet, hendrerit viverra orci. Aenean non ligula sit amet elit fringilla rutrum a eget justo. Donec eget cursus orci. Fusce quis luctus velit. Cras molestie justo eget odio commodo vehicula. Mauris finibus odio ac turpis ornare aliquam. Duis id purus finibus, porta justo eu, pharetra elit. Aenean sit amet elementum leo. Praesent auctor porttitor mauris tristique porta. Donec vitae gravida justo. Nam augue nibh, finibus sed posuere ac, varius nec dolor. Nulla pretium elementum elit, quis dignissim nunc maximus vel. Curabitur mattis tincidunt lectus ac ullamcorper. Fusce non orci sed urna consectetur euismod ac in sapien. Aliquam porta sodales mi eu dignissim. Nullam sapien nisi, ultrices sit amet porta vitae, eleifend nec purus. Maecenas elementum turpis ac nulla volutpat faucibus sit amet nec mi. Sed lectus velit, hendrerit et felis at, tempus scelerisque purus. Nulla fermentum efficitur odio, a egestas lacus interdum ut. Mauris eu ornare quam. Morbi lacinia pharetra mi, a maximus erat. Praesent auctor erat felis, ut dignissim leo aliquet ornare.";

    let loremBaseArray = loremBaseText.split(" ");
    this.generatedText = "";

    var i = 0;
    while (i <= howManyWords) {
      this.generatedText += loremBaseArray[i]
      if( i < howManyWords ){
        this.generatedText += " ";
      }
      i++
    }
  }

  /**
   * getOutput()
   * Returns the regerated lorem
   *
   * @return {String} this.originalText
   */
  getOutput() {
    return this.generatedText;
  }

}

module.exports = EMdElementLorem;
