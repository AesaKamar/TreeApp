(function() {
  angular
    .module('treeApp')
    .controller('IndexController', IndexController);

  IndexController.$inject = ['$scope', '$timeout'];

  function IndexController($scope, $timeout) {


    // Member Variables
    // ===========================================
    $scope.numNodes = 1000;
    $scope.numEdges = 1000;
    $scope.graph = {
      nodes: [],
      edges: []
    };

    // Initialize sigma engine
    // ===========================================
    $scope.initializeSigma = function(graph) {
      // Build the graph
      for (i = 0; i < $scope.numNodes; i++) {
        graph.nodes.push({
          id: 'n' + i,
          label: 'Node' + i,
          x: 100 * Math.cos(2 * i * Math.PI / $scope.numNodes),
          y: 100 * Math.sin(2 * i * Math.PI / $scope.numNodes),
          size: Math.random(),
          color: '#6ef'
        });
      }
      for (i = 0; i < $scope.numEdges; i++) {
        graph.edges.push({
          id: 'e' + i,
          source: 'n' + ((Math.random() * $scope.numNodes) | 0),
          target: 'n' + ((Math.random() * $scope.numNodes) | 0)
        });
      }

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
      var timeout= 5000;
      $timeout(function(){$scope.Sigma.stopForceAtlas2();}, timeout);
    };

  }
})();
