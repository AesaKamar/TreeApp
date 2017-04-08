/*jshint esversion: 6 */
((app) => {

    app.component("graph", {

        bindings: {
            onInit: "&",
            screen: "<"
        },
        templateUrl: "_app/templates/graph.template.html",
        controller: ['$window', 'Picture', 'Person', 'Relation', 'Tag', function($window, Picture, Person, Relation, Tag) {
            this.$onInit = function() {

                console.log("In Graph Component");

            };
            let vm = this;

            //===============================
            //Setup graph container responsivley
            //===============================
            let width = $window.innerWidth;
            let height = $window.innerHeight;

            var canvas = document.querySelector("canvas"),
                context = canvas.getContext("2d");
            canvas.width = width;
            canvas.height = height;

            var context = document.querySelector("canvas").getContext("2d");
            var color = d3.scaleOrdinal(d3.schemeCategory20);

            vm.GraphContainer = {
                PersonNodes: [],
                RelationLinks: []
            };
            //===============================
            //Build force simulation
            //===============================
            // Person.query({ last_name: "fixture" }, (data) => {
            //     // let goodData = _.map(data, (e) => _.assign({}, e))
            //     let goodData = _.map(data, (e) => ({ id: e.id }))
            //     vm.GraphContainer.PersonNodes = (goodData)
            //     console.log(vm.GraphContainer);
            //     simulation.restart()
            // });
            vm.GraphContainer.PersonNodes = [
                { id: 1 },
                { id: 2 },
                { id: 1 },
                { id: 1 },
                { id: 1 }
            ];
            // console.log(vm.GraphContainer.PersonNodes)




            //===============================
            //Build force simulation
            //===============================
            var simulation = d3.forceSimulation()
                .force("link", d3.forceLink().id(function(d) { return d.id; }))
                .force("charge", d3.forceManyBody())
                .force("center", d3.forceCenter());

            simulation
                .nodes(vm.GraphContainer.PersonNodes)
                .on("tick", ticked);

            simulation.force("link")
                .links(vm.GraphContainer.RelationLinks);

            d3.select(canvas)
                .call(d3.drag()
                    .container(canvas)
                    .subject(dragsubject)
                    .on("start", dragstarted)
                    .on("drag", dragged)
                    .on("end", dragend));

            //===============================
            //Dataservce <-> Graph transform methods
            //===============================
            // function()

            //===============================
            //Create event handlers
            //===============================
            function restart() {

                // Apply the general update pattern to the nodes.
                node = node.data(vm.GraphContainer.PersonNodes, function(d) { return d.id; });
                node.exit().remove();
                node = node.enter().append("circle").attr("fill", function(d) { return color(d.id); }).attr("r", 8).merge(node);

                // Apply the general update pattern to the links.
                link = link.data(vm.GraphContainer.RelationLinks, function(d) { return d.source.id + "-" + d.target.id; });
                link.exit().remove();
                link = link.enter().append("line").merge(link);

                // Update and restart the simulation.
                simulation.nodes(nodes);
                simulation.force("link").links(links);
                simulation.alpha(1).restart();
            }

            function ticked() {
                context.clearRect(0, 0, width, height);
                context.save();
                context.translate(width / 2, height / 2);

                context.beginPath();
                vm.GraphContainer.RelationLinks.forEach(drawLink);
                context.strokeStyle = "#aaa";
                context.stroke();

                context.beginPath();
                // console.log(vm.GraphContainer.PersonNodes)
                vm.GraphContainer.PersonNodes.forEach(drawNode);
                context.strokeStyle = "#fff";
                context.stroke();

                context.restore();
            }

            function drawLink(d) {
                context.moveTo(d.source.x, d.source.y);
                context.lineTo(d.target.x, d.target.y);
            }

            function drawNode(d) {
                context.moveTo(d.x + 3, d.y);
                context.arc(d.x, d.y, 10, 0, 2 * Math.PI);
                context.fillStyle = "#white";
                context.fill();
            }

            function dragsubject() {
                return simulation.find(d3.event.x - width / 2, d3.event.y - height / 2);
            }

            function dragstarted() {
                if (!d3.event.active) simulation.alphaTarget(0.3).restart();
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


        }]

    });



})(angular.module('app'));