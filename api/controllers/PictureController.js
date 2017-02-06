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


module.exports = {
    create: function(req, res) { // create upload stream and database table update
        // Make a random filename to save the picture
        pictureParams = req.params.all();
        pictureParams.file_path = randomstring.generate(7);


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
    destroy: function(req, res) {
        // Get the parameters of the request
        var pictureParams = req.params.all();

        // Find the matching picture resource
        Picture.update({ id: pictureParams.id }, { delete_flag: true, }).exec(function(err, deleted) {
            if (err) {
                return res.send(400, err);
            }
            return res.send(200, deleted[0]); // return deleted record, change display in view
        });
    },

    update: function(req, res) {
        // Get the parameters of the request
        var pictureParams = req.params.all();
        pictureParams.delete_flag = false;

        // Find the matching picture resource
        Picture.update({ id: pictureParams.id }, pictureParams).exec(function(err, updated) {
            if (err) {
                return res.send(400, err);
            }
            return res.send(200, updated[0]); // return updated record, change display in view
        });
    },

    image: function(req, res) {
        var pictureParams = req.params.all();
        Picture.findOne(pictureParams.id).then(function(data) {
            matchingRecord = data;
            // Check validations on image read later!
            var fileLocation = path.join('private_images', String(matchingRecord.owner), matchingRecord.file_path + '.converted.jpg');
            fs.exists(fileLocation, function(exists) {
                // handle result
                res.setHeader('Content-disposition', 'attachment; filename=' + fileLocation);
                res.setHeader('Content-type', 'image/jpg');
                res.download(fileLocation);
            });
        });
    }
};