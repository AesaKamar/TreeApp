const assert = require('assert');
const fs = require('fs');

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
            file_path: res1.id + '/bananas',
            file_extension: 'jpg',
            owner: res1
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
