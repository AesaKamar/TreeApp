(function() {
  angular
    .module('treeApp')
    .factory('Person', function($resource) {
      return $resource('/person/:id', {
        person: "@person"
      });
    });
})();
