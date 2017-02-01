(function(app) {
    app.factory('Tag', function($resource) {
        return $resource('/tag/:id', {
            tag: "@tag"
        }, {
            update: { method: 'PUT' },
        });
    });
})(angular.module('treeApp'));