/*jshint esversion: 6 */
((app) => {

    app.component("graph", {

        bindings: {
            onInit: "&",
            screen: "<"
        },
        templateUrl: "_app/graph_utils/graph.template.html",
        controller: ['$window', function($window) {
            this.$onInit = function() {

            }

            console.log("In Graph Component");


            let width = $window.innerWidth;
            let height = $window.innerHeight;

            let canvas = d3.select("graph").append("canvas")
                .attr("width", width)
                .attr("height", height);

            var color = d3.scaleOrdinal(d3.schemeCategory20);

            var simulation = d3.forceSimulation()
                .force("link", d3.forceLink().id(function(d) { return d.id; }))
                .force("charge", d3.forceManyBody())
                .force("center", d3.forceCenter(width / 2, height / 2));

            d3.json("_app/graph_utils/miserables.json", function(error, graph) {
                if (error) throw error;

                var link = canvas.append("g")
                    .attr("class", "links")
                    .selectAll("line")
                    .data(graph.links)
                    .enter().append("line")
                    .attr("stroke-width", function(d) { return Math.sqrt(d.value); });

                var node = canvas.append("g")
                    .attr("class", "nodes")
                    .selectAll("circle")
                    .data(graph.nodes)
                    .enter().append("circle")
                    .attr("r", 5)
                    .attr("fill", function(d) { return color(d.group); })
                    .call(d3.drag()
                        .on("start", dragstarted)
                        .on("drag", dragged)
                        .on("end", dragended));

                node.append("title")
                    .text(function(d) { return d.id; });

                simulation
                    .nodes(graph.nodes)
                    .on("tick", ticked);

                simulation.force("link")
                    .links(graph.links);

                function ticked() {
                    link
                        .attr("x1", function(d) { return d.source.x; })
                        .attr("y1", function(d) { return d.source.y; })
                        .attr("x2", function(d) { return d.target.x; })
                        .attr("y2", function(d) { return d.target.y; });

                    node
                        .attr("cx", function(d) { return d.x; })
                        .attr("cy", function(d) { return d.y; });
                }
            });




            function dragstarted(d) {
                if (!d3.event.active) simulation.alphaTarget(0.3).restart();
                d.fx = d.x;
                d.fy = d.y;
            }

            function dragged(d) {
                d.fx = d3.event.x;
                d.fy = d3.event.y;
            }

            function dragended(d) {
                if (!d3.event.active) simulation.alphaTarget(0);
                d.fx = null;
                d.fy = null;
            }


        }]

    });



})(angular.module('app'));
