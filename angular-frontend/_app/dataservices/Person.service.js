(function(app) {
    app.factory('Person', function($resource) {
        return $resource('/person/:id', {
            person: "@person"
        }, {
            update: { method: 'PUT' },
        });
    });
})(angular.module('treeApp'));