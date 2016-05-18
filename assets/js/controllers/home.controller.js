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


    $scope.uploadPicture = function(picture){
      console.log(picture);
      Picture.save(picture,
        function(data){
          console.log(data);
        },
      function(err){
        console.log(err);
      });
    };
  }
})();
