/*jshint esversion: 6 */
((app) => {

    app.component("people", {

        bindings: {
            onInit: "&",
            screen: "<"
        },
        templateUrl: "_app/templates/people.template.html",
        controller: ['$window', '$scope', function($window, $scope) {
            this.$onInit = function() {
                // $scope.userInformation = {email: "dummyemail@gmail.com", password: "password123"}
            }
            console.log("In People Component");
        }]
    });

})(angular.module('app'));
