(function() {
  angular
    .module('treeApp')
    .controller('IndexController', IndexController);

  IndexController.$inject = ['$scope', '$timeout', 'Person', 'Relation'];

  function IndexController($scope, $timeout, Person, Relation) {


    // Member Variables
    // ===========================================


    // Initialize sigma engine
    // ===========================================
    $scope.initializeSigma = function(graph) {

      $scope.Sigma = new sigma({
        renderers: [{
          container: document.getElementById('GraphContainer'),
          type: 'webgl' // sigma.renderers.canvas works as well
        }]
      });

      // Build the graph
      Person.get({
        id: 4
      }, function(data) {
        $scope.Sigma.graph.addNode({
          id: 'n' + String(data.id),
          label: data.first_name,
          size : 1,
          x: Math.random(),
          y: Math.random()
        });
        _.each(data.relations, function(person) {
          $scope.Sigma.graph.addNode({
            id: 'n' + String(person.id),
            label: person.first_name,
            size : 1,
            x: Math.random(),
            y: Math.random()
          });
        });
      }).$promise.then(function(person) {
        Relation.query({
          related_from: person.id
        }, function(data) {
          _.each(data, function(relation) {
            $scope.Sigma.graph.addEdge({
              id:     "e" + String(relation.id),
              source: "n" + String(relation.related_from),
              target: "n" + String(relation.related_to)
            });
          });
        });
      });

      // Allow custom shapes
      // FIXME currently disabled because there is no support with webGL renderer
      // CustomShapes.init($scope.Sigma);
      // $scope.Sigma.refresh();

      // Force directed graph.
      // Barnes-Hut works best at scale, bad for low density
      $scope.Sigma.startForceAtlas2({
        worker: true,
        barnesHutOptimize: false
      });

      // Finally, let's ask our sigma instance to refresh:
      $scope.Sigma.refresh();
      var timeout = 1000;
      $timeout(function() {
        console.log($scope.Sigma.graph.nodes());
        console.log($scope.Sigma.graph.edges());
        $scope.Sigma.refresh();
        $scope.Sigma.stopForceAtlas2();
      }, timeout);
    };

  }
})();
