(function() {
  angular
    .module('treeApp')
    .factory('Picture', function($log, $resource) {
      return $resource('/picture/:picture',
      {picture: '@picture'},
      {
        // Ammend save method to make post as FormData encoded
        // to support native file uploading
        save: {
          method: 'POST',
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
