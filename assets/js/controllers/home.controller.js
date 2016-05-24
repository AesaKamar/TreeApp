(function() {
    angular
        .module('treeApp')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$scope', 'Picture', 'User', 'growl'];

    function HomeController($scope, Picture, User, growl) {

        // Initializers
        // ===================================
        var owner_id;
        User.get({
            id: 6
        }, function(user) {
          owner_id = user.id;
            $scope.picture = new Picture({
                owner: user.id,
                description: "A sample upload"
            });
        });

        $scope.currentImageIndex = [];
        $scope.all_pictures = [];
        

        Picture.query({
            owner: owner_id
        }, function(pictures) {
            $scope.all_pictures = pictures;
        });


        // Methods
        // ====================================
        $scope.summonModal= function(index){
          $scope.currentImageIndex = index;
          $("#myModal").modal();
        };

        $scope.updatePicture = function(picture){
          Picture.update({id:picture.id}, picture);
        };

        $scope.deletePicture = function(picture){
          Picture.delete({id:picture.id});
        };


    }
})();