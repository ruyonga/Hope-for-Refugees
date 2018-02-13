angular.module('hopefr')
        .controller('AboutController', AboutController);

function AboutController() {
	// body...
	var vm = this;
	vm.about = "This is a bio page";
	vm.showbar = true;
	vm.title = "About Us";


}
