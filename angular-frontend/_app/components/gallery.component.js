/*jshint esversion: 6 */
((app) => {

    app.component("gallery", {

        bindings: {
            onInit: "&",
            screen: "<"
        },
        templateUrl: "_app/templates/gallery.template.html",
        styles: ['div { background-color: #fdfdfd; }'],
        controller: ['$scope', function($scope) {
            $scope.Images = [{'uri' : "http://georgetownradio.com/wp/wp-content/uploads/2012/11/Action+Bronson+Bronson.jpg"},{'uri' : "http://georgetownradio.com/wp/wp-content/uploads/2012/11/Action+Bronson+Bronson.jpg"}];

            console.log("In gallery Component");
        }]
    });

})(angular.module('app'));
