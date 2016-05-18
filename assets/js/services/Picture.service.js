(function() {
  angular
    .module('treeApp')
    .factory('Picture', function($log, $resource) {
      return $resource('/picture/:picture',
      {picture: '@picture'},
      {
        save: {
          method: 'POST', // this method issues a PUT request
          headers: {'Content-Type':undefined, enctype: 'multipart/form-data'},
          transformRequest: function(data){
            var fd = new FormData();
            angular.forEach(data, function(value, key) {
                fd.append(key, value);
            });
            return fd;
          }
        }
      });
    });
})();
