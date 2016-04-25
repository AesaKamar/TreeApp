var request = require('supertest');

describe('UserController', function() {


  describe('#signup()', function() {
    it('should allow standard signup', function(done) {
      request(sails.hooks.http.app)
        .post('/user')
        .send({
          email: 'good@email.com',
          password: 'goodPass123'
        }).expect(202, done);
    });
    it('should not allow with bad password', function(done) {
      request(sails.hooks.http.app)
        .post('/user')
        .send({
          email: 'bad@email.com',
          password: '23'
        }).expect(400, done);
    });
    it('should not allow duplicate emails', function(done) {
      request(sails.hooks.http.app)
        .post('/user')
        .send({
          email: 'good@email.com',
          password: 'goodPass12345'
        }).expect(400, done);
    });
  });

  describe('#login()', function() {
    it('should not allow an unauthenticated email', function(done) {
      request(sails.hooks.http.app)
        .post('/login')
        .send({
          email: 'random@email.com',
          password: 'test'
        })
        .expect({
          "message": "Incorrect email.",
          "user": false
        }, done);
    });
    it('should login an authenticated user', function(done) {
      request(sails.hooks.http.app)
        .post('/login')
        .send({
          email: 'good@email.com',
          password: 'goodPass123'
        })
        .expect(200, done);
    });
    it('should allow a user to access /index', function(done) {
      request(sails.hooks.http.app)
        .get('/index')
        .expect(200 , done);
    });
  });

});
