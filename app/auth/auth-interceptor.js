angular.module('hopefr').factory('AuthInterceptor', AuthInterceptor);

function AuthInterceptor($location, $q,AuthFactory) {
    

    return {
        request: request,
        response: response,
        responseError: responseError
    };

    function  request(config) {
        config.headers = config.headers || {};


        return config;
        
    }

    function response(response) {

        if(firebase.auth.Auth.currentUser != null){
            AuthFactory.isLoggedIn =  true;
            console.log("Logged in");
        }else{
            AuthFactory.isLoggedIn = false;
        }

        return response || $q.when(response);
    }

    function responseError(rejection) {
        if(rejection.status === 401 || rejection.status===403){
            AuthFactory.isLoggedIn = false;
            $location.path('/')
        }

        return $q.reject(rejection);
    }
}