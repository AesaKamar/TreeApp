/**
 * ViewController
 *
 * @description :: Server-side controller for serving static views rendered by gulp
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
let viewsSrc = '/usr/src/app/angular-frontend/_app/';
module.exports = {
    //ACTION NAME
    default: function(req, res) {
        // Send the page w/ out data
        res.sendfile(viewsSrc + 'app.html');
    }
};