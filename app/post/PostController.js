angular.module('hopefr')
    .controller('PostController',PostController);

//Single post controller
function PostController($scope,$firebaseArray,$location, $routeParams,$firebaseObject){

    var posts = firebase.database().ref("posts/");


    var vm = this;
    vm.title = "Posts";
    vm.name = "Posts";
    vm.showbar = true;
    vm.id =  $routeParams.id;


    /**
     * GEt one posts
     * @type {Array}
     */
    if(vm.id != null){
        console.log("Will get one post"+ vm.id);
        vm.post = [];
        var ref = firebase.database().ref("posts/"+$routeParams.id);
        ref.on('value', function(snapshot) {
          vm.postTitle = snapshot.val().postTitle;
            vm.body = snapshot.val().body;
            console.log( vm.body);
        });

     }

    /**
     * Get all  posts
     */
    posts.orderByChild("postTitle").on("child_added", function(data)  {
        // console.log(data.val());

        var  list = $firebaseArray(posts);

        list.$loaded().then(function() {
            $scope.list = [];

            angular.forEach(list, function(value,key){

                $scope.list.push({ id: key, data: value})
            });
            vm.postsLists = $scope.list;
        });

    }, function (error) {

        console.log("Error: " + error.code);
    });
    posts.off("value");




    /**
     *
     * Add Posts
     */
    vm.addpost = function () {
var err1;
        if(!vm.postTitle ){
            vm.error = 'Post Title is required';
        }else{

            posts.push({
                postTitle : vm.postTitle,
                body : vm.body

            }).catch( function ( err) {
                err1 = err;
                vm.error = "Could complete request at this moment";

            });

            if(!err1){
                vm.message = "Post created successfully ";
                $location.path('/posts')
            }
        }
    };

    /**
     * Delete item
     */
    vm.delete  = function () {
        var err1
        firebase.database().ref("posts/"+$routeParams.id).remove().catch( function ( err) {
            err1 = err;
            vm.error = "Could complete request at this moment";
        });

        if(!err1){
            vm.message = "Post Deleted successfully";
            $location.path('/posts')
        }
    } ;



    vm.editPost = function () {
        var err1;
        console.log("called edit post");
        var ref = firebase.database().ref("posts/"+$routeParams.id);
        console.log("ref linkt"+$routeParams.id);


        if($routeParams.id != null) {

            var myposts = {
                postTitle: vm.postTitle,
                body: vm.body

            };
            ref.update(myposts).catch(function(err){
                err1 = err;
                vm.error = "An error occurred while updating post"+ err;
            });

            if(!err1){
                vm.message = "Post updated successfully ";

                $location.path('/posts')
            }
        }else{
            vm.error = "Need to have select a post"
        }
    };




}