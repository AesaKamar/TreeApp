/*jshint esversion: 6 */
((app) => {

    app.component("graph", {

        bindings: {
            onInit: "&",
            screen: "<"
        },
        templateUrl: "_app/templates/graph.template.html",
        /* We are inejcting the dataservices into the controller so we have access to them */
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


            vm.GraphContainer = {
                PersonNodes: [],
                RelationLinks: []
            };
            //===============================
            //Build force simulation
            //===============================
            /*NOTE FOR GINKO DEVS ON HOW TO USE NG RESOURCE TO QUERY API

            If you look in the tests, all of the Person, Picture, Tag, and Relation objects have some value called "fixture" so we can search for them
            We are using ngResource to help facilitate the interaction with our API

            The ngResource modules resemble the Models in Sails, and they are defined in angular in the dataservices folder

            The methods it provides are
            {
                'get':    {method:'GET'},
                'query':  {method:'GET', isArray:true},
                'update': {method:'PUT'}
                'save':   {method:'POST'},
                'remove': {method:'DELETE'},
                'delete': {method:'DELETE'}
            };

            Additionally, we can pass an object into the methods and it'll get passed up to the API correctly.

            */
            Person.query({ last_name: "fixture", limit: 50 }, (data) => {
                let additions = data;
                vm.GraphContainer.PersonNodes = _.concat(vm.GraphContainer.PersonNodes, additions)
                    // console.log(vm.GraphContainer);
                restart();
            });
            Relation.query({ classification: "fixture_nuclear", limit: 250 }, (data) => {
                // console.log(data)
                let additions = _.map(data, (e) => {
                    return {
                        source: _.findIndex(vm.GraphContainer.PersonNodes, (_person) => e.related_from === _person.id),
                        target: _.findIndex(vm.GraphContainer.PersonNodes, (_person) => e.related_to === _person.id),
                    }
                });
                vm.GraphContainer.RelationLinks = _.concat(vm.GraphContainer.RelationLinks, additions)
                    // console.log(vm.GraphContainer.RelationLinks);
                restart();
            });

            Relation.query({ classification: "fixture_marriage", limit: 50 }, (data) => {
                // console.log(data)
                let additions = _.map(data, (e) => {
                    return {
                        source: _.findIndex(vm.GraphContainer.PersonNodes, (_person) => e.related_from === _person.id),
                        target: _.findIndex(vm.GraphContainer.PersonNodes, (_person) => e.related_to === _person.id),
                    }
                });
                vm.GraphContainer.RelationLinks = _.concat(vm.GraphContainer.RelationLinks, additions)
                    // console.log(vm.GraphContainer.RelationLinks);
                restart();
                console.log(vm.GraphContainer.PersonNodes);
            });

            /**
            ##:::::'##::::'###::::'########::'##::: ##:'####:'##::: ##::'######:::
            ##:'##: ##:::'## ##::: ##.... ##: ###:: ##:. ##:: ###:: ##:'##... ##::
            ##: ##: ##::'##:. ##:: ##:::: ##: ####: ##:: ##:: ####: ##: ##:::..:::
            ##: ##: ##:'##:::. ##: ########:: ## ## ##:: ##:: ## ## ##: ##::'####:
            ##: ##: ##: #########: ##.. ##::: ##. ####:: ##:: ##. ####: ##::: ##::
            ##: ##: ##: ##.... ##: ##::. ##:: ##:. ###:: ##:: ##:. ###: ##::: ##::
             ###. ###:: ##:::: ##: ##:::. ##: ##::. ##:'####: ##::. ##:. ######:::
            ...::...:::..:::::..::..:::::..::..::::..::....::..::::..:::......::::

            Graph perfmorance is brittle and not optimized. So the force simulation will probably break
            after a few seconds of running

             */




            /*NOTE FOR GINKO DEVS ON HOW TO USE D3 FORCE LAYOUT

            We switched over from v4 to v3 since v3 had a simpler API
            And back to svg, performance is identical if implemented well

            The premise of this is that D3 takes an array of 'nodes' and an array of 'links'

            Nodes get put onto the canvas pretty randomly to start. YOu can add new elements by adding them to this container:
            vm.GraphContainer = {
                PersonNodes: [],
                RelationLinks: []
            };

            Once the are added, call restart to have d3 update the fraph and start the simulation again to lay them out.

            d3 can accept any objects as nodes as long as they have a field called 'id'
            {id: 'something'}

            d3 can accept any objects as links as well as long as they have fields calle 'source' and 'target'
            {source: 'some_node_id', target: 'some_node_id'}

            */
            // add a SVG to the body for our viz
            let svg = d3.select('#graph').append('svg')
                .attr('width', width)
                .attr('height', height);

            //to ensure nodes are drawn on top of links
            svg.append("g").attr("id", "links")
            svg.append("g").attr("id", "nodes")

            // use the force
            let restart = () => {
                var force = d3.layout.force()
                    .size([width, height])
                    .links(vm.GraphContainer.RelationLinks)
                    .nodes(d3.values(vm.GraphContainer.PersonNodes))
                    .gravity(0.05)
                    .linkDistance(100)
                    .charge(-200)
                    .linkStrength(1)
                    .on("tick", tick)
                    .start();

                // setup node definition
                var node = svg.select("#nodes").selectAll('.node')
                    .data(force.nodes())
                    .enter().append('g')
                    .attr('class', 'node')
                    .call(force.drag);


                node.append("text")
                    .attr("class", "nodetext")
                    .attr("x", 20)
                    .attr("y", 40)
                    .attr("fill", '#fdfdfd')
                    .text(function(d) { return d.first_name; });

                // node.append("svg:circle")
                //     .attr("r", 4.5)
                //     .style("fill", "#eee");

                let img1 = 'https://cdn4.iconfinder.com/data/icons/avatars-21/512/avatar-circle-human-male-3-256.png';
                let img2 = 'http://carmeldhanbad.com/site/images/flat-faces-icons-circle-16.png';
                let img3 ='http://www.iconsfind.com/wp-content/uploads/2016/10/20161014_58006befd3376.png';
                let img4 = 'https://cdn4.iconfinder.com/data/icons/avatars-21/512/avatar-circle-human-male-5-512.png';

                var images = node.append("svg:image")
                   .attr("xlink:href", function(){
                                           var imgarr = [img1, img2, img3, img4];
                                           return imgarr[Math.floor(Math.random()*imgarr.length)];
                                       })
                   .attr("x", function(d) { return -25;})
                   .attr("y", function(d) { return -25;})
                   .attr("height", 50)
                   .attr("width", 50);

                var setEvents = images
                     .on( 'mouseenter', function() {
                       // select element in current context
                       d3.select( this )
                         .transition()
                         .attr("x", function(d) { return -60;})
                         .attr("y", function(d) { return -60;})
                         .attr("height", 100)
                         .attr("width", 100);
                     })

                     // set back
                     .on( 'mouseleave', function() {
                       d3.select( this )
                         .transition()
                         .attr("x", function(d) { return -25;})
                         .attr("y", function(d) { return -25;})
                         .attr("height", 50)
                         .attr("width", 50);
                     });

                // setup link definition
                var link = svg.select("#links").selectAll('.link')
                    .data(vm.GraphContainer.RelationLinks)
                    .enter().append('line')
                    .attr('class', 'link');


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
