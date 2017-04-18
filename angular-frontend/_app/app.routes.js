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
                        resolve: {
                            //Any promises that need to be injected via a dataservice
                            // userlist: (UserService) => {
                            //     return UserService.list();
                            // }
                        }
                    }
                },
            })
            .state('profile', {
                url: '/profile',
                views: {
                    "profile": {
                        template: `<profile></profile>`,
                        resolve: {

                        }
                    }
                },
            })
            .state('people', {
                url: '/people',
                views: {
                    "people": {
                        template: `<people></people>`,
                        resolve: {

                        }
                    }
                }
            });
    }]);



})(angular.module('app'));
