'use strict';

angular.module('hopefr', ['ngRoute','firebase']).config(config);

function config($routeProvider, $locationProvider) {
   //
    $routeProvider
        .when('/', {
            templateUrl: 'home/home.html',
            controller: 'HomeController',
            controllerAs: 'vm'
        })
        .when('/about', {
            templateUrl: 'about/about.html',
            controller: 'AboutController',
            controllerAs: 'vm'

        })
        .when('/dashboard', {
            templateUrl: 'dashboard/dashboard.html',
            controller: 'DashboardController',
            controllerAs: 'vm'

        }).when('/login', {
        templateUrl: 'login/login.html',
        controller: 'LoginController',
        controllerAs: 'vm'

        }).when('/posts', {
            templateUrl: 'post/post.html',
            controller: 'PostController',
            controllerAs: 'vm'

        }).when('/police', {
            templateUrl: 'police/policestations.html',
            controller: 'PoliceController',
            controllerAs: 'vm'

        }).when('/addpolice', {
            templateUrl: 'police/addpolice.html',
            controller: 'PoliceController',
            controllerAs: 'vm'

        }).when('/services', {
            templateUrl: 'services/services.html',
            controller: 'ServicesController',
            controllerAs: 'vm'

        }).when('/addservice', {
            templateUrl: 'services/addservices.html',
            controller: 'ServicesController',
            controllerAs: 'vm'

        }).when('/addpost', {
            templateUrl: 'post/addposts.html',
            controller: 'PostController',
            controllerAs: 'vm'

        }).when('/404', {
            templateUrl: 'error/404.html',
            controller: 'ErrorController',
            controllerAs: 'vm'
        })
        .otherwise({
            redirectTo: '/404'
        });
}


