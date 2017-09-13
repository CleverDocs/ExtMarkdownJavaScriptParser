/*!
 * Rule
 *
 * Parent Object for Rules
 *
 * Copyright(c) 20017 Jean-Luc Ranaivoarivao <ranaivoarivaojl@me.com>
 * MIT Licensed
 */

class Rule {

  constructor(options = {}){
    if (options.tagsEnabled !== undefined && options.tagsEnabled == true) {
      this.tagsEnabled = true;
    } else {
      this.tagsEnabled = false;
    }

    this.tag = "span";
    this.classes = [ "emd" ];
    this.idAttribute = "emd-id";
    this.attributes = [];
  }

  /**
   * parse()
   * Get a markdown string and returns rule
   * This method is destined to be overriden
   *
   * @param {String} md String to convert
   * @return {String} md String converted with the rule applyed
   */
   parse( md ){
     return md;
   }

   /**
    * parseAndGetObjects()
    * Get a markdown string and returns array of object representing the document
    * This method is destined to be overriden
    *
    * @param {String} md String to convert
    * @return {Array} md Array
    */
   parseAndGetObjects( md ){
     return [ md ];
   }

   /**
    * getTag()
    * When tags is activated, this methods provide the tag for the rule
    *
    * @return {String}
    */
   getTag(){
     return this.tag;
   }

   /**
    * getClasses()
    * When tags is activated, this methods provide the classes for tag
    *
    * @return {Array} List of classes
    */
   getClasses(){
     return this.classes;
   }

   /**
    * getIdAttribute()
    * When tags is activated, this methods provide the attributes for tag
    *
    * @return {String}
    */
   getIdAttribute(){
     return this.idAttribute;
   }

   /**
    * getOtherAttributes()
    * When tags is activated, this methods provide the attributes for tag
    *
    * @return {Array} List of attributes and respective values
    */
   getOtherAttributes(){

     if( this.typeAttribute ){
       this.attributes.push( { attr: this.typeAttribute, value: this.typeAttributeValue } );
     }

     return this.attributes;
   }
}

module.exports = Rule;
