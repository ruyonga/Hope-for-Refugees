angular.module('hopefr')
        .controller('PostController',PostController);

//Single post controller
function PostController($scope, $routeParams, $firebaseObject){

    var ref = new Firebase(URL);

    var obj = $firebaseObject(ref);

    var vm = this;
	var id = $routeParams.id;
	vm.title = "Posts";
    vm.name = "Posts";
	vm.showbar = true;



}