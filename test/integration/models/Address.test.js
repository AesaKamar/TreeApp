const assert = require('assert');

describe('AddressModel', function() {

  describe('#create()', function() {
    it('should create a new Address', function (done) {
      Address.create({Street: '100 Liberty Rd', city:'Englewood', state:'NJ', zip:'07631', county:'Bergen'})
      .then(function(results) {
        // some tests
        done();
      })
      .catch(done);
    });
  });

});
