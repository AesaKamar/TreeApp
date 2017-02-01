/**
 * ViewController
 *
 * @description :: Server-side controller for serving static views rendered by gulp
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
let viewsSrc = '/usr/src/app/angular-frontend/';
module.exports = {
    //ACTION NAME
    default: function(req, res) {
        res.sendfile(viewsSrc + 'familygraph.html');
    }
};