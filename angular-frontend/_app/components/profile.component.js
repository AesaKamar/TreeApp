/*jshint esversion: 6 */
((app) => {

    app.component("profile", {

        bindings: {
            onInit: "&",
            screen: "<"
        },
        templateUrl: "_app/templates/profile.template.html",
        controller: ['$window', '$scope', function($window, $scope) {
            this.$onInit = function() {
                $scope.userInformation = {email: "DarthPlagueis@gmail.com", password: "hunter2"}
            }
            console.log("In Profile Component");
        }]
    });

})(angular.module('app'));
