const assert = require('assert');
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
                })
                .catch(done);
               })
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

});
