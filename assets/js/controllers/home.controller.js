(function() {
  angular
    .module('treeApp')
    .controller('HomeController', HomeController);

  HomeController.$inject = ['$scope', 'Picture', 'User'];

  function HomeController($scope, Picture, User) {
    User.get({id:5}, function(user){
      $scope.picture = new Picture({
        owner: user.id,
        description: "A sample upload"
      });
    });

    $scope.get_picture = {};

    $scope.uploadPicture = function(picture){
      console.log(picture);
      Picture.save(picture,
        function(res1){
          // console.log(res1);
          Picture.get({id:res1.picture.id}, function(res2){
             console.log(res2);
            $scope.get_picture = res2;
          });
        },
      function(err){
        console.log(err);
      });
    };
  }
})();
