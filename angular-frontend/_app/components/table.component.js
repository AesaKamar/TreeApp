/*jshint esversion: 6 */
((app) => {

    app.component("table", {

        bindings: {
            onInit: "&",
            screen: "<"
        },
        templateUrl: "_app/templates/table.template.html",
        styles: ['div { background-color: #fdfdfd; }'],
        controller: ['$scope', function($scope) {
            $scope.People = [{'first_name': "Hank", 'last_name': "Snuffalufogus", 'image': "http://www.eyeglassboy.com/images/1bobdylan.jpg"}, {'first_name': "Bob",'last_name': "Dylan", 'image': "http://www.eyeglassboy.com/images/1bobdylan.jpg"}, {'first_name': "Darlene",'last_name': "Darlano", 'image': "http://www.eyeglassboy.com/images/1bobdylan.jpg"}, {'first_name': "Billy",'last_name': "TheAdult", 'image': "http://www.eyeglassboy.com/images/1bobdylan.jpg"}]

            console.log("In table Component");
        }]
    });

})(angular.module('app'));
