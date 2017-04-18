var request = require('supertest');
var rq = require('request');
const fs = require('fs');
const assert = require('assert');
var faker = require('faker');
var randomstring = require('randomstring');

var download = function(uri, filename, callback) {
    rq.head(uri, function(err, res, body) {
        rq(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
    });
};

describe('PictureController', function() {



    // describe('bulk create', function() {
    //     it('should create 100 picture entities', function(done) {
    //       var promise_array = [];
    //       _.times(10,function(){
    //         request(sails.hooks.http.app)
    //             .post('/picture')
    //             .set('Content-Type', 'multipart/form-data')
    //             .field('owner', 4)
    //             .field('description', faker.name.findName())
    //             .field('file_path', randomstring.generate(7))
    //             .attach('fileData', 'private_images/0/mountains.jpeg')
    //             .send().expect(201, done);
    //       });
    //     });
    // });
});