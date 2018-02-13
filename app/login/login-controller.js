/**
 * Created by ruyonga on 10/02/2018.
 */

angular.module('hopefr')
    .controller('LoginController', LoginController);

function LoginController() {

    var vm = this;
    vm.name = "Daniel";
    vm.showbar = false;
    vm.title = "Login";

    /**
     * Sign into the dashboard to login
     */
    vm.login = function () {


    firebase.auth()
        .signInWithEmailAndPassword(vm.username,vm.password)
        .catch(function(error) {
            if(error){
        console.log(error.code);
        console.log(error.message);
            vm.error = error.message;
            vm.isLoggedIn  = function () {
                return false
              }
            }else{
                vm.message = "Logged In";

                vm.isLoggedIn  = function () {
                    return true;
                }
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
}
