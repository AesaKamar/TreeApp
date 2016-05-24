(function() {
  angular
    .module('treeApp')
    .factory('Tag', function($resource) {
      return $resource('/tag/:id', {
        tag: "@tag"
      },
      {
      	update: { method: 'PUT'},
      });
    });
})();
