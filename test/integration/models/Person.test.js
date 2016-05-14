const assert = require('assert');

describe('PersonModel', function() {

  describe('#destroy()', function() {
    it('should destroy all people', function(done) {
      Person.destroy({})
        .then(done()).catch(done);
    });
  });

  describe('#create()', function() {
    it('should create a new Person', function(done) {
      Person.create({
          first_name: 'Apple',
          last_name: 'Banana'
        })
        .then(function(results) {
          // some tests
          createdPerson = results;
          done();
        })
        .catch(done);
    });
  });

  describe('#update({user:"someUser"})', function() {
    it('should associate a User to the Person', function(done) {

      User.create({
          email: 'associateUser@email.com',
          password: 'password123'
        })
        .then(function(user_res) {
          // some tests
          Person.update({
            first_name: 'Apple'
          }, {
            user: user_res
          }).exec(function(err, res) {
            Person.findOne({
              first_name: 'Apple'
            }).populate('user').exec(function(err1, res1) {
              assert(res1.user.email == user_res.email);
              done();
            });
          });

        })
        .catch(done);
    });
  });

  describe('#find()', function() {
    it('should check find function', function(done) {
      Person.find({
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
