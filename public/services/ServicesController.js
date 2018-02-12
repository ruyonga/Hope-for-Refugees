angular.module('hopefr')
    .controller('ServicesController', ServicesController);

function ServicesController() {

    var vm = this;
    vm.name = "Service Providers";
    vm.title = "Services providers";
    //using facatory
   vm.showbar = true;
}
