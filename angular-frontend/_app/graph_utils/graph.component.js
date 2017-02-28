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

            var canvas = document.querySelector("canvas"),
                context = canvas.getContext("2d");

            canvas.width = width;
            canvas.height = height;

            var context = document.querySelector("canvas").getContext("2d");
            var color = d3.scaleOrdinal(d3.schemeCategory20);

            var simulation = d3.forceSimulation()
                .force("link", d3.forceLink().id(function(d){return d.id;}))
                .force("charge", d3.forceManyBody())
                .force("center", d3.forceCenter());

            d3.json("_app/graph_utils/miserables.json", function(error, graph) {
                if (error) throw error;

                simulation
                    .nodes(graph.nodes)
                    .on("tick", ticked);

                simulation.force("link")
                    .links(graph.links);

                d3.select(canvas)
                    .call(d3.drag()
                        .container(canvas)
                        .subject(dragsubject)
                        .on("start", dragstarted)
                        .on("drag", dragged)
                        .on("end", dragend));

                function ticked() {
                    context.clearRect(0, 0, width, height);
                    context.save();
                    context.translate(width/2, height/2);

                    context.beginPath();
                    graph.links.forEach(drawLink);
                    context.strokeStyle = "#aaa";
                    context.stroke();

                    context.beginPath();
                    graph.nodes.forEach(drawNode);
                    context.fill();
                    context.strokeStyle = "#fff";
                    context.stroke();

                    context.restore();
                }

                function drawLink(d){
                    context.moveTo(d.source.x, d.source.y);
                    context.lineTo(d.target.x, d.target.y);
                }

                function drawNode(d){
                    context.moveTo(d.x+3, d.y);
                    context.arc(d.x, d.y, 3, 0, 2 * Math.PI);
                }

                function dragsubject(){
                    return simulation.find(d3.event.x - width / 2, d3.event.y - height / 2);
                }

                function dragstarted() {
                    if (!d3.event.active) simulation.alphaTarget(0.3).restart();
                    console.log(d3.event);
                    console.log(d3.event.subject);
                    d3.event.subject.fx = d3.event.subject.x;
                    d3.event.subject.fy = d3.event.subject.y;
                }

                function dragged() {
                    d3.event.subject.fx = d3.event.x;
                    d3.event.subject.fy = d3.event.y;
                }

                function dragend() {
                    if (!d3.event.active) simulation.alphaTarget(0);
                    d3.event.subject.fx = null;
                    d3.event.subject.fy = null;
                }

            });

        }]

    });



})(angular.module('app'));
