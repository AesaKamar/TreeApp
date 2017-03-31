/*jshint esversion: 6 */
((app) => {

    app.component("navbar", {

        bindings: {
            onInit: "&",
            screen: "<"
        },
        templateUrl: "_app/templates/navbar.template.html",
        controller: ['$window', '$scope', function($window, $scope) {
            var vm = this;
            this.$onInit = function() {
                console.log("In navbar Component");
                vm.currentNavItem = "/profile";
                $scope.navItems = [
                    {label: "Profile", route: "/profile"},
                    {label: "Graph", route: "/graph"},
                    {label: "Login", route: "/login"}
                ]
            }
        }],
        controllerAs: "vm",
        bindToController: true
    });

})(angular.module('app'));
