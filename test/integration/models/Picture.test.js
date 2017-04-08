const assert = require('assert');
const fs = require('fs');
const Promise = require('bluebird');
const faker = require('faker');
const uuid = require('uuid')
const path = require('path')
const testHelper = require('../../test_helpers')


let bananaImage = fs.readFileSync(__dirname + "/../../misc_test_assets/bananas.jpg").toString('base64')

describe('PictureModel', function() {

    describe('#destroy()', function() {
        it('should destroy all pictures', function(done) {
            Picture.destroy({})
                .then(done()).catch(done);
        });
    });

    describe('#create()', function() {
        it('should create a new Picture', function(done) {
            User.create({
                email: 'pictureUser@email.com',
                password: 'password123'
            }).then(function(res1) {
                Picture.create({
                        file_extension: 'jpg',
                        owner: res1,
                        image_string: bananaImage
                    })
                    .then(function(results) {
                        // some tests
                        assert(results.owner == res1.id);
                        done();
                    })
                    .catch(done);
            });

        });
    });

    describe('bulk create', function() {
        it('should create several fake pictures', function(done) {
            User.create({
                email: 'pictureFakerUser@email.com',
                password: 'password123'
            }).then(function(res1) {
                Picture.create({
                        file_extension: 'jpg',
                        owner: res1,
                        image_string: bananaImage
                    })
                    .then(function(results) {
                        // some tests
                        assert(results.owner == res1.id);
                        done();
                    })
                    .catch(done);
            });

        });
    });
    describe('creation per user', function() {
        it('should create a single picture for each user already created', function(done) {
            //THe only reason we create a user is to satisfy the owner requirement on picture
            User.create({
                email: uuid.v4() + '@email.com',
                password: uuid.v4() + 'password'
            }).then(function(createdUser) {
                Person.find({})
                    .then(
                        (allPeople) => {
                            let results = _(allPeople)
                                // .take(3)
                                .map((x) => x.id)
                                .map((person_id) => {
                                    let emojiFolderPath = __dirname + "/../../emoji_test_images"
                                    let returnValue = new Promise((resolve, reject) => {
                                        resolve(testHelper.getRandomEmojiAsBase64(emojiFolderPath)
                                            .then(
                                                //TODO: We need to capture the 100 promises in an array an wait for them all to resolve
                                                (emojiImageString) => {
                                                    return Picture.create({
                                                        file_extension: 'png',
                                                        owner: createdUser,
                                                        //I need to resolve this promise earlier
                                                        image_string: emojiImageString
                                                    })
                                                },
                                                (err) => {

                                                }))
                                    });
                                    return returnValue
                                })
                                .value()
                                //This results block should be a promise array of created pictures
                            Promise.all(results).then(
                                (createdPictureArray) => {
                                    assert(createdPictureArray.length > 99)
                                    _(createdPictureArray)
                                        .forEach((picture_i) => {
                                            assert(picture_i.image_string)
                                            assert(picture_i.owner == createdUser.id)
                                                // fs.writeFileSync(__dirname + "/../../misc_test_assets/emoji" + uuid.v4() + ".png", picture_i.image_string, { encoding: 'base64' })
                                        })
                                        .value()
                                    done()
                                },
                                (err) => {}
                            )
                        },
                        (err) => {}
                    )
                    // Picture.create({
                    //         file_extension: 'png',
                    //         owner: res1,
                    //         image_string: bananaImage
                    //     })
                    //     .then(function(results) {
                    //         // some tests
                    //         assert(results.owner == res1.id);
                    //         done();
                    //     })
                    //     .catch(done);
            });

        });
    });

    // describe('vadidateFilePath', function() {
    //   it('should validate the existance of a file in private_images', function(done) {
    //     Picture.findOne({
    //         file_path: 'private_images/bananas.jpg',
    //       })
    //       .then(function(results) {
    //         // some tests
    //         fs.access(results.file_path, fs.F_OK, function(err) {
    //           if (!err) {
    //             // Do something
    //             done();
    //           } else {
    //             // It isn't accessible
    //             assert(err === false);
    //           }
    //         });
    //
    //       })
    //       .catch(done);
    //   });
    // });


    describe('#find()', function() {
        it('should check find function', function(done) {
            Picture.find({
                    id: 1
                })
                .then(function(results) {
                    // some tests
                    done();
                })
                .catch(done);
        });
    });

});