(function() {
  angular
    .module('treeApp')
    .factory('Relation', function($resource) {
      return $resource('/relation/:id', {
        relation: "@relation"
      },
      {
      	update: { method: 'PUT'},
      });
    });
})();
