(function() {
  angular
    .module('treeApp')
    .controller('HomeController', HomeController);

  HomeController.$inject = ['Picture', 'User'];

  function HomeController(Picture, User) {
    
  }
})();
