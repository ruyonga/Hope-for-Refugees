angular.module('hopefr')
    .controller('PoliceController', PoliceController);

function PoliceController($scope,$firebaseArray,$location, $routeParams) {

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



    vm.id =  $routeParams.id;


    /**
     * GEt one posts
     * @type {Array}
     */
    if(vm.id != null){
        console.log("Will get one post"+ vm.id);
        vm.post = [];
        var ref = firebase.database().ref("police/"+$routeParams.id);
        ref.on('value', function(snapshot) {

            vm.postname = snapshot.val().postname;
            vm.incharge = snapshot.val().incharge;
            vm.phone = snapshot.val().phone;
            vm.details = snapshot.val().details;
            console.log( vm.details);
        });

    }




    /**
     * Delete item
     */
    vm.delete  = function (id) {
        var err1 = false;
        console.log("Delete this bitch" + id);
        firebase.database().ref("police/"+id).remove().catch(function (err) {
            console.log(err1);
             err1 = true;
             vm.error = "An error occurred while deleting item, please try again";
        });

        if(!err1){
            console.log(err1);

            vm.message = "Item deleted successfully";


        }


    } ;



    vm.editpolice = function () {
        var err1;
        console.log("called edit post");
        var ref = firebase.database().ref("police/"+$routeParams.id);
        console.log("ref linkt"+$routeParams.id);


        if($routeParams.id != null) {

            var mypolice = {
                postname: vm.postname,
                incharge: vm.incharge,
                phone: vm.phone,
                details: vm.details

            };
            ref.update(mypolice).catch(function(err){
                err1 = err;
                vm.error = "An error occurred while updating post"+ err;
            });

            if(!err1){
                vm.message = "Post updated successfully ";

                $location.path('/police')
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

