angular.module('hopefr')
    .controller('ServicesController', ServicesController);

function ServicesController() {
    var serviceproviders = firebase.database().ref("serviceProviders/");

    var vm = this;
    vm.name = "Service Providers";
    vm.title = "Services providers";
    //using facatory
    vm.showbar = true;

    /**
     * Get all services  providers
     */
    vm.serviceproviders = function () {

        serviceproviders.orderByChild("orgname").on("child_added", function(data) {
            console.log(data.val());


        }, function (error) {

            console.log("Error: " + error.message);
        });

    };
    console.log(vm.serviceproviders());
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

}
