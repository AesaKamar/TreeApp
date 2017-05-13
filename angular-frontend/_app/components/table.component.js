/*jshint esversion: 6 */
((app) => {

    app.component("table", {

        bindings: {
            onInit: "&",
            screen: "<"
        },
        templateUrl: "_app/templates/table.template.html",
        styles: ['div { background-color: #fdfdfd; }'],
        controller: ['$scope','$state', '$window', 'Picture', 'Person', 'Relation', 'Tag', function($scope, $state, $window, Picture, Person, Relation, Tag) {

            $scope.People = [];
            Person.query({ last_name: "fixture", limit: 50 }, (data) => {
                Picture.query({ description: "fixture", limit: 50 }, (pics) => {
                    for (var i = 0; i< 50; i++){
                        let namearr = data[i].first_name.split(" ");
                        let person = {
                            first_name: namearr[0],
                            last_name: namearr[1],
                            image: pics[i].image_string
                        }
                        $scope.People.push(person);
                    }
                });
            });

            $scope.query = '';

            $scope.personFilter = function (person) {
                var query = $scope.query.toLowerCase(),
                name = person.first_name.toLowerCase() + ' ' + person.last_name.toLowerCase();
                return name.indexOf(query) > -1;
            };

            $scope.navigate = function(url){
                $state.go(url);
            };

            console.log("In table Component");
        }]
    });

})(angular.module('app'));
