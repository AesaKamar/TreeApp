(function(app) {
    app.factory('Relation', ['$resource', function($resource) {
        return $resource('/relation/:id', {
            relation: "@relation"
        }, {
            update: { method: 'PUT' },
        });
    }]);
})(angular.module('app'));