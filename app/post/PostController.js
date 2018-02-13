angular.module('hopefr')
        .controller('PostController',PostController);

//Single post controller
function PostController(){

    var gbv = firebase.database().ref("posts/");


    var vm = this;
	vm.title = "Posts";
    vm.name = "Posts";
	vm.showbar = true;


    /**
     * Get all  posts
     */
    vm.allposts = function () {

        gbv.on("value", function(data) {
            console.log("data"+ data.val());


        }, function (error) {

            console.log("Error: " + error.code);
        });

    };
    console.log(vm.allposts());
    gbv.off("value");

    /**
     *
     * Add Posts
     */
  vm.addpost = function () {

      if(!vm.postTitle ){
          vm.error = 'Post Title is required';
      }else{

          gbv.push({
              postTitle : vm.postTitle,
              body : vm.body

          })

      }
  };

}