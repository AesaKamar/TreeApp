const assert = require('assert');
describe('TagModel', function() {

  describe('#create()', function() {
    it('should create a new Tag and associate picture with person', function (done) {
      Tag.create({person: 1, picture:1})
      .then(function(results) {
        Tag.findOne({person:1}).populate('picture')
        .then(function(res){
          assert(res.picture.file_path == 'private_images/bananas.jpg');
          done();
        });
        // some tests
      })
      .catch(done);
    });
  });

  describe('#find()', function() {
    it('should check find function', function (done) {
      Tag.find({id:1})
      .then(function(results) {
        // some tests
        done();
      })
      .catch(done);
    });
  });

});
