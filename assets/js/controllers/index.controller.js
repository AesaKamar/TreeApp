(function() {
    angular
        .module('treeApp')
        .controller('IndexController', IndexController);

    IndexController.$inject = ['$q', '$scope', '$timeout', 'Person', 'Relation'];

    function IndexController($q, $scope, $timeout, Person, Relation) {


        // Member Variables
        // ===========================================

        // Helper Methods
        // ===========================================
        function personToNode(person) {
            person_node = {
                id: 'n' + String(person.id),
                label: person.first_name + ' ' + person.last_name,
                size: 1,
                x: Math.random(),
                y: Math.random()
            };
            return person_node;
        }

        function relationToEdge(relation) {
            relation_edge = {
                id: "e" + String(relation.id),
                source: "n" + String(relation.related_from),
                target: "n" + String(relation.related_to)
            };
            return relation_edge;
        }

        // Recursively add people to graph
        var search_promises = [];

        function addPersonToGraph(person_id, sigma_engine, max_degree, current_degree, promises) {
            return new Promise(function(resolve, reject) {
                Person.get({
                    id: person_id
                }, function(person) {
                    if (sigma_engine.nodes('n' + person_id)) {
                        return;
                    }
                    sigma_engine.addNode(personToNode(person));
                    Relation.query({
                        related_from: person_id
                    }, function(relations) {
                        _.each(relations, function(relation) {

                            // If not max degree and related_to person not already in graph
                            if (current_degree < max_degree && sigma_engine.nodes('n' + String(relation.related_to)) === undefined) {
                                promises.push(addPersonToGraph(relation.related_to, sigma_engine, max_degree, current_degree + 1, promises).then(function() {
                                    // Add the relation if edge not already in the graph
                                    if (sigma_engine.edges('e' + String(relation.id)) === undefined) {
                                        sigma_engine.addEdge(relationToEdge(relation));
                                    }
                                }));
                            }
                        });
                        resolve();
                    });
                });
            });
        }


        // Initialize sigma engine
        // ===========================================
        $scope.initializeSigma = function(graph) {

            $scope.date = Date.now();
            $scope.Sigma = new sigma({
                renderers: [{
                    container: document.getElementById('GraphContainer'),
                    type: 'webgl' // sigma.renderers.canvas works as well
                }]
            });

            // Build the graph
            // Start with person 4
            addPersonToGraph(_.random(0, 100, false), $scope.Sigma.graph, 4, 0, search_promises).then(function() {
            });
            $q.all(search_promises).then(function(){

              // Force directed graph.
              // Barnes-Hut works best at scale, bad for low density
              $scope.Sigma.refresh();
              $scope.Sigma.startForceAtlas2({
                  worker: true,
                  barnesHutOptimize: false
              });

              // Finally, let's ask our sigma instance to refresh:
              $scope.Sigma.refresh();
              var timeout = 2000;
              $timeout(function() {
                  console.log($scope.Sigma.graph.nodes());
                  console.log($scope.Sigma.graph.edges());
                  $scope.Sigma.refresh();
                  $scope.Sigma.stopForceAtlas2();
              }, timeout);
            });

            // Allow custom shapes
            // FIXME currently disabled because there is no support with webGL renderer
            // CustomShapes.init($scope.Sigma);
            // $scope.Sigma.refresh();

        };

    }
})();
