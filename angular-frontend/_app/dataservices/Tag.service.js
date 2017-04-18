(function(app) {
    app.factory('Tag', ['$resource', function($resource) {
        return $resource('/tag/:id', {
            tag: "@tag"
        }, {
            update: { method: 'PUT' },
        });
    }]);
})(angular.module('app'));