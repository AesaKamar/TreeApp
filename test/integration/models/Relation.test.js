const assert = require('assert');

describe('RelationModel', function() {

  describe('#create()', function() {
    it('should relate 2 People', function(done) {
      var person1, person2;
      Person.create({
          first_name: 'Carrot',
          last_name: 'Durian'
        })
        .then(function(results) {
          person1 = results;
          Person.create({
              first_name: 'Durian',
              last_name: 'Eggplant'
            })
            .then(function(results) {
              person2 = results;
            }).then(function() {
              //Link the people both ways
              Relation.create({
                related_from: person1,
                related_to: person2,
                classification: 'Father'
              }).then(function(res) {
                Relation.create({
                  related_from: person2,
                  related_to: person1,
                  classification: 'Son'
                });
                done();
              });
            });
        })
        .catch(done);
    });
  });

  describe('#createValidation()', function() {
    it('should check if a Person has Relations', function(done) {
      // some tests
      Person.findOne({
          first_name: 'Carrot'
        }).populate('relations').then(function(res) {
          assert(res.relations[0].first_name == 'Durian');
          done();
        })
        .catch(done);
    });
  });

  describe('#find()', function() {
    it('should check find function', function(done) {
      Relation.find({
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
