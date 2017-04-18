const assert = require('assert');
const Promise = require('bluebird')

describe('TagModel', function() {

    describe('#destroy()', function() {
        it('should destroy all tags', function(done) {
            Tag.destroy({})
                .then(done()).catch(done);
        });
    });

    

    describe('#create()', function() {
        it('should create a new Tag and associate picture with person', function(done) {
            var found_person, found_picture = {};
            Person.find().limit(1).then(function(person_instance) {
                found_person = person_instance[0];
                // console.log(found_person.id);
            }).then(function(res) {
                Picture.find().limit(1)
                    .then(function(picture_instance) {
                        found_picture = picture_instance[0];
                        // console.log(found_picture.id);
                    }).then(function(res) {
                        assert(found_person.id !== undefined);
                        assert(found_picture.id !== undefined);
                        Tag.create({
                            person: found_person.id,
                            picture: found_picture.id
                        }).then(function(res) {
                            assert(found_person.id !== undefined);
                            assert(found_picture.id !== undefined);
                            Tag.find({
                                person: found_person.id,
                                picture: found_picture.id
                            }).limit(1).populate('picture').then(function(res) {
                                assert(res[0].picture.file_path == found_picture.file_path);
                                done();
                            });
                        });

                    });
            })

            .catch(done);

        });
    });

    describe('#find()', function() {
        it('should check find function', function(done) {
            Tag.find({
                    id: 1
                })
                .then(function(results) {
                    // some tests
                    done();
                })
                .catch(done);
        });
    });


    describe('#createOneTag()', function(){
        it('should create a tag for a sepcific person to a picture', 
        (done)=>{
           Person.findOne({
               id: 2
           })
           .then((a_person)=>{
               Picture.findOne(2)
               .then((a_picture)=>{
                Tag.create({
                  person: a_person,
                  picture: a_picture
                })
                .then((a_tag)=>{
                    assert(a_tag.id);
                    assert(a_tag.person = a_person.id);
                    assert(a_tag.picture = a_picture.id);
                    done();
                });
               });
           });
        });
    });

    /*NOTE FOR GINKO DEVS ON Test fixtures

    You'll notice that the tests we use to seed data for use in playing with the front-end are called 'Creating fixtures'
    I tried to use this pattern in the other models's tests as well.

    We have a test fixture in Person.test.js that creates 100 person objects.
    In this test, we find those 100 people who have a last name of 'fixture'

   We also have a test fixture in Picture.test.js that create 100 picture objects.
   In this test, we find those 100 pictures that have a description of 'fixture'

   Now its time to link the two by virtue of a Tag
   So we grab the list of Person objects and the list of Picture objects
   And we simply create a tag which references them both

   And we save hem to the database and assert that they get created normally

    */
    describe('Creating fixtures', function() {
        it('should link 100 Person fixtures with 100 Picture fixtures', (done) => {
            Promise.join(
                    Person.find({ last_name: "fixture" }).sort('id ASC'),
                    Picture.find({ description: "fixture" }).sort('id ASC'),
                    (persons, pictures) => {
                        return _.zipWith(persons, pictures, (_person, _picture) => {
                            return Tag.create({ person: _person, picture: _picture })
                        })
                    }
                ).then((tagsPromiseRes) => Promise.all(tagsPromiseRes))
                .then((tagsRes) => {
                    assert(_.every(tagsRes, (_tag) => _tag.id))
                    done()
                })

        });
    });


    describe('#destroyOneTagByTagId()',function(){
        it('should delete a specific tag by tag id, unlink a person to a picture',
        (done)=>{
            Tag.destroy({id: 1})
            .then(()=>{
                assert()
                done();
            })
            .catch(done);
        });
    });

    describe('#UpdateOneTag()', function() {
        it('should change the information of a tag', 
        (done)=> {
            Tag.find({
                    id: 1
                })
                .then((a_tag)=> {

                    // some tests
                    done();
                })
                .catch(done);
        });
    });        


    describe('#createOneTag()', function() {
        it('should creat a tag for a sepcific person to a picture',
            (done) => {
                Person.findOne({
                        id: 1
                    })
                    .then((a_person) => {
                        Picture.findOne(1)
                            .then((a_picture) => {
                                Tag.create({
                                        person: a_person,
                                        picture: a_picture
                                    })
                                    .then((a_tag) => {
                                        assert(a_tag.id);
                                        assert(a_tag.person = a_person.id);
                                        assert(a_tag.picture = a_picture.id);
                                        done();
                                    })
                                    .catch(done);
                            })
                    })
            });
    });

});
