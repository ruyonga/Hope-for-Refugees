angular.module('hopefr')
        .controller('ErrorController',ErrorController);

function ErrorController(){
	var vm = this;
	vm.error = 'Cannot find the page your looking';
	vm.showbar = true;

}
