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