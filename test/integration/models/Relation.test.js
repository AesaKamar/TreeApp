const assert = require('assert');
var Promise = require('bluebird');

describe('RelationModel', function() {

  describe('#destroy()', function() {
    it('should destroy all relations', function(done) {
      Relation.destroy({})
        .then(done()).catch(done);
    });
  });

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

  describe('Multiple Relations', function() {
    var p;
    it('should create a family', function(done) {
      Promise.all([
          Person.create({
            first_name: 'Apple',
            last_name: 'Flowers'
          }),
          Person.create({
            first_name: 'Banana',
            last_name: 'Flowers'
          }),
          Person.create({
            first_name: 'Carrot',
            last_name: 'Flowers'
          }),
          Person.create({
            first_name: 'Debby',
            last_name: 'Flowers'
          })
        ])
        .then(Person.count()).then(function(res) {
          p = res;
          assert(res.length == 4);
        })
        .then(done).catch(done);
    });
    it('should add relations to the family', function(done) {
      Promise.all([
          Relation.create({
            related_from: p[0],
            related_to: p[1],
            classification: 'wife'
          }),
          Relation.create({
            related_from: p[1],
            related_to: p[0],
            classification: 'husband'
          }),
          Relation.create({
            related_from: p[0],
            related_to: p[2],
            classification: 'son'
          }),
          Relation.create({
            related_from: p[0],
            related_to: p[3],
            classification: 'daughter'
          })
        ]).then(Relation.count()).then(function(res) {
          assert(res.length == 4);
        })
        .then(done).catch(done);
    });
    it('should validate relation querying', function(done) {
      Person.findOne(4).populate('relations').then(function(res) {
        // console.log(res.relations);
      }).then(done).catch(done);
    });
  });

});
