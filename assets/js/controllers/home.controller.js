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

        $scope.updatePicture = function(index){
          Picture.update({id:$scope.all_pictures[index].id}, $scope.all_pictures[index], function(res){
            $scope.all_pictures[index] = res;
          });
        };

        $scope.deletePicture = function(index){
          Picture.delete({id:$scope.all_pictures[index].id},function(res){
            $scope.all_pictures[index] = res;
          });
        };


    }
})();