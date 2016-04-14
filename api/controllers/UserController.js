/**
 * UserController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  //ACTION NAME
  create: function(req, res) {
    //This is what the action will do
    //Creates a User in the database based on
    var params = req.params.all();
    User.create({
      email: params.email
    })
    //CALLBACK ON SUCCESS OR FAIL
    //err contains the error messages if action failed
    //
    //created, or whatever we decide to call it, contains
    //The object that was returned by the action, in this case
    //it is the user that we returned from the User.create() call
    .exec(function createCB(err, created) {
      return res.json({
        notice: created || err
      });
    });
  }
};
