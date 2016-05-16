/**
 * PictureController
 *
 * @description :: Server-side logic for managing pictures
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
//var fs = require('fs');
// includes mv is used in place of fs to copy and move files
var mv = require('mv');  
var im = require('imagemagick');
var path = require('path');
var randomstring = require('randomstring');
module.exports = {
  create: function(req, res){ // create upload stream and database table update
  	// Make a random filename to save the picture
  	pictureParams = req.params.all();
  	pictureParams.file_path = randomstring.generate(7);

  	// Attempt to create the picture
  	Picture.create(pictureParams).then(function(picture){
  		// Upload the file to user directory indicated by owner_id
	    req.file('file1').upload(function(err, files){
		    var sourceFile = files[0].fd;
		    var destinationFile = path.join('private_images', picture.owner.toString(), randomstring.generate(7));
		    var fileExtension = path.extname(sourceFile);
		    // move uploaded file from temp dir to owner directory
	       	mv(sourceFile, destinationFile + fileExtension,{mkdirp:true}, function(err){
	       		if(err) {
	       			console.log(err);
	       		}
	       		else{ 
	       			// create thumbnail of oriinal upload
	       			var destinationFileT = destinationFile + fileExtension;
	       			im.convert([destinationFileT, '-resize', '100x100', destinationFile + '.thumbnail'+ fileExtension],
	       				function(err,stdout){
	       					if(err) console.log(err);
	       				})
	       		}

	    	});
	    	// Use fs to copy file and delete tmp location\

	    	if(err) return res.serverError(err);
	    	return res.json({
	    		files: files
	    	});
	    });
  	});



    
  //  console.log(req.files'file1'));
  }
};
