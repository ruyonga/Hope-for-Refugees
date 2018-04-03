angular.module('hopefr')
    .controller('PoliceController', PoliceController);

function PoliceController($scope, $firebaseArray) {

    var police = firebase.database().ref("police/");


    var vm = this;
    vm.name = "Police Stations";
    vm.title = "Polices Stations";
    vm.showbar = true;

    /**
     * Get all Police posts
     */
        police.orderByChild("postname").on("child_added", function(data)  {
          // console.log(data.val());

            var  list = $firebaseArray(police);

            list.$loaded().then(function() {
                $scope.list = [];

                angular.forEach(list, function(value,key){

                    $scope.list.push({ id: key, data: value})
                });
                vm.policePosts = $scope.list;
                console.log(vm.policePosts);
            });

        }, function (error) {

            console.log("Error: " + error.code);
        });
        police.off("value");

    /**
     * Add New Police Post
     */

    vm.addPolice = function () {

        if (!vm.postname || !vm.incharge) {
            vm.error = 'The In charge person and the police station name are required';
        } else {

            police.push({
                postname: vm.postname,
                incharge: vm.incharge,
                phone: vm.phone,
                details: vm.details

            })

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


    $scope.openFromLeft = function() {
        $mdDialog.show(
            $mdDialog.alert()
                .clickOutsideToClose(true)
                .title('Opening from the left')
                .textContent('Closing to the right!')
                .ariaLabel('Left to right demo')
                .ok('Nice!')
                // You can specify either sting with query selector
                .openFrom('#left')
                // or an element
                .closeTo(angular.element(document.querySelector('#right')))
        );
    };
    $scope.openOffscreen = function() {
        $mdDialog.show(
            $mdDialog.alert()
                .clickOutsideToClose(true)
                .title('Opening from offscreen')
                .textContent('Closing to offscreen')
                .ariaLabel('Offscreen Demo')
                .ok('Amazing!')
                // Or you can specify the rect to do the transition from
                .openFrom({
                    top: -50,
                    width: 30,
                    height: 80
                })
                .closeTo({
                    left: 1500
                })
        );
    };
}

