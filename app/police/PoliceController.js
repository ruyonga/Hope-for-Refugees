angular.module('hopefr')
    .controller('PoliceController', PoliceController);

function PoliceController($scope, $firebaseArray, $firebaseObject) {

    var police = firebase.database().ref("police/");


    var vm = this;
    vm.name = "Police Stations";
    vm.title = "Polices Stations";
    vm.showbar = true;

    /**
     * Get all Police posts
     */



        police.orderByChild("postname").on("child_added", function(data)  {
          // console.log(data.val());

             list = $firebaseArray(police);

            list.$loaded().then(function() {
                $scope.list = [];

                angular.forEach(list, function(value,key){

                    $scope.list.push({ id: key, data: value})
                });
                vm.policePosts = $scope.list;
                console.log(vm.policePosts);
            });

        }, function (error) {

            console.log("Error: " + error.code);
        });


    police.off("value");

    /**
     * Add New Police Post
     */

    vm.addPolice = function () {

        if (!vm.postname || !vm.incharge) {
            vm.error = 'The In charge person and the police station name are required';
        } else {

            police.push({
                postname: vm.postname,
                incharge: vm.incharge,
                phone: vm.phone,
                details: vm.details

            })

        }
    };

}
