(function() {
  angular
    .module('treeApp')
    .factory('Relation', function($resource) {
      return $resource('/relation/:relation', {
        relation: "@relation"
      });
    });
})();
