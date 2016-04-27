(function() {
  angular
    .module('treeApp')
    .controller('IndexController', IndexController);

  IndexController.$inject = ['$scope', '$timeout', 'Person'];

  function IndexController($scope, $timeout, Person) {


    // Member Variables
    // ===========================================
    $scope.numNodes = 200;
    $scope.numEdges = 200;
    $scope.graph = {
      nodes: [],
      edges: []
    };
    Person.get({id:4}).$promise.then(function(data){
      $scope.person= data;
      console.log(data);
    });

    // Initialize sigma engine
    // ===========================================
    $scope.initializeSigma = function(graph) {
      // Build the graph
      // graph.nodes.push()

      $scope.Sigma = new sigma({
        graph: graph,
        renderers: [{
          container: document.getElementById('GraphContainer'),
          type: 'webgl' // sigma.renderers.canvas works as well
        }]
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
      var timeout= 1000;
      $timeout(function(){$scope.Sigma.stopForceAtlas2();}, timeout);
    };

  }
})();
