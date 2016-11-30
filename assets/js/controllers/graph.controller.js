(function() {
    angular
        .module('treeApp')
        .controller('GraphController', GraphController);

    GraphController.$inject = ['$scope'];

    function GraphController($scope) {
        var nodes = [
            {
                index   : 0,   
                x       : 0,
                y       : 0,
                vx      : 0,
                vy      : 0,
            },
            {
                index   : 1,   
                x       : 0,
                y       : 0,
                vx      : 0,
                vy      : 0,
            }
        ];
        let simulation = d3.forceSimulation(nodes);
    }
})();