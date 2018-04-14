'use strict';

angular.module('hopefr', ['ngRoute', 'firebase', 'ngFileUpload']).config(config).run(run);

function config($routeProvider, $locationProvider, $httpProvider) {

    $httpProvider.interceptors.push('AuthInterceptor');
    $routeProvider
        .when('/', {
            templateUrl: 'home/home.html',
            controller: 'HomeController',
            controllerAs: 'vm',
            isLogin: true
        })
        .when('/about', {
            templateUrl: 'about/about.html',
            controller: 'AboutController',
            controllerAs: 'vm',
            isLogin: true

        })
        .when('/dashboard', {
            templateUrl: 'dashboard/dashboard.html',
            controller: 'DashboardController',
            controllerAs: 'vm',
            isLogin: true
        }).when('/login', {
        templateUrl: 'login/login.html',
        controller: 'LoginController',
        controllerAs: 'vm',
        isLogin: true

    }).when('/posts', {
        templateUrl: 'post/post.html',
        controller: 'PostController',
        controllerAs: 'vm',
        isLogin: true

    }).when('/police', {
        templateUrl: 'police/policestations.html',
        controller: 'PoliceController',
        controllerAs: 'vm',
        isLogin: true
    }).when('/addpolice', {
        templateUrl: 'police/addpolice.html',
        controller: 'PoliceController',
        controllerAs: 'vm',
        isLogin: false
    }).when('/police/:id', {
        templateUrl: 'police/EditPolice.html',
        controller: 'PoliceController',
        controllerAs: 'vm',
        isLogin: false

    }).when('/services', {
        templateUrl: 'services/services.html',
        controller: 'ServicesController',
        controllerAs: 'vm',
        isLogin: true

    }).when('/addservice', {
        templateUrl: 'services/addservices.html',
        controller: 'ServicesController',
        controllerAs: 'vm',
        isLogin: false

    }).when('/services/:id', {
        templateUrl: 'services/editserviceprovider.html',
        controller: 'ServicesController',
        controllerAs: 'vm',
        isLogin: false

    }).when('/addpost', {
        templateUrl: 'post/addposts.html',
        controller: 'PostController',
        controllerAs: 'vm',
        isLogin: false
        

    }).when('/post/:id', {
        templateUrl: 'post/editpost.html',
        controller: 'PostController',
        controllerAs: 'vm',
        isLogin: false

    }).when('/healthcenters', {
        templateUrl: 'healthcenters/healthcenters.html',
        controller: 'HealthCenterController',
        controllerAs: 'vm',
        isLogin: true

    }).when('/addcenter', {
        templateUrl: 'healthcenters/addcenter.html',
        controller: 'HealthCenterController',
        controllerAs: 'vm',
        isLogin: false
    }).when('/healthcenters/:id', {
        templateUrl: 'services/editcenter.html',
        controller: 'HealthCenterController',
        controllerAs: 'vm',
        isLogin: false
    }).when('/404', {
        templateUrl: 'error/404.html',
        controller: 'ErrorController',
        controllerAs: 'vm',
        isLogin: true
    })
        .otherwise({
            redirectTo: '/404'
        });


}


function run($rootScope, $location, $window, AuthFactory) {
    $rootScope.$on('$routeChangeStart', function (event, nextRoute, currentRoute) {
    var userAuthenticated = false;
    if(firebase.auth.Auth.currentUser != null){
        userAuthenticated =  true;
        console.log("Logged in");
    }else{
        userAuthenticated = false;
        console.log("Not Logged in");
    }
    if (!userAuthenticated && !nextRoute.isLogin) {
        /* You can save the user's location to take him back to the same page after he has logged-in */
        $rootScope.savedLocation = $location.url();
        $location.path('/');
        console.log("denied");
        //vm.message = "Please login Before you access these sections";
       }
    });
}


