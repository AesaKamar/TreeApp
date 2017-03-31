/**
 * Picture.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

var fs = require("fs");
module.exports = {

    attributes: {
        description: {
            type: 'text',
            required: false
        },
        // This describes the original file extension.
        // All served imgages are converted to PNG
        file_extension: {
            type: 'string',
            required: true,
        },
        image_string: {
            type: 'string',
            required: true
        },
        metadata: {
            type: 'json',
            required: false
        },
        owner: {
            model: 'user',
            required: true,
        },
        people: {
            collection: 'person',
            via: 'person',
            through: 'tag'
        },
        delete_flag: {
            type: 'boolean',
            defaultsTo: false,
        },
        toJSON: function() {
            var obj = this.toObject();
            return obj;
        },
    },
    beforeCreate: function(values, cb) {
        cb();
        //Make sure filename is checked out
    }
};