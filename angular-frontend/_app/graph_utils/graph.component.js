/*jshint esversion: 6 */
((app) => {

    app.component("graph", {

        bindings: {
            name: "@"
        },
        templateUrl: "_app/graph_utils/graph.template.html",
        controllerAs: "vm",
        controller: () => {
            console.log("In Graph Component")
        }

    });



})(angular.module('app'));