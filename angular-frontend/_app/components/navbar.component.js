/*jshint esversion: 6 */
((app) => {

    app.component("navBar", {

        bindings: {
            onInit: "&",
            screen: "<",
            router: '<'
        },
        selector: 'nav-bar',
        templateUrl: "_app/templates/navbar.template.html",
        controller: ['$scope', '$state', function($scope, $state) {
            var vm = this;
            this.$onInit = function() {
                vm.currentNavItem = "/profile";
                $scope.navItems = [
                    {label: "Profile", route: 'profile'},
                    {label: "People", route: 'people'},
                    {label: "Graph", route: 'graph'},
                    {label: "Login", route: 'login'}
                ]
            }

            $scope.navigate = function(url){
                $state.go(url);
            }
        }],
        controllerAs: "vm",
        bindToController: true
    });

})(angular.module('app'));
