/**
 * Created by ruyonga on 03/04/2018.
 */
angular.module('hopefr')
    .controller('EditPostController',EditPostController);

//Single post controller
function EditPostController($scope,$firebaseArray,$location, $routeParams,$firebaseObject) {


    /**
     * Edit post
     */

    var vm = this;
    vm.title = "Edit Post";
    vm.name = "Edit Posts";
    vm.showbar = true;




    vm.getOnePost = function () {


        if($routeParams.id != null){
            var post = [];
            var ref = firebase.database().ref("posts/"+$routeParams.id);
            ref.on("child_added", function(snap)  {
               post = snap.val();
                console.log(post);
            });
        }

    }

}