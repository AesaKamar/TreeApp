(function() {
  angular
    .module('treeApp')
    .controller('HomeController', HomeController);

  HomeController.$inject = ['$scope', 'Picture', 'User', 'growl'];

  function HomeController($scope, Picture, User, growl) {

    // Initializers
    // ===================================
    User.get({id:5}, function(user){
      $scope.picture = new Picture({
        owner: user.id,
        description: "A sample upload"
      });
    });

    $scope.currentlyFocusedImage = new Picture();
    $scope.all_pictures = [1, 2, 3];
    var owner_id = 5;

    Picture.query({owner: owner_id}, function(pictures){
      $scope.all_pictures = pictures;
    });


    // Methods
    // ====================================
    $scope.getImageAndOverlay = function(picture, $index){
      Picture.get({id: picture.id}, function(res){
        $scope.currentlyFocusedImage = res;
        $("#myModal").modal();
      });
    }

    }
})();