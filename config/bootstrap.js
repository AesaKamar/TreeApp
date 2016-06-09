/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#!/documentation/reference/sails.config/sails.config.bootstrap.html
 */

var schedule = require('node-schedule');
var path = require('path');
var fs = require('fs');

module.exports.bootstrap = function(cb) {

  // It's very important to trigger this callback method when you are finished
  // with the bootstrap!  (otherwise your server will never lift, since it's waiting on the bootstrap)

// Node-schedule 

 
	var rule = new schedule.RecurrenceRule();
	// rule.minute = 1;
	//rule.second = [0, 20, 40];
	rule.minute = [55];
 	//rule.hour = [12];
 
	var j = schedule.scheduleJob(rule, function(){
		
	  	ScanPictureDB();

	});

  cb();
};
function ScanPictureDB(){
	var timeNow = new Date();
	// this function runs on schedule. checks database for Picture records tagged for delete and older than 7 days 
	// delete associated files and db record 
	
	console.log(timeNow + '---------Batch Scheduler Log-----------');
	Picture.find({delete_flag: true}).then(function(pictures,err){
		_.each(pictures, function(rec){
			dateUpdated = new Date(rec.updatedAt);
			var elapsedTime = timeNow - dateUpdated;
			var sevenDays =  (1000*60*60*24*7);
			if(elapsedTime > sevenDays){
				var filesToDelete =['.converted.jpg','.jpg'];
				for(i=0;i<filesToDelete.length;i++){
					var fileLocation = path.join('private_images', String(rec.owner), rec.file_path + filesToDelete[i]);
					fs.unlinkSync(fileLocation);
						Picture.destroy({id: rec.id}).then(function(res,err){
						if(err) console.log(err);
					});
				} 
			}
			
		});
	});
}
