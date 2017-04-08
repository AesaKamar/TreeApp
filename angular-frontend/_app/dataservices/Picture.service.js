(function(app) {
    app.factory('Picture', function($http, $resource) {
        return $resource('/picture/:id', {
            picture: '@picture',
        }, {
            update: { method: 'PUT' },
        });
    });
})(angular.module('treeApp'));