(function() {
  angular
    .module('treeApp')
    .factory('Picture', function($resource) {
      return $resource('/picture/:picture', {
        picture: "@picture",
        save: {
          method: 'POST',
          transformRequest: angular.identity,
          headers: { 'Content-Type': undefined }
        },
        create: {
          method: 'POST',
          transformRequest: angular.identity,
          headers: { 'Content-Type': undefined }
        }
      });
    });
})();
