const assert = require('assert');
var Promise = require('bluebird');
var faker = require('faker');
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

    describe('Creating fixtures', function() {
        it('should create 100 random people', function(done) {
            var promise_array = [];
            _.times(100, function() {
                promise_array.push(
                    Person.create({
                        first_name: faker.name.findName(),
                        last_name: "fixture"
                    })
                );
            });
            Promise.all(promise_array)
                .then(function() {
                    Person.count({}).then(function(count) {
                        assert(count > 99);
                    });
                })
                .then(done())
                .catch(done);
        });

        //@NOTE Deprecated in favor of nuclear family relations in Relation.Test.js
        // it('should create 500 random relations', function(done) {
        //     var promise_array = [];
        //     _.times(500, function() {
        //         promise_array.push(
        //             Relation.create({
        //                 related_from: _.random(1, 100, false),
        //                 related_to: _.random(1, 100, false),
        //                 classification: 'son'
        //             })
        //         );
        //     });
        //     Promise.all(promise_array)
        //         .then(function() {
        //             Relation.count({}).then(function(count) {
        //                 assert(count > 499);
        //             });
        //         }).then(function() {
        //             Relation.find({
        //                 id: 400
        //             }).then(function(res) {
        //                 assert(res);
        //                 done();
        //             });
        //         })
        //         .catch(done);
        // });

        // it('should still have 500 relation records', function(done) {
        //     Relation.count({}).then(function(count) {
        //             assert(count > 450);
        //         })
        //         .then(function() {
        //             // some tests
        //             done();
        //         })
        //         .catch(done);
        // });

    });
});