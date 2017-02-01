(function(app) {
    app.factory('User', function($resource) {
        return $resource('/user/:id', {
            user: "@user"
        }, {
            update: { method: 'PUT' },
        });
    });
})(angular.module('treeApp'));