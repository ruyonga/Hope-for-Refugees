angular.module('hopefr')
    .controller('HealthCenterController', ServicesController);

function ServicesController() {
    var serviceproviders = firebase.database().ref("healthcenters/");

    var vm = this;
    vm.name = "Health Centers";
    vm.title = "Health Centers";
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

    if(firebase.auth.Auth.currentUser != null) {
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

                serviceproviders.push({
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
