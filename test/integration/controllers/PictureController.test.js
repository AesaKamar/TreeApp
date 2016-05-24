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


    describe('#create()', function() {
        it('should destroy all pictures', function(done) {
            Picture.destroy({})
                .then(done()).catch(done);
        });

        it('should download an image from Google', function(done) {
            // Check existance of directory
            var dir = 'private_images/0';
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir);
            }
            fs.exists('private_images/0/mountains.jpeg', function(exists) {
                if (exists) {
                    fs.unlink('private_images/0/mountains.jpeg');
                }
            });

            download('http://www.gstatic.com/webp/gallery/1.jpg', 'private_images/0/mountains.jpeg', function() {
                done();
            });
        });

        it('should create a new Picture', function(done) {
            User.create({
                    email: 'picture1User@email.com',
                    password: 'password123'
                })
                .then(function() {
                    request(sails.hooks.http.app)
                        .post('/picture')
                        .type('form')
                        .set('Content-Type', 'multipart/form-data')
                        .field('owner', 4)
                        .field('description', "Mountains by Google")
                        .field('file_path', randomstring.generate(7))
                        .attach('fileData', 'private_images/0/mountains.jpeg')
                        .send().expect(201);
                }).then(function(){
                  Picture.find({description: "Mountains by Google"}, function(res){
                    console.log(res);

                  });
                })
                .then(done())
                .catch(done);
        });

    });

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
