/*jshint esversion: 6 */
((app) => {
    app.config(['$mdThemingProvider', function($mdThemingProvider) {

        // Use that theme for the primary intentions
        $mdThemingProvider.theme('default')
            .primaryPalette('orange').dark()
            .accentPalette('amber').dark();

    }]);
})(angular.module('app'))