(function(app) {
    app.factory('Relation', function($resource) {
        return $resource('/relation/:id', {
            relation: "@relation"
        }, {
            update: { method: 'PUT' },
        });
    });
})(angular.module('treeApp'));