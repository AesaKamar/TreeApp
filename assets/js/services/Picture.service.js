(function() {
  angular
    .module('treeApp')
    .factory('Picture', function($resource) {
      return $resource('/picture/:picture', {
        picture: "@picture"
      });
    });
})();
