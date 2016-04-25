(function() {
  angular
    .module('treeApp')
    .factory('Person', function($resource) {
      return $resource('/person/:person', {
        person: "@person"
      });
    });
})();
