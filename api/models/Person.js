/**
 * Person.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    attributes: {
      first_name: {
        type: 'string',
        required: true
      },
      middle_name: {
        type: 'string',
        required: false
      },
      last_name: {
        type: 'string',
        required: true
      },
      date_of_birth: {
        type: 'date',
        required: true
      },
      pictures:{
        collection: 'picture',
        via: 'picture',
        through: 'tag'
      },
      user: {
        model: 'user',
        required: false,
      },
      relations:{
        collection: 'person',
        via: 'related_to',
        through: 'relation'
      },
      toJSON: function() {
        var obj = this.toObject();
        return obj;
      }
    }
  }
};
