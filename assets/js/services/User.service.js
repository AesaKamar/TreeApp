(function() {
  angular
    .module('treeApp')
    .factory('User', function($resource) {
      return $resource('/user/:id', {
        user: "@user"
      },
      {
      	update: { method: 'PUT'},
      });
    });
})();
