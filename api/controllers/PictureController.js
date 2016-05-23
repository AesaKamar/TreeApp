/**
 * PictureController
 *
 * @description :: Server-side logic for managing pictures
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

/**
 * Module dependencies
 */
// includes mv is used in place of fs to copy and move files
var fs = require('fs');
var mv = require('mv');
var im = require('imagemagick');
var path = require('path');
var randomstring = require('randomstring');

module.exports = {
    create: function(req, res) { // create upload stream and database table update
        // Make a random filename to save the picture
        pictureParams = req.params.all();
        pictureParams.file_path = randomstring.generate(7);

        // Upload the file to user directory indicated by owner_id
        req.file('fileData').upload(function(err, files) {
            if (err) {
                console.log(err);
                return res.json(400, err);
            }
            if (files.length < 1) {
                return res.json(400, {
                    fileData: "no file data found"
                });
            }
            var sourceFile = files[0].fd;
            var destinationFile = path.join('private_images', pictureParams.owner.toString(), pictureParams.file_path);
            pictureParams.file_extension = path.extname(sourceFile);
            // move uploaded file from temp dir to owner directory
            mv(sourceFile, destinationFile + pictureParams.file_extension, {
                mkdirp: true
            }, function(err) {
                if (err) {
                    console.log(err);
                } else {
                    // create thumbnail of original upload
                    im.convert(
                        [destinationFile + pictureParams.file_extension,
                            /*'-resize', '100x100',*/
                            destinationFile + '.converted' + '.jpg'
                        ],
                        function(err, stdout) {
                            if (err) {
                                console.log(err);
                                return res.json(400, err);
                            } else {
                                // Attempt to create the picture
                                Picture.create(pictureParams).then(function(picture) {
                                    return res.json(201, {
                                        picture: picture
                                    });
                                });
                            }
                        });
                }
            });
            // Use fs to copy file and delete tmp location\
            if (err) return res.serverError(err);
        });
        //  console.log(req.files'file1'));
    },
    findOne: function(req, res) {
        // Get the parameters of the request
        var pictureParams = req.params.all();
        var matchingRecord;
        // Find the matching picture resource
        Picture.findOne(pictureParams.id).then(function(data) {
            matchingRecord = data;
            //res.attachment(path.join('private_images', String(matchingRecord.owner), matchingRecord.file_path + '.jpg'));
            return res.send(200, matchingRecord);
        });
    },
    image: function(req, res) {
        var pictureParams = req.params.all();
        Picture.findOne(pictureParams.id).then(function(data) {
            matchingRecord = data;
            // Check validations on image read later!

            fs.exists(path.join('private_images', String(matchingRecord.owner), matchingRecord.file_path + '.converted.jpg'), function(exists) {
                // handle result
                res.attachment(path.join('private_images', String(matchingRecord.owner), matchingRecord.file_path + '.converted.jpg'));
                res.download(path.join('private_images', String(matchingRecord.owner), matchingRecord.file_path + '.converted.jpg'));
            });
        });
    }
};
