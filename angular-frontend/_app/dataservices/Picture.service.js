(function(app) {
    app.factory('Picture', ['$resource', function($resource) {
        return $resource('/picture/:id', {
            picture: '@picture'
        }, {
            update: { method: 'PUT' },
        });
    }]);
})(angular.module('app'));