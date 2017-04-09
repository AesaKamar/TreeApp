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

            // set a width and height for our SVG
            let margin = 0.8,
                width = $window.innerWidth * margin,
                height = $window.innerHeight * margin;

            // var canvas = document.querySelector("canvas"),
            //     context = canvas.getContext("2d");
            // canvas.width = width;
            // canvas.height = height;

            // var context = document.querySelector("canvas").getContext("2d");
            // var color = d3.scaleOrdinal(d3.schemeCategory20);

            vm.GraphContainer = {
                PersonNodes: [],
                RelationLinks: []
            };
            //===============================
            //Build force simulation
            //===============================
            Person.query({ last_name: "fixture", limit: 100 }, (data) => {
                vm.GraphContainer.PersonNodes = data
                console.log(vm.GraphContainer);
                restart();
            });
            Relation.query({ classification: "fixture_nuclear", limit: 500 }, (data) => {
                console.log(data)
                vm.GraphContainer.RelationLinks = _.map(data, (e) => {
                    return {
                        source: _.findIndex(vm.GraphContainer.PersonNodes, (_person) => e.related_from === _person.id),
                        target: _.findIndex(vm.GraphContainer.PersonNodes, (_person) => e.related_to === _person.id),
                    }
                });
                console.log(vm.GraphContainer.RelationLinks);
                restart();
            });
            // vm.GraphContainer.PersonNodes = [
            //     { id: 1 },
            //     { id: 2 },
            //     { id: 1 },
            //     { id: 1 },
            //     { id: 1 }
            // ];
            // console.log(vm.GraphContainer.PersonNodes)





            // log to console for debugging
            // console.log(JSON.stringify(links, null, 4));
            // console.log('nodes:');
            // console.log(JSON.stringify(nodes, null, 4));

            // add a SVG to the body for our viz
            var svg = d3.select('#graph').append('svg')
                .attr('width', width)
                .attr('height', height);

            // use the force
            let restart = () => {
                var force = d3.layout.force()
                    .size([width, height])
                    .nodes(d3.values(vm.GraphContainer.PersonNodes))
                    .links(vm.GraphContainer.RelationLinks)
                    .on("tick", tick)
                    .linkDistance(100)
                    .charge(-300)
                    .start();

                // setup link definition
                var link = svg.selectAll('.link')
                    .data(vm.GraphContainer.RelationLinks)
                    .enter().append('line')
                    .attr('class', 'link');

                // setup node definition
                var node = svg.selectAll('.node')
                    .data(force.nodes())
                    .enter().append('g')
                    .attr('class', 'node')
                    .call(force.drag);


                node.append('image')
                    .attr('xlink:href', (d) => "http://www.iconshock.com/img_vista/FLAT/food/jpg/banana_icon.jpg")
                    .attr("x", (d) => -25)
                    .attr("y", (d) => -25)
                    .attr("height", 50)
                    .attr("width", 50);

                // tick function to create curved lines and move things around    
                function tick(e) {
                    link.attr('x1', (d) => d.source.x)
                        .attr('y1', (d) => d.source.y)
                        .attr('x2', (d) => d.target.x)
                        .attr('y2', (d) => d.target.y);

                    node.attr("transform", function(d) {
                        return "translate(" + d.x + "," + d.y + ")";
                    });
                }
            }
            restart();


        }]

    });



})(angular.module('app'));