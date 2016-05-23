(function() {
    angular
        .module('treeApp')
        .factory('Picture', function($http, $resource) {
            return $resource('/picture/:picture', {
                picture: '@picture'
            }, {
                // Ammend save method to make post as FormData encoded
                // to support native file uploading
                save: {
                    method: 'POST',
                    headers: {
                        'Content-Type': undefined,
                        enctype: 'multipart/form-data'
                    },
                    transformRequest: function(data) {
                        var fd = new FormData();
                        angular.forEach(data, function(value, key) {
                            fd.append(key, value);
                        });
                        return fd;
                    }
                },
                get: {
                    method: 'GET',
                    transformResponse: function(data) {
                        data = angular.fromJson(data);
                        console.log(data);
                        // Simple GET request example:
                        $http({
                            method: 'GET',
                            url: '/image/' + data.id
                        }).then(function successCallback(response ) {
                            // this callback will be called asynchronously
                            // when the response is available
                            data.fileData = response.data;
                        }, function errorCallback( response ) {
                            // called asynchronously if an error occurs
                            // or server returns response with an error status.
                        });
                        return data;
                    }
                }
            });
        });
})();
