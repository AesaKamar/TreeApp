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
            })
            .state('login', {
                url: '/login',
                views: {
                    "login": {
                        template: `<login></login>`,
                        resolve: {}
                    }
                },
            })
            .state('profile', {
                url: '/profile',
                views: {
                    "profile": {
                        template: `<profile></profile>`,
                        resolve: {}
                    }
                },
            })
            .state('gallery', {
                url: '/gallery',
                views: {
                    "gallery": {
                        template: `<gallery></gallery>`,
                        resolve: {}
                    }
                },
            })
            .state('people', {
                url: '/people',
                views: {
                    "people": {
                        template: `<people></people>`,
                        resolve: {}
                    }
                }
            });
    }]);



})(angular.module('app'));
