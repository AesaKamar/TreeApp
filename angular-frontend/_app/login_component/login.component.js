/*jshint esversion: 6 */
((app) => {

    app.component("login", {

        bindings: {
            onInit: "&",
            screen: "<"
        },
        templateUrl: "_app/login_component/login.template.html",
        controller: ['$window', function($window) {
            this.$onInit = function() {

            }
            console.log("In Login Component");
        }]
    });

})(angular.module('app'));
