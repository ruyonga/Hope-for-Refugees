angular.module('hopefr')
    .controller('HealthCenterController', ServicesController);

function ServicesController($scope,$firebaseArray) {
    var health = firebase.database().ref("healthcenters/");

    var vm = this;
    vm.name = "Health Centers";
    vm.title = "Health Centers";
    //using facatory
    vm.showbar = true;

    /**
     * Get all services  providers
     */
  
    health.orderByChild("orgname").on("child_added", function(data) {
            console.log(data.val());

            var  list = $firebaseArray(health);

            list.$loaded().then(function() {
                $scope.list = [];

                angular.forEach(list, function(value,key){

                    $scope.list.push({ id: key, data: value})
                });
                vm.health  = $scope.list;
                console.log(   vm.health );
            });
        }, function (error) {

            console.log("Error: " + error.message);
        });

  
    console.log(vm.health);
    health.off("value");

    /**
     * Add New service provider Post
     */

    if(firebase.auth().currentUser != null) {
        vm.addService = function () {
            // var uploadTask = "";
            // var storageRef = firebase.storage().ref("folderName/logo.jpg");
            // var fileUpload = document.getElementById("logo");
            // console.log()
            // storageRef.on('change', function(evt) {
            //     var firstFile = evt.target.fileUpload[0]; // get the first file uploaded
            //      uploadTask = storageRef.put(firstFile);
            // });
            if (!vm.orgname || !vm.contactperson) {
                vm.error = 'Please enter the contact person and name of service providers';
            } else {

                health.push({
                    orgname: vm.orgname,
                    contactperson: vm.contactperson,
                    phone: vm.phone,
                    email: vm.email,
                    address: vm.address,
                    description: vm.description,

                });

            }
        };
    }else {
        vm.error ="You need to login before you can post"
    }
    
    
}
