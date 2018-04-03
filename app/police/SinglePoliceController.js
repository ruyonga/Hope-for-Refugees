angular.module('hopefr')
    .controller('SinglePoliceController', SinglePoliceController);

function SinglePoliceController($routeParams, AuthFactory,$firebaseArray) {
    // body...
    var vm = this;
    var id  = $routeParams.id;
    vm.isSubmitted = false;

    vm.title = 'Hope For Refugees';
    var police = firebase.database().ref("police/");
    
    var ll = police.orderByKey()
        .equalTo(id)
        .once('value', function(snap) {
             var jj = [];


            //jj.push([snap.val().postname, snap.val().incharge, snap.val().phone, snap.val().details]);

        });
    vm.policePost =  $firebaseArray(ll);
    console.log(vm.policePost);



    function _getStarRating(stars){
        console.log( new Array(stars))
        return new Array(stars)
    }

    vm.isLoggedIn = function(){
        if(AuthFactory.isLoggedIn){
            return true;
        }else{
            return false;
        }
    };



    // vm.addReview = function(){
    //     var postData = {
    //         name :  vm.name,
    //         rating : vm.rating,
    //         review : vm.review
    //     };
    //     if(vm.reviewForm.$valid){
    //         hotelDataFactory.postReview(id, postData)
    //             .then(function(response){
    //                 if(response.status === 200){
    //                     $route.reload();
    //                 }
    //
    //             }).catch(function(error){
    //             console.log(error)
    //         })
    //     }else{
    //         vm.isSubmitted = true
    //     }
    // }
}
        
