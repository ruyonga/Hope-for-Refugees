angular.module('hopefr')
    .controller('DashboardController', DashboardController);

function DashboardController() {

    var vm = this;
    vm.name = "Dashboard";
    vm.title = "Dashboard";
    //using facatory
   vm.showbar = true;
}
