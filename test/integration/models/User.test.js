describe('UserModel', function() {

  describe('#destroy()', function() {
    it('should destroy all users', function(done) {
      User.destroy({})
        .then(done()).catch(done);
    });
  });

  describe('#create()', function() {
    it('should create a new User', function(done) {
      User.create({
          email: 'name@email.com',
          password: 'password123'
        })
        .then(function(results) {
          // some tests
          done();
        })
        .catch(done);
    });
  });

  describe('#find()', function() {
    it('should check find function', function(done) {
      User.find({
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
