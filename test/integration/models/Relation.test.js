const assert = require('assert');
const Promise = require('bluebird');
const testHelper = require('../../test_helpers')

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

    /*NOTE FOR GINKO DEVS ON Test fixtures

    You'll notice that the tests we use to seed data for use in playing with the front-end are called 'Creating fixtures'
    I tried to use this pattern in the other models's tests as well. 

    We have a fixture in Person.test.js that creates 100 person objects. 
    In this test, we find those 100 people who have a last name of 'fixture'
    
    We need to represent the idea of a family, so we group the list of 100 People into groups of 5
    for each group of 5, we will create relations between each of them. 
    *Technical note*: The set of relations in one family is equal to the cartesian product of a family group with itself with a unique source and target

    Once we have all the relations, we just create them. 

    */
    describe('Create fixtures', function() {
        it('should create loosely coupled family structures', (done) => {
            Promise.all(Person.find({ last_name: "fixture" }).sort('id ASC'))
                .then((persons) => {
                    //Arrange all the persons into groups of 5. 
                    //Resolve the unique permutations of each chunked group of people
                    let chunkedFamilyGroups = _.chunk(persons, 5);
                    //Need to create relations between each pair 
                    let familyRelationsToCreate = _.map(chunkedFamilyGroups, (family) => {
                        let familyById = _.map(family, (member) => member.id)
                        let allPermutations = testHelper.cartesianProduct(familyById, familyById);
                        let uniqueRelations = _.filter(allPermutations, (relation) => relation[0] != relation[1])
                        return uniqueRelations
                    })
                    return Promise.resolve(familyRelationsToCreate)
                })
                .then((families) => {
                    //From each family permutation group, create the relations
                    let nestedFamilyCreationPromises = _(families)
                        .map((family) => {
                            return _.map(family, (relation) => {
                                return Relation.create({ related_to: relation[0], related_from: relation[1], classification: "fixture_nuclear" })
                            })
                        })
                        .value();
                    let flattenedFamilyGroups = _.flatten(nestedFamilyCreationPromises)
                        // console.log(flattenedStuff)
                    return Promise.resolve(flattenedFamilyGroups)
                })
                .then((promiseArray) => Promise.all(promiseArray))
                .then((resolvedRelationPromises) => {
                    //Assert everything was created successfully
                    assert(_.every(resolvedRelationPromises, (relation) => relation.id))
                    Promise.resolve('Good to go!')
                })
                .then(done())
                .catch(done);
        });
    });

});