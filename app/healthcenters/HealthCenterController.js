angular.module('hopefr')
    .controller('HealthCenterController', ServicesController);

function ServicesController($scope,$firebaseArray, $location, $routeParams, $firebaseObject) {
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


    vm.id =  $routeParams.id;


    /**
     * GEt one posts
     * @type {Array}
     */
    if(vm.id != null){
        console.log("Will get one post"+ vm.id);
        vm.post = [];
        var ref = firebase.database().ref("healthcenters/"+$routeParams.id);
        ref.on('value', function(snapshot) {

               vm.orgname = snapshot.val().orgname;
                vm.contactperson = snapshot.val().contactperson;
                vm.phone = snapshot.val().phone;
                vm.email = snapshot.val().email;
                vm.address = snapshot.val().address;
                vm.description = snapshot.val().description;

                console.log( vm.description);
        });

    }




    /**
     * Delete item
     */
    vm.delete  = function () {
        console.log("Delete this bitch");
        var err1;
        firebase.database().ref("healthcenters/"+$routeParams.id).remove().catch( function ( err) {
            err1 = err;
            vm.error = "Could not complete request at this moment";
        });

        if(!err1){
            vm.message = "health center Deleted successfully";
            $location.path('/healthcenters')
        }
    } ;



    vm.editcenter = function () {
        var err1;
        console.log("called edit post");
        var ref = firebase.database().ref("healthcenters/"+$routeParams.id);
        console.log("ref linkt"+$routeParams.id);


        if($routeParams.id != null) {

            var healthcenter = {
                orgname: vm.orgname,
                contactperson: vm.contactperson,
                phone: vm.phone,
                email: vm.email,
                address: vm.address,
                description: vm.description,

            };
            ref.update(healthcenter).catch(function(err){
                err1 = err;
                vm.error = "An error occurred while updating post"+ err;
            });

            if(!err1){
                vm.message = "Health center updated successfully ";
                $location.path('/healthcenters')
            }
        }else{
            vm.error = "Need to have select a post"
        }
    };

}
