(function() {
  angular
    .module('treeApp')
    .factory('User', function($resource) {
      return $resource('/user/:user', {
        user: "@user"
      });
    });
})();
