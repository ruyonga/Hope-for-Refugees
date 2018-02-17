/**
 * Created by ruyonga on 10/02/2018.
 */

angular.module('hopefr')
    .controller('LoginController', LoginController);

function LoginController($location, AuthFactory) {

    var vm = this;
    vm.name = "Daniel";
    vm.showbar = false;
    vm.title = "Login";

    vm.isLoggedIn = function () {
        if(AuthFactory.isLoggedIn){
            vm.loggedinUser = firebase.auth().currentUser.displayName;
            return true;
        }else{
            return false;
        }
    };


    /**
     * Sign into the dashboard to login
     */
    vm.login = function () {
console.log("Called Login module");
    firebase.auth()
        .signInWithEmailAndPassword(vm.username,vm.password)
        .catch(function(error) {
            if(error){
                 console.log("erro"+error.code);
                 console.log("Error message"+error.message);
                 vm.error = error.message;
                 vm.isLoggedIn  = false
                AuthFactory.isLoggedIn = false;
            }else{
                vm.message = "Logged In";
                console.log("logged In");
                vm.isLoggedIn  = true;
                AuthFactory.isLoggedIn = true;
            }
    });

};

    /**
     * Logout of the app
     */
    vm.logout = function () {
        firebase.auth().signOut().then(function() {
            console.log("Logged out!");
            vm.message = "Logout Successfully";
            AuthFactory.isLoggedIn = false;
        }, function(error) {
            console.log(error.code);
            console.log(error.message);
            vm.error(error.message);
        });
    };

    // {
    //     "rules": {
    //     "users": {
    //
    //         "$uid": {
    //             ".write": "$uid === auth.uid",
    //                 ".read": true
    //         }
    //
    //     }
    // }
    // }

    // if(!firebase.auth().currentUser) {
    //     firebase.auth().signInAnonymously()
    //         .then(function () {
    //             console.log('Logged in as Anonymous!')
    //
    //         }).catch(function (error) {
    //         var errorCode = error.code;
    //         var errorMessage = error.message;
    //         console.log(errorCode);
    //         console.log(errorMessage);
    //     });
    // }


    vm.isActiveTab = function (url) {
        var currentPath = $location.path().split('/')[1];
        return (url === currentPath ? 'active': '');
    }
}
