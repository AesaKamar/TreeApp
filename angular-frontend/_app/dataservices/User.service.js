(function(app) {
    app.factory('User', ['$resource', function($resource) {
        return $resource('/user/:id', {
            user: "@user"
        }, {
            update: { method: 'PUT' },
        });
    }]);
})(angular.module('app'));