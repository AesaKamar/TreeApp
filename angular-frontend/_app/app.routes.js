/*jshint esversion: 6 */
((app) => {

    app.config(['$stateProvider', '$urlRouterProvider', ($stateProvider, $urlRouterProvider) => {

        //Default State
        $urlRouterProvider.otherwise("/graph");

        $stateProvider
            .state('graph', {
                url: '/graph',
                views: {
                    "graph": {

                        template: `<graph name="Blue"></graph>`,
                        resolve: {
                            //Any promises that need to be injected via a dataservice
                            // userlist: (UserService) => {
                            //     return UserService.list();
                            // }
                        }
                    }
                },
            });
    }]);



})(angular.module('app'));