angular.module('hopefr')
    .controller('PoliceController', PoliceController);

function PoliceController($scope, $firebaseArray,$firebaseObject) {

    var police = firebase.database().ref("police/");


    var vm = this;
    vm.name = "Police Stations";
    vm.title = "Polices Stations";
    vm.showbar = true;

    /**
     * Get all Police posts
     */
    vm.policePosts = function () {

        police.orderByChild("postname").on("child_added", function(data) {
            console.log(data.val());


        }, function (error) {

            console.log("Error: " + error.code);
        });

    };
    console.log(vm.policePosts());
    police.off("value");

    /**
     * Add New Police Post
     */

    vm.addPolice = function(){

        if(!vm.postname || !vm.incharge){
            vm.error = 'The In charge person and the police station name are required';
        }else{

            police.push({
                postname : vm.postname,
                incharge : vm.incharge,
                phone : vm.phone,
                details : vm.details

            })

        }
    };

}
