'use strict';

angular.module('hopefr', ['ngRoute', 'firebase', 'ngFileUpload']).config(config).run(run);

function config($routeProvider, $locationProvider, $httpProvider) {

    $httpProvider.interceptors.push('AuthInterceptor');
    $routeProvider
        .when('/', {
            templateUrl: 'home/home.html',
            controller: 'HomeController',
            controllerAs: 'vm',
            access: {
                restricted: false
            }
        })
        .when('/about', {
            templateUrl: 'about/about.html',
            controller: 'AboutController',
            controllerAs: 'vm',
            access: {
                restricted: false
            }

        })
        .when('/dashboard', {
            templateUrl: 'dashboard/dashboard.html',
            controller: 'DashboardController',
            controllerAs: 'vm',
            access: {
                restricted: true
            }

        }).when('/login', {
        templateUrl: 'login/login.html',
        controller: 'LoginController',
        controllerAs: 'vm',
        access: {
            restricted: false
        }

    }).when('/posts', {
        templateUrl: 'post/post.html',
        controller: 'PostController',
        controllerAs: 'vm',
        access: {
            restricted: false
        }

    }).when('/police', {
        templateUrl: 'police/policestations.html',
        controller: 'PoliceController',
        controllerAs: 'vm',
        access: {
            restricted: false
        }
    }).when('/addpolice', {
        templateUrl: 'police/addpolice.html',
        controller: 'PoliceController',
        controllerAs: 'vm',
        access: {
            restricted: true
        }
    }).when('/police/:id', {
        templateUrl: 'police/EditPolice.html',
        controller: 'PoliceController',
        controllerAs: 'vm',
        access: {
            restricted: false
        }

    }).when('/services', {
        templateUrl: 'services/services.html',
        controller: 'ServicesController',
        controllerAs: 'vm',
        access: {
            restricted: false
        }

    }).when('/addservice', {
        templateUrl: 'services/addservices.html',
        controller: 'ServicesController',
        controllerAs: 'vm',
        access: {
            restricted: false
        }

    }).when('/services/:id', {
        templateUrl: 'services/editserviceprovider.html',
        controller: 'ServicesController',
        controllerAs: 'vm',
        access: {
            restricted: false
        }

    }).when('/addpost', {
        templateUrl: 'post/addposts.html',
        controller: 'PostController',
        controllerAs: 'vm',
        access: {
            restricted: true
        }

    }).when('/post/:id', {
        templateUrl: 'post/editpost.html',
        controller: 'PostController',
        controllerAs: 'vm',
        access: {
            restricted: true
        }

    }).when('/healthcenters', {
        templateUrl: 'healthcenters/healthcenters.html',
        controller: 'HealthCenterController',
        controllerAs: 'vm',
        access: {
            restricted: false
        }

    }).when('/addcenter', {
        templateUrl: 'healthcenters/addcenter.html',
        controller: 'HealthCenterController',
        controllerAs: 'vm',
        access: {
            restricted: true
        }
    }).when('/healthcenters/:id', {
        templateUrl: 'services/editcenter.html',
        controller: 'HealthCenterController',
        controllerAs: 'vm',
        access: {
            restricted: true
        }

    }).when('/404', {
        templateUrl: 'error/404.html',
        controller: 'ErrorController',
        controllerAs: 'vm'
    })
        .otherwise({
            redirectTo: '/404'
        });
}


function run($rootScope, $location, $window, AuthFactory) {
    $rootScope.$on('$routeChangeStart', function (event, nextRoute, currentRoute) {
        if (nextRoute.access == undefined && nextRoute.access.restricted && AuthFactory.isLoggedIn) {
            event.preventDefault();
            $location.path('/')
        }
    });
}