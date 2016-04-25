(function() {
  angular
    .module('treeApp')
    .factory('Tag', function($resource) {
      return $resource('/tag/:tag', {
        tag: "@tag"
      });
    });
})();
