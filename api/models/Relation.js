/**
 * Relation.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    classification: {
      type: 'string',
      required: true
    },

    related_to: {
      model: 'person'
    },
    related_from: {
      model: 'person'
    },

    toJSON: function() {
      var obj = this.toObject();
      return obj;
    }
  }
};
