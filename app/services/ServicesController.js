angular.module('hopefr')
    .controller('ServicesController', ServicesController);

function ServicesController($scope, $firebaseArray, $location, $routeParams, $firebaseObject) {
    var serviceproviders = firebase.database().ref("serviceProviders/");

    var vm = this;
    vm.name = "Service Providers";
    vm.title = "Services providers";
    //using facatory
    vm.showbar = true;

    /**
     * Get all services  providers
     */

        serviceproviders.on("child_added", function(data) {

            var list = $firebaseArray(serviceproviders);

            list.$loaded().then(function () {

                $scope.list = [];
                angular.forEach(list, function (value, key) {

                    $scope.list.push({id: key, data: value})
                });
                vm.centers = $scope.list;
                console.log(vm.centers);
            });


        }, function (error) {

            console.log("Error: " + error.message);
        });
    serviceproviders.off("value");

    /**
     * Add New service provider Post
     */

    vm.addService = function(){

        if(!vm.orgname || !vm.contactperson){
            vm.error = 'Please enter the contact person and name of service providers';
        }else{

            serviceproviders.push({
                orgname : vm.orgname,
                contactperson : vm.contactperson,
                phone : vm.phone,
                email : vm.email,
                address: vm.address,
                description: vm.description,
                services: vm.services


            });

            vm.message = "Service Provider added";

        }
    };

    vm.id =  $routeParams.id;


    /**
     * GEt one posts
     * @type {Array}
     */
    if(vm.id != null){
        console.log("Will get one post"+ vm.id);
        vm.post = [];
        var ref = firebase.database().ref("serviceProviders/"+$routeParams.id);
        ref.on('value', function(snapshot) {

            vm.orgname = snapshot.val().orgname;
            vm.contactperson = snapshot.val().contactperson;
            vm.phone = snapshot.val().phone;
            vm.email = snapshot.val().email;
            vm.address = snapshot.val().address;
            vm.description = snapshot.val().description;
            console.log( vm.details);
        });

    }






    /**
     * Delete item
     */
    vm.delete  = function (id) {
        var err1 = false;
        console.log("Delete this bitch" + id);
        firebase.database().ref("serviceProviders/"+id).remove().catch(function (err) {
            console.log(err1);
            err1 = true;
            vm.error = "An error occurred while deleting item, please try again";
        });

        if(!err1){
            console.log(err1);

            vm.message = "Item deleted successfully";


        }


    } ;

    vm.editservice= function () {
        var err1;
        console.log("called edit post");
        var ref = firebase.database().ref("serviceProviders/"+$routeParams.id);
        console.log("ref linkt"+$routeParams.id);


        if($routeParams.id != null) {

            var serviceProvider = {

                orgname : vm.orgname,
                contactperson : vm.contactperson,
                phone : vm.phone,
                email : vm.email,
                address: vm.address,
                description: vm.description,
                services: vm.services

            };
            ref.update(serviceProvider).catch(function(err){
                err1 = err;
                vm.error = "An error occurred while updating post"+ err;
            });

            if(!err1){
                vm.message = "Service Provider updated successfully ";
                $location.path('/services')
            }
        }else{
            vm.error = "Need to have select a post"
        }
    };

}
