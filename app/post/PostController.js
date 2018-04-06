angular.module('hopefr')
    .controller('PostController', PostController);

//Single post controller
function PostController($scope, $firebaseArray, $location, $routeParams, $firebaseObject) {

    var posts = firebase.database().ref("posts/");


    var vm = this;
    vm.title = "Posts";
    vm.name = "Posts";
    vm.showbar = true;
    vm.id = $routeParams.id;
    vm.postInputFile = null;
    var downloadURL = null;


    /**
     * GEt one posts
     * @type {Array}
     */
    if (vm.id != null) {
        console.log("Will get one post" + vm.id);
        vm.post = [];
        var ref = firebase.database().ref("posts/" + $routeParams.id);
        ref.on('value', function (snapshot) {
            vm.postTitle = snapshot.val().postTitle;
            vm.body = snapshot.val().body;
            console.log(vm.body);
        });

    }

    /**
     * Get all  posts
     */
    posts.orderByChild("postTitle").on("child_added", function (data) {
        // console.log(data.val());

        var list = $firebaseArray(posts);

        list.$loaded().then(function () {

            $scope.list = [];
            angular.forEach(list, function (value, key) {

                $scope.list.push({id: key, data: value})
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
        if (!vm.postTitle && !vm.postInputFile) {
            vm.error = 'Post Title  and image are required';
        } else {

            /**
             * Upload image then proceed to update
             */
            console.log(vm.postInputFile);
            // File or Blob named mountains.jpg
            var file = vm.postInputFile;
            console.log(file + "to be uploaded");
            // Create the file metadata
            var metadata = {
                contentType: 'image/jpeg'
            };
            var storageRef = firebase.storage().ref();
            // Upload file and metadata to the object 'images/mountains.jpg'
            var uploadTask = storageRef.child('apppics/' + file.name).put(file, metadata);

            // Listen for state changes, errors, and completion of the upload.
            uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
                function (snapshot) {
                    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                    switch (snapshot.state) {
                        case firebase.storage.TaskState.PAUSED: // or 'paused'
                            console.log('Upload is paused');
                            break;
                        case firebase.storage.TaskState.RUNNING: // or 'running'
                            console.log('Upload is running');
                            break;
                    }
                }, function (error) {

                    // A full list of error codes is available at
                    // https://firebase.google.com/docs/storage/web/handle-errors
                    switch (error.code) {
                        case 'storage/unauthorized':
                            // User doesn't have permission to access the object
                            console.log("not authorised to upload");
                            vm.error = "error uploading image, you dont have permissions to upload images";

                            break;

                        case 'storage/canceled':
                            // User canceled the upload
                            console.log("upload cancelled");
                            vm.error = "Image upload was cancelled, please check your internet connection";

                            break;
                        case 'storage/unknown':
                            // Unknown error occurred, inspect error.serverResponse
                            console.log("unknown storage path");
                            vm.error = "Image upload was failed, please check your internet connection";

                            break;
                    }
                }, function () {
                    // Upload completed successfully, now we can get the download URL

                    /**
                     * Now that we have a url we can complete the upla
                     * @type {string}
                     */
                    downloadURL = uploadTask.snapshot.downloadURL;
                    posts.push({
                        postTitle: vm.postTitle,
                        body: vm.body,
                        image: downloadURL

                    }).catch(function (err) {
                        err1 = err;
                        vm.error = "Could complete request at this moment";

                    });

                    if (!err1) {
                        vm.message = "Post created successfully ";
                        $location.path('/posts')
                    }

                });

        }

    };
    /**
     * Delete item
     */
    vm.delete = function () {
        var err1;
        firebase.database().ref("posts/" + $routeParams.id).remove().catch(function (err) {
            err1 = err;
            vm.error = "Could complete request at this moment";
        });

        if (!err1) {
            vm.message = "Post Deleted successfully";
            $location.path('/posts')
        }
    };


    vm.editPost = function () {
        var err1;
        console.log("called edit post");
        var ref = firebase.database().ref("posts/" + $routeParams.id);
        console.log("ref linkt" + $routeParams.id);


        if ($routeParams.id != null) {

            /**
             * Upload image then proceed to update
             */
            console.log(vm.postInputFile);
            // File or Blob named mountains.jpg
            var file = vm.postInputFile;
            console.log(file + "to be uploaded");
            // Create the file metadata
            var metadata = {
                contentType: 'image/jpeg'
            };
            var storageRef = firebase.storage().ref();
            // Upload file and metadata to the object 'images/mountains.jpg'
            var uploadTask = storageRef.child('apppics/' + file.name).put(file, metadata);

            // Listen for state changes, errors, and completion of the upload.
            uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
                function (snapshot) {
                    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                    switch (snapshot.state) {
                        case firebase.storage.TaskState.PAUSED: // or 'paused'
                            console.log('Upload is paused');
                            break;
                        case firebase.storage.TaskState.RUNNING: // or 'running'
                            console.log('Upload is running');
                            break;
                    }
                }, function (error) {

                    // A full list of error codes is available at
                    // https://firebase.google.com/docs/storage/web/handle-errors
                    switch (error.code) {
                        case 'storage/unauthorized':
                            // User doesn't have permission to access the object
                            console.log("not authorised to upload");
                            vm.error = "error uploading image, you dont have permissions to upload images";

                            break;

                        case 'storage/canceled':
                            // User canceled the upload
                            console.log("upload cancelled");
                            vm.error = "Image upload was cancelled, please check your internet connection";

                            break;
                        case 'storage/unknown':
                            // Unknown error occurred, inspect error.serverResponse
                            console.log("unknown storage path");
                            vm.error = "Image upload was failed, please check your internet connection";

                            break;
                    }
                }, function () {
                    // Upload completed successfully, now we can get the download URL

                    /**
                     * Now that we have a url we can complete the upla
                     * @type {string}
                     */
                 downloadURL = uploadTask.snapshot.downloadURL;
                    myposts = {
                        postTitle: vm.postTitle,
                        body: vm.body,
                        image: downloadURL
                    };

                    ref.update(myposts).catch(function (err) {
                        err1 = err;
                        vm.error = "An error occurred while updating post" + err;
                    });

                    if (!err1) {
                        vm.message = "Post updated successfully ";

                        $location.path('/posts')
                    }

                });


        } else {
            vm.error = "Need to have select a post"
        }
    };


}