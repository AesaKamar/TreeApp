(function(app) {
    app.factory('Person', ['$resource', function($resource) {
        return $resource('/person/:id', {
            person: "@person"
        }, {
            update: { method: 'PUT' },
        });
    }]);
})(angular.module('app'));